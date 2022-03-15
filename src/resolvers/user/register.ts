import { Field, InputType, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entities/User";
import isEmail from "../../utils/validation/isEmail";
import isLength from "../../utils/validation/isLength";
import bcrypt from "bcrypt";

@InputType()
export class RegisterInput {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  confirmPassword!: string;
}

@ObjectType()
class RegisterError {
  @Field(() => String)
  field!: string;

  @Field(() => String)
  message!: string;
}

@ObjectType()
export class RegisterResult {
  @Field()
  success!: boolean;

  @Field(() => [RegisterError])
  errors!: RegisterError[];
}

const handleRegister = async (input: RegisterInput) => {
  const registerResult: RegisterResult = {
    success: true,
    errors: []
  };
  const isValidUsername = isLength(input.username, 5, 15);
  if (isValidUsername !== true)
    registerResult.errors.push({ field: "username", message: isValidUsername });

  const isValidPassword = isLength(input.password, 5, 15);
  if (isValidPassword !== true)
    registerResult.errors.push({ field: "password", message: isValidPassword });

  if (input.password !== input.confirmPassword)
    registerResult.errors.push({
      field: "password",
      message: "Passwords do not match"
    });

  if (!isEmail(input.email))
    registerResult.errors.push({ field: "email", message: "Invalid email" });

  if (registerResult.errors.length > 0) {
    registerResult.success = false;
    return registerResult;
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username: input.username,
        email: input.email,
        password: hashedPassword
      })
      .returning("*")
      .execute();
  } catch (err) {
    const error = err as any;

    if (error?.code === "23505" && error?.detail.includes("username"))
      registerResult.errors.push({
        field: "username",
        message: "This username is already used."
      });

    if (error?.code === "23505" && error?.detail.includes("email"))
      registerResult.errors.push({
        field: "email",
        message: "This email is already used."
      });
  }

  if (registerResult.errors.length > 0) registerResult.success = false;
  return registerResult;
};

export default handleRegister;
