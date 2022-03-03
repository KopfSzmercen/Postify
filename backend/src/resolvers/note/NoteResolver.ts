import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Note } from "../../entities/Note";
import { MyContext } from "../../types";
import handleDeleteNote, {
  DeleteNoteInput,
  DeleteNoteResult
} from "./deleteNote";
import handleGetNotes, { GetNotesResult } from "./getNotes";

@Resolver(Note)
export class NoteResolver {
  @Query(() => GetNotesResult)
  async getNotes(@Ctx() context: MyContext) {
    return await handleGetNotes(context);
  }

  @Mutation(() => DeleteNoteResult)
  async deleteNote(
    @Ctx() context: MyContext,
    @Arg("input") input: DeleteNoteInput
  ): Promise<DeleteNoteResult> {
    return await handleDeleteNote(input, context);
  }
}
