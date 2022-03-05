import { Field, InputType, Int } from "type-graphql";
import { getConnection } from "typeorm";
import { Post } from "../../entities/Post";
import { RegularResult } from "../user/friends";

@InputType()
export class DeletePostInput {
  @Field(() => Int)
  postId!: number;
}

const handleDeletePost = async (input: DeletePostInput) => {
  const result: RegularResult = {
    success: true,
    errors: []
  };

  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where("id = :postId", { postId: input.postId })
      .execute();

    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message) result.errors.push(error.message);
    result.success = false;
    return result;
  }
};

export default handleDeletePost;
