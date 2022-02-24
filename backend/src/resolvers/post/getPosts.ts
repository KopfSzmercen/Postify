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

  @Field(() => Post, { nullable: true })
  post?: Post;
}

export const handleGetSinglePost = async (
  input: GetSinglePostInput,
  ctx: MyContext
) => {
  const result: GetSinglePostResult = {
    success: true,
    errors: []
  };

  try {
    const post = await getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .where("p.id = :postId", {
        postId: input.postId
      })
      .leftJoinAndSelect("p.creator", "user")
      .getOne();

    console.log(post);

    if (!post) {
      result.success = false;
      result.errors.push(`Post with id ${input.postId} does not exitst`);
      return result;
    }
    result.post = post;
    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message) result.errors.push(error.message);
    result.success = false;
    return result;
  }
};
