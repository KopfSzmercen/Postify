import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../../entities/Post";
import { MyContext } from "../../types";
import { AddCommentInput, AddCommentResult, handleAddComment } from "./comment";
import handleCreatePost, {
  CreatePostInput,
  CreatePostResult
} from "./createPost";
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
}
