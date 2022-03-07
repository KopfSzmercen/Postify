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
import handleLogout from "./logout";
import isAuth from "../../middleware/isAuth";
import { getConnection } from "typeorm";

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

  @Query(() => FriendsRequestsResult)
  @UseMiddleware(isAuth)
  async queryFriendsRequests(
    @Ctx() context: MyContext
  ): Promise<FriendsRequestsResult> {
    return await getFriendshipRequest(context);
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  logout(@Ctx() context: MyContext) {
    return handleLogout(context);
  }
}
