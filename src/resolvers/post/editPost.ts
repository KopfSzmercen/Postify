import { Field, InputType, Int } from "type-graphql";
import { MyContext } from "../../types";
import { CreatePostInput } from "./createPost";
import { RegularResult } from "../user/friends";
import { getConnection } from "typeorm";
import { Post } from "../../entities/Post";

@InputType()
export class EditPostInput extends CreatePostInput {
  @Field(() => Int)
  postId!: number;
}

const handleEditPost = async (input: EditPostInput, ctx: MyContext) => {
  const result: RegularResult = {
    success: true,
    errors: []
  };
  try {
    getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ title: input.title, text: input.text })
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

export default handleEditPost;
