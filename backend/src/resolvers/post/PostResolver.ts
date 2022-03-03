import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../../entities/Post";
import { MyContext } from "../../types";
import { RegularResult } from "../user/friends";
import {
  AddCommentInput,
  AddCommentResult,
  GetMoreCommentsInput,
  GetMoreCommentsResult,
  handleAddComment,
  handleGetMoreComments
} from "./comment";
import handleCreatePost, {
  CreatePostInput,
  CreatePostResult
} from "./createPost";
import handleEditPost, { EditPostInput } from "./editPost";
import {
  GetPaginatedPostsInput,
  GetPaginatedPostsResult,
  GetSinglePostInput,
  GetSinglePostResult,
  handleGetPaginatedPosts,
  handleGetSinglePost
} from "./getPosts";
import handleVote, { VoteInput, VoteResult } from "./vote";

@Resolver(Post)
export class PostResolver {
  @Mutation(() => CreatePostResult)
  async createPost(
    @Arg("input") input: CreatePostInput,
    @Ctx() context: MyContext
  ): Promise<CreatePostResult> {
    return await handleCreatePost(input, context);
  }

  @Query(() => GetSinglePostResult)
  async getSinglePost(
    @Arg("input") input: GetSinglePostInput,
    @Ctx() context: MyContext
  ): Promise<GetSinglePostResult> {
    return await handleGetSinglePost(input, context);
  }

  @Query(() => GetPaginatedPostsResult)
  async getPaginatedPosts(
    @Arg("options") options: GetPaginatedPostsInput,
    @Ctx() context: MyContext
  ): Promise<GetPaginatedPostsResult> {
    return await handleGetPaginatedPosts(options, context);
  }

  @Mutation(() => VoteResult)
  async vote(
    @Arg("options") options: VoteInput,
    @Ctx() context: MyContext
  ): Promise<VoteResult> {
    return await handleVote(options, context);
  }

  @Mutation(() => AddCommentResult)
  async addComment(
    @Arg("input") input: AddCommentInput,
    @Ctx() context: MyContext
  ): Promise<AddCommentResult> {
    return await handleAddComment(input, context);
  }

  @Query(() => GetMoreCommentsResult)
  async getMoreComments(
    @Arg("options") options: GetMoreCommentsInput
  ): Promise<GetMoreCommentsResult> {
    return await handleGetMoreComments(options);
  }

  @Mutation(() => RegularResult)
  async editPost(
    @Arg("input") input: EditPostInput,
    @Ctx() context: MyContext
  ): Promise<RegularResult> {
    return await handleEditPost(input, context);
  }
}
