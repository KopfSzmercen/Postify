import { Field, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { Note } from "../../entities/Note";
import { MyContext } from "../../types";

@ObjectType()
export class GetNotesResult {
  @Field()
  success!: boolean;

  @Field(() => [String], { nullable: true })
  errors?: string[];

  @Field(() => [Note])
  notes!: Note[];
}

const handleGetNotes = async (ctx: MyContext) => {
  const userId = ctx.req.session;
  const result: GetNotesResult = {
    success: true,
    notes: []
  };
  try {
    const notes = await getConnection()
      .getRepository(Note)
      .createQueryBuilder("n")
      .where("n.userId = :userId", { userId })
      .getMany();
    result.notes = [...notes];
    return result;
  } catch (err) {
    const error = err as Error;
    if (error.message) result.errors = [error.message];
    result.success = false;
    return result;
  }
};

export default handleGetNotes;
