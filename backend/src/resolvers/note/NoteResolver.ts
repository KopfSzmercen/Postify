import { Ctx, Query, Resolver } from "type-graphql";
import { Note } from "../../entities/Note";
import { MyContext } from "../../types";
import handleGetNotes, { GetNotesResult } from "./getNotes";

@Resolver(Note)
export class NoteResolver {
  @Query(() => GetNotesResult)
  async getNotes(@Ctx() context: MyContext) {
    return await handleGetNotes(context);
  }
}
