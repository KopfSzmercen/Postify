import { Field, InputType, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { Post } from "../../entities/Post";
import { MyContext } from "../../types";
import isLength from "../../utils/validation/isLength";

@InputType()
export class CreatePostInput {
  @Field()
  title!: string;

  @Field()
  text!: string;
}

@ObjectType()
class CreatePostError {
  @Field(() => String)
  field!: string;

  @Field(() => String)
  message!: string;
}

@ObjectType()
export class CreatePostResult {
  @Field()
  success!: boolean;

  @Field(() => [CreatePostError])
  errors!: CreatePostError[];

  @Field(() => Post, { nullable: true })
  returnedPost?: Post;
}

const handleCreatePost = async (input: CreatePostInput, ctx: MyContext) => {
  const result: CreatePostResult = {
    success: true,
    errors: []
  };

  const creatorId = ctx.req.session.userId;

  const isValidTitle = isLength(input.title, 5, 40);
  if (isValidTitle !== true)
    result.errors.push({ field: "password", message: isValidTitle });

  const isValidText = isLength(input.text, 5, 5000);
  if (!isValidText) result.errors.push({ field: "text", message: isValidText });

  if (result.errors.length > 0) {
    result.success = false;
    return result;
  }

  try {
    const newPost = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values({
        title: input.title,
        text: input.text,
        creatorId
      })
      .returning("id")
      .execute();

    const newPostId = newPost.raw[0].id;
    console.log(newPostId);

    const post = await getConnection().query(
      `
          select p.*, 
          json_build_object(
            'username', u.username,
            'id', u.id,
            'email', u.email
            ) creator,
          (select value from vote where "userId" = $1 and "postId" = p.id) "voteStatus",
          (select count (*) from comment where "postId" = p.id) "commentsNumber",
          case  when p."creatorId" = $1 then 'true' else 'false' end as "canEdit"
          from post p
          inner join public.user u on u.id = p."creatorId"
          where p.id = $2
        `,
      [creatorId, newPostId]
    );
    result.returnedPost = { ...post[0] };
    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message)
      result.errors.push({ field: "other", message: error.message });
    result.success = false;
    return result;
  }
};

export default handleCreatePost;
