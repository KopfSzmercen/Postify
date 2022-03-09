import { Field, InputType, Int, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entities/User";
import { MyContext } from "../../types";

@InputType()
export class UsersOptions {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  cursor?: number;
}

@ObjectType()
class UserProfile {
  @Field()
  username!: string;

  @Field()
  id!: number;

  @Field()
  friendshipStatus!:
    | "ARE FRIENDS"
    | "NO REQUEST"
    | "PENDING OUTGOING"
    | "PENDING INCOMING";
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
  const currUserId = ctx.req.session.userId;
  const limit = options.limit || 20;
  const cursor = options.cursor || 1;

  const realLimit = Math.min(50, limit);
  const realLimitPlusOne = realLimit + 1;

  try {
    const replacements = [cursor, currUserId, realLimitPlusOne];

    const users = await getConnection().query(
      `
      select u.*,
      (select * from get_status($2, u.id) ) "friendshipStatus"

      from "user" u
      where u.id > $1 and u.id != $2
      order by u.id ASC
      limit $3
      `,
      replacements
    );
    result.users = users;
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

@InputType()
export class GetUsersByUsernameInput {
  @Field()
  username!: string;
}

@ObjectType()
export class GetUsersByUsernameResult {
  @Field()
  success!: boolean;

  @Field(() => [String], { nullable: true })
  errors?: string[];

  @Field(() => [UserProfile])
  users!: UserProfile[];
}

export const getUsersByUsername = async (
  options: GetUsersByUsernameInput,
  ctx: MyContext
) => {
  const result: GetUsersByUsernameResult = {
    success: true,
    users: []
  };
  const currUserId = ctx.req.session.userId;
  const { username } = options;

  try {
    // const users = await getConnection()
    //   .getRepository(User)
    //   .createQueryBuilder("user")
    //   .where("user.username LIKE :username AND user.id != :currUserId", {
    //     username: `%${username}%`,
    //     currUserId
    //   })
    //   .getMany();

    const users = await getConnection().query(
      `
      select u.*,
      (select * from get_status($2, u.id) ) "friendshipStatus"

      from "user" u
      where u.username LIKE CONCAT('%', $1::text, '%') and u.id != $2

    `,
      [username, currUserId]
    );
    if (users.length > 0) {
      result.users = users;
    }
    return result;
  } catch (err) {
    const error = err as Error;
    result.success = false;
    result.errors = [];
    error.message && result.errors.push(error.message);
    return result;
  }
};
