import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { Post } from "../../entities/Post";
import isAuth from "../../middleware/isAuth";
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
import { DeleteCommentInput, handleDeleteComment } from "./deleteComment";
import handleDeletePost, { DeletePostInput } from "./deletePost";
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
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: CreatePostInput,
    @Ctx() context: MyContext
  ): Promise<CreatePostResult> {
    return await handleCreatePost(input, context);
  }

  @Query(() => GetSinglePostResult)
  @UseMiddleware(isAuth)
  async getSinglePost(
    @Arg("input") input: GetSinglePostInput,
    @Ctx() context: MyContext
  ): Promise<GetSinglePostResult> {
    return await handleGetSinglePost(input, context);
  }

  @Query(() => GetPaginatedPostsResult)
  @UseMiddleware(isAuth)
  async getPaginatedPosts(
    @Arg("options") options: GetPaginatedPostsInput,
    @Ctx() context: MyContext
  ): Promise<GetPaginatedPostsResult> {
    return await handleGetPaginatedPosts(options, context);
  }

  @Mutation(() => VoteResult)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("options") options: VoteInput,
    @Ctx() context: MyContext
  ): Promise<VoteResult> {
    return await handleVote(options, context);
  }

  @Mutation(() => AddCommentResult)
  @UseMiddleware(isAuth)
  async addComment(
    @Arg("input") input: AddCommentInput,
    @Ctx() context: MyContext
  ): Promise<AddCommentResult> {
    return await handleAddComment(input, context);
  }

  @Query(() => GetMoreCommentsResult)
  @UseMiddleware(isAuth)
  async getMoreComments(
    @Arg("options") options: GetMoreCommentsInput,
    @Ctx() context: MyContext
  ): Promise<GetMoreCommentsResult> {
    return await handleGetMoreComments(options, context);
  }

  @Mutation(() => RegularResult)
  @UseMiddleware(isAuth)
  async editPost(
    @Arg("input") input: EditPostInput,
    @Ctx() context: MyContext
  ): Promise<RegularResult> {
    return await handleEditPost(input, context);
  }

  @Mutation(() => RegularResult)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("input") input: DeletePostInput
  ): Promise<RegularResult> {
    return await handleDeletePost(input);
  }

  @Mutation(() => RegularResult)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg("input") input: DeleteCommentInput,
    @Ctx() context: MyContext
  ): Promise<RegularResult> {
    return await handleDeleteComment(input, context);
  }
}
