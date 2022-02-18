import { Field, InputType, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entities/User";
import { MyContext } from "../../types";

@InputType()
export class UsersOptions {
  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  cursor?: string;
}

@ObjectType()
class UserProfile {
  @Field()
  username!: string;

  @Field()
  id!: number;
}

@ObjectType()
export class GetUsersResult {
  @Field()
  success!: boolean;

  @Field(() => [String], { nullable: true })
  errors?: string[];

  @Field(() => [UserProfile])
  users!: UserProfile[];

  @Field()
  hasMore!: boolean;
}

export const handleGetUsers = async (options: UsersOptions, ctx: MyContext) => {
  const result: GetUsersResult = {
    success: true,
    errors: [],
    users: [],
    hasMore: false
  };
  const limit = options.limit || 20;
  const cursor = options.cursor || "a";

  const realLimit = Math.min(50, limit);
  const realLimitPlusOne = realLimit + 1;

  try {
    const users = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .orderBy("user.username", "DESC")
      .take(realLimitPlusOne)
      .where("user.username > :cursor", { cursor })
      .take(realLimitPlusOne)
      .getMany();

    result.users = users.slice(0, realLimit);
    if (users.length === realLimitPlusOne) result.hasMore = true;
    return result;
  } catch (err) {
    const error = err as any;
    result.success = false;
    result.errors = [];
    result.errors.push(error.message);
    return result;
  }
};
