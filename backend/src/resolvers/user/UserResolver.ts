import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { RegisterInput, RegisterResult } from "./register";
import handleRegister from "./register";
import { LoginInput, LoginResult } from "./login";
import { MyContext } from "../../types";
import handleLogin from "./login";
import {
  CreateFriendshipInput,
  RegularResult,
  handleCreateFriendship,
  FriendsRequestsResult,
  getFriendshipRequest,
  handleManageFriendsRequest,
  ManageFriendsRequestInput
} from "./friends";
import {
  getUsersByUsername,
  GetUsersByUsernameInput,
  GetUsersByUsernameResult,
  GetUsersResult,
  handleGetUsers,
  UsersOptions
} from "./getUsers";

@Resolver(User)
export class UserResolver {
  @Mutation(() => RegisterResult)
  async register(
    @Arg("options") options: RegisterInput
  ): Promise<RegisterResult> {
    return await handleRegister(options);
  }

  @Mutation(() => LoginResult)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() context: MyContext
  ): Promise<LoginResult> {
    return await handleLogin(options, context);
  }

  @Mutation(() => RegularResult)
  async createFriendship(
    @Arg("options") options: CreateFriendshipInput,
    @Ctx() context: MyContext
  ): Promise<RegularResult> {
    return await handleCreateFriendship(options, context);
  }

  @Query(() => FriendsRequestsResult)
  async queryFriendsRequests(
    @Ctx() context: MyContext
  ): Promise<FriendsRequestsResult> {
    return await getFriendshipRequest(context);
  }

  @Mutation(() => RegularResult)
  async manageFriendsRequest(
    @Arg("options") options: ManageFriendsRequestInput,
    @Ctx() context: MyContext
  ): Promise<RegularResult> {
    return await handleManageFriendsRequest(options, context);
  }

  @Query(() => GetUsersResult)
  async getUsers(
    @Arg("options") options: UsersOptions,
    @Ctx() context: MyContext
  ): Promise<GetUsersResult> {
    return await handleGetUsers(options, context);
  }

  @Query(() => GetUsersByUsernameResult)
  async getUsersByUsername(
    @Arg("options") options: GetUsersByUsernameInput,
    @Ctx() context: MyContext
  ): Promise<GetUsersByUsernameResult> {
    return await getUsersByUsername(options, context);
  }

  @Query(() => String)
  sayHi() {
    return "Hi";
  }
}
