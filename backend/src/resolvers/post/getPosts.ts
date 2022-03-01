import { Field, InputType, Int, ObjectType, Query } from "type-graphql";
import { getConnection } from "typeorm";
import { Post } from "../../entities/Post";
import { MyContext } from "../../types";

@InputType()
export class GetSinglePostInput {
  @Field(() => Int)
  postId!: number;
}

@ObjectType()
export class GetSinglePostResult {
  @Field()
  success!: boolean;

  @Field(() => [String])
  errors!: string[];

  @Field()
  hasMoreComments!: boolean;

  @Field(() => Post, { nullable: true })
  post?: Post;
}

export const handleGetSinglePost = async (
  input: GetSinglePostInput,
  ctx: MyContext
) => {
  const result: GetSinglePostResult = {
    success: true,
    errors: [],
    hasMoreComments: true
  };

  const userId = ctx.req.session.userId;

  try {
    const post = await getConnection().query(
      `
          select p.*, 
          json_build_object(
            'username', u.username,
            'id', u.id,
            'email', u.email
            ) creator,

          (select value from vote where "userId" = $1 and "postId" = $2) "voteStatus",

          (select count (*) from comment where "postId" = $2) "commentsNumber",

          array (
          select json_build_object (
            'text', c.text, 
            'id', c.id, 
            'updatedAt', to_char(c."updatedAt", 'YYYY.MM.DD HH24:MI'), 
            'creatorName', username,
            'creatorId', creat.id )   

          from comment c
          inner join public.user creat on creat.id = c."userId"
          where c."postId" = $2
          order by c."updatedAt" DESC
          limit 5
          ) "paginatedComments"

          from post p
          inner join public.user u on u.id = p."creatorId"
          where p.id = $2
        `,
      [userId, input.postId]
    );

    if (post.length < 1) {
      result.success = false;
      result.errors.push(`Post with id ${input.postId} does not exitst`);
      return result;
    }
    if (post[0].paginatedComments.length < 5) result.hasMoreComments = false;
    result.post = post[0];

    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message) result.errors.push(error.message);
    result.success = false;
    return result;
  }
};

@InputType()
export class GetPaginatedPostsInput {
  @Field(() => Int)
  limit!: number;

  @Field(() => String, { nullable: true })
  cursor?: string;
}

@ObjectType()
export class GetPaginatedPostsResult {
  @Field()
  success!: boolean;

  @Field()
  hasMore!: boolean;

  @Field(() => [Post])
  posts!: Post[];

  @Field(() => [String])
  errors!: string[];
}

export const handleGetPaginatedPosts = async (
  options: GetPaginatedPostsInput,
  ctx: MyContext
) => {
  const result: GetPaginatedPostsResult = {
    success: true,
    posts: [],
    hasMore: false,
    errors: []
  };
  const userId = 432;

  const cursor = options.cursor
    ? new Date(parseInt(options.cursor))
    : new Date(Date.now());
  const limit = options.limit;

  const realLimit = Math.min(50, limit);
  const realLimitPlusOne = realLimit + 1;

  const replacements: any[] = [userId, cursor, realLimitPlusOne];

  try {
    const posts = await getConnection().query(
      `
        select p.*, 
        json_build_object(
          'username', u.username,
          'id', u.id,
          'email', u.email
          ) creator,
        (select value from vote where "userId" = $1 and "postId" = p.id) "voteStatus",
        (select count (*) from comment where "postId" = p.id) "commentsNumber"
        from post p
        inner join public.user u on u.id = p."creatorId"
        ${cursor ? `where p."createdAt" < $2` : ""}
        order by p."createdAt" DESC
        limit $3
      `,
      replacements
    );

    result.posts = posts.slice(0, realLimit);
    if (posts.length === realLimitPlusOne) result.hasMore = true;
    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message) result.errors.push(error.message);
    result.success = false;
    return result;
  }
};
