import { Field, InputType, Int, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { Note } from "../../entities/Note";
import { MyContext } from "../../types";

@InputType()
export class DeleteNoteInput {
  @Field(() => Int)
  noteId!: number;
}

@ObjectType()
export class DeleteNoteResult {
  @Field()
  success!: boolean;

  @Field(() => [String], { nullable: true })
  errors?: string[];
}

const handleDeleteNote = async (input: DeleteNoteInput, ctx: MyContext) => {
  const { noteId } = input;
  const { userId } = ctx.req.session;

  const result: DeleteNoteResult = {
    success: true
  };

  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Note)
      .where(`id = :noteId and userId = :userId`, {
        noteId,
        userId
      })
      .execute();

    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message) result.errors = [error.message];
    result.success = false;
    return result;
  }
};

export default handleDeleteNote;
