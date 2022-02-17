import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../../entities/User";
import { MyContext } from "../../types";
import bcrypt from "bcrypt";

@InputType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ObjectType()
class LoginError {
  @Field(() => String)
  field!: string;

  @Field(() => String)
  message!: string;
}

@ObjectType()
export class LoginResult {
  @Field()
  success!: boolean;

  @Field(() => [LoginError])
  errors!: LoginError[];
}

const handleLogin = async (input: LoginInput, context: MyContext) => {
  const loginResult: LoginResult = {
    success: true,
    errors: []
  };

  const user = await User.findOne({ email: input.email });

  if (!user) {
    loginResult.errors.push({
      field: "email",
      message: "No user with this email"
    });
    loginResult.success = false;
    return loginResult;
  }

  const passwordsMatch = await bcrypt.compare(input.password, user.password);

  if (!passwordsMatch) {
    loginResult.errors.push({
      field: "password",
      message: "Invalid password"
    });
    loginResult.success = false;
    return loginResult;
  }

  context.req.session.userId = user.id;

  return loginResult;
};

export default handleLogin;
