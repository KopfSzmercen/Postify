import { ObjectType, Field, Int, InputType } from "type-graphql";
import { getConnection } from "typeorm";
import { Comment } from "../../entities/Comment";
import { MyContext } from "../../types";
import { RegularResult } from "../user/friends";

@InputType()
export class DeleteCommentInput {
  @Field(() => Int)
  commentId!: number;
}

export const handleDeleteComment = async (
  input: DeleteCommentInput,
  ctx: MyContext
) => {
  const result: RegularResult = {
    success: true,
    errors: []
  };

  const currUserId = ctx.req.session.userId;
  const postId = input.commentId;

  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Comment)
      .where('id = :id and "userId" = :currUserId', { id: postId, currUserId })
      .execute();

    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message) result.errors.push(error.message);
    result.success = false;
    return result;
  }
};
