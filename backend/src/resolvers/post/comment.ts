import { Field, InputType, Int, ObjectType } from "type-graphql";
import { getConnection } from "typeorm/globals";
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
    await getConnection().query(
      `
      insert into comment ("userId", "postId", text)
      values ($1, $2, $3)
      `,
      [userId, postId, text]
    );

    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message) result.errors.push(error.message);
    result.success = false;
    return result;
  }
};
