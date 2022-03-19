import { Field, InputType, Int, ObjectType } from "type-graphql";
import { getConnection } from "typeorm/globals";
import { Comment } from "../../entities/Comment";
import { PaginatedComment } from "../../entities/Post";
import { User } from "../../entities/User";
import { MyContext } from "../../types";

@InputType()
export class AddCommentInput {
  @Field(() => Int)
  postId!: number;

  @Field()
  text!: string;
}

@ObjectType()
export class AddCommentResult {
  @Field()
  success!: boolean;

  @Field(() => PaginatedComment, { nullable: true })
  returnedComment?: PaginatedComment;

  @Field(() => [String])
  errors!: string[];
}

export const handleAddComment = async (
  input: AddCommentInput,
  ctx: MyContext
) => {
  const result: AddCommentResult = {
    success: true,
    errors: []
  };

  const { userId } = ctx.req.session;
  const { text, postId } = input;
  if (!text) {
    result.success = false;
    result.errors.push("A comment must have some text");
  }

  try {
    const insertionResult = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Comment)
      .values({
        userId,
        postId,
        text
      })
      .returning(
        `
       "userId" "creatorId", id, "postId", "updatedAt", text
      `
      )
      .execute();

    const creator = await getConnection()
      .getRepository(User)
      .createQueryBuilder("u")
      .where("u.id = :userId", { userId })
      .getOne();

    result.returnedComment = {
      ...insertionResult.raw[0],
      creatorName: creator?.username
    };

    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message) result.errors.push(error.message);
    result.success = false;
    return result;
  }
};

@InputType()
export class GetMoreCommentsInput {
  @Field(() => Int)
  postId!: number;

  @Field()
  cursor!: string;
}

@ObjectType()
export class GetMoreCommentsResult {
  @Field()
  success!: boolean;

  @Field(() => [String])
  errors!: string[];

  @Field()
  hasMoreComments!: boolean;

  @Field(() => [PaginatedComment], { nullable: true })
  paginatedComments?: PaginatedComment[];
}

export const handleGetMoreComments = async (
  input: GetMoreCommentsInput,
  ctx: MyContext
) => {
  const result: GetMoreCommentsResult = {
    success: true,
    hasMoreComments: false,
    errors: []
  };

  const cursor = input.cursor;
  const postId = input.postId;
  const currUserId = ctx.req.session.userId;

  try {
    const queryResult = await getConnection().query(
      `select array (
      select json_build_object (
        'text', c.text, 
        'id', c.id, 
        'updatedAt', c."updatedAt", 
        'creatorName', username,
        'creatorId', creat.id,
        'canEdit', (case when c."userId" = $3 then 'true' else 'false' end)   
        )
      
      from comment c
      inner join public.user creat on creat.id = c."userId"
      where c."postId" = $1 and c."updatedAt" < $2
      order by c."updatedAt" DESC
      limit 6
      ) "paginatedComments"`,
      [postId, cursor, currUserId]
    );

    result.paginatedComments = queryResult[0].paginatedComments.slice(0, 5);
    result.hasMoreComments = queryResult[0].paginatedComments.length > 5;

    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message) result.errors.push(error.message);
    result.success = false;
    return result;
  }
};
