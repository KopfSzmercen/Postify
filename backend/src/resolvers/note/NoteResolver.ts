import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { Note } from "../../entities/Note";
import isAuth from "../../middleware/isAuth";
import { MyContext } from "../../types";
import handleDeleteNote, {
  DeleteNoteInput,
  DeleteNoteResult
} from "./deleteNote";
import handleGetNotes, { GetNotesResult } from "./getNotes";

@Resolver(Note)
export class NoteResolver {
  @Query(() => GetNotesResult)
  @UseMiddleware(isAuth)
  async getNotes(@Ctx() context: MyContext) {
    return await handleGetNotes(context);
  }

  @Mutation(() => DeleteNoteResult)
  @UseMiddleware(isAuth)
  async deleteNote(
    @Ctx() context: MyContext,
    @Arg("input") input: DeleteNoteInput
  ): Promise<DeleteNoteResult> {
    return await handleDeleteNote(input, context);
  }
}
