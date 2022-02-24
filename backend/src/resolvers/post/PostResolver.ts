import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../../entities/Post";
import { MyContext } from "../../types";
import handleCreatePost, {
  CreatePostInput,
  CreatePostResult
} from "./createPost";
import {
  GetSinglePostInput,
  GetSinglePostResult,
  handleGetSinglePost
} from "./getPosts";

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
}
