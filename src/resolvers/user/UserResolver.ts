import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entities/User";
import isAuth from "../../middleware/isAuth";
import { MyContext } from "../../types";
import {
  CreateFriendshipInput,
  handleCreateFriendship,
  handleManageFriendsRequest,
  ManageFriendsRequestInput,
  RegularResult
} from "./friends";
import {
  GetUserByIdInput,
  GetUserByIdResult,
  getUsersByUsername,
  GetUsersByUsernameInput,
  GetUsersByUsernameResult,
  GetUsersResult,
  handleGetUserById,
  handleGetUsers,
  UsersOptions
} from "./getUsers";
import handleLogin, { LoginInput, LoginResult } from "./login";
import handleLogout from "./logout";
import handleRegister, { RegisterInput, RegisterResult } from "./register";

@ObjectType()
class MeResult {
  @Field()
  success!: boolean;

  @Field({ nullable: true })
  username?: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => MeResult)
  async me(@Ctx() context: MyContext): Promise<MeResult> {
    const result: MeResult = { success: true };
    if (!context.req.session.userId) {
      result.success = false;
      return result;
    }
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :userId", {
        userId: context.req.session.userId
      })
      .getOne();

    if (!user) {
      result.success = false;
      return result;
    }
    result.username = user.username;
    return result;
  }

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
  @UseMiddleware(isAuth)
  async createFriendship(
    @Arg("options") options: CreateFriendshipInput,
    @Ctx() context: MyContext
  ): Promise<RegularResult> {
    return await handleCreateFriendship(options, context);
  }

  @Mutation(() => RegularResult)
  @UseMiddleware(isAuth)
  async manageFriendsRequest(
    @Arg("options") options: ManageFriendsRequestInput,
    @Ctx() context: MyContext
  ): Promise<RegularResult> {
    return await handleManageFriendsRequest(options, context);
  }

  @Query(() => GetUsersResult)
  @UseMiddleware(isAuth)
  async getUsers(
    @Arg("options") options: UsersOptions,
    @Ctx() context: MyContext
  ): Promise<GetUsersResult> {
    return await handleGetUsers(options, context);
  }

  @Query(() => GetUsersByUsernameResult)
  @UseMiddleware(isAuth)
  async getUsersByUsername(
    @Arg("options") options: GetUsersByUsernameInput,
    @Ctx() context: MyContext
  ): Promise<GetUsersByUsernameResult> {
    return await getUsersByUsername(options, context);
  }

  @Query(() => GetUserByIdResult)
  @UseMiddleware(isAuth)
  async getUserById(
    @Arg("input") input: GetUserByIdInput,
    @Ctx() context: MyContext
  ): Promise<GetUserByIdResult> {
    return await handleGetUserById(input, context);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  logout(@Ctx() context: MyContext) {
    return handleLogout(context);
  }
}
