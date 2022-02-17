import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { RegisterInput, RegisterResult } from "./register";
import handleRegister from "./register";
import { LoginInput, LoginResult } from "./login";
import { MyContext } from "../../types";
import handleLogin from "./login";

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

  @Query(() => String)
  sayHi() {
    return "Hi";
  }
}
