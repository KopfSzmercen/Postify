import { Field, InputType, Int, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { Friendship } from "../../entities/Friendship";
import { User } from "../../entities/User";
import { MyContext } from "../../types";

const friendshipStatus = async (
  currentUserId: number,
  secondUserId: number
) => {
  try {
    const requestFromUser = await getConnection()
      .getRepository(Friendship)
      .createQueryBuilder("f")
      .where("f.user = :currentUserId AND f.friend = :secondUserId", {
        currentUserId,
        secondUserId
      })
      .getOne();

    const decisionOfSecondUser = await getConnection()
      .getRepository(Friendship)
      .createQueryBuilder("f")
      .where("f.user = :secondUserId AND f.friend = :currentUserId", {
        secondUserId,
        currentUserId
      })
      .getOne();

    if (requestFromUser && decisionOfSecondUser) return "ARE FRIENDS";

    if (requestFromUser && !decisionOfSecondUser) return "PENDING OUTGOING";

    if (!requestFromUser && decisionOfSecondUser) return "PENDING INCOMING";

    return "NO REQUEST";
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

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
  console.log(currUserId);
  const limit = options.limit || 20;
  const cursor = options.cursor || 1;

  const realLimit = Math.min(50, limit);
  const realLimitPlusOne = realLimit + 1;

  try {
    const users: User[] | UserProfile[] = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .orderBy("user.id", "ASC")
      .take(realLimitPlusOne)
      .where("user.id > :cursor AND user.id != :currUserId", {
        cursor,
        currUserId
      })
      .take(realLimitPlusOne)
      .getMany();

    const usersWithFriendship: UserProfile[] = [];

    for (let i = 0; i < users.length; i++) {
      const friendship = await friendshipStatus(currUserId, users[i].id);
      friendship &&
        usersWithFriendship.push({ ...users[i], friendshipStatus: friendship });
    }

    result.users = usersWithFriendship.slice(0, realLimit);
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
    const users = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.username LIKE :username AND user.id != :currUserId", {
        username: `%${username}%`,
        currUserId
      })
      .getMany();

    if (users.length > 0) {
      const usersWithFriendship: UserProfile[] = [];
      console.log("here");
      for (let i = 0; i < users.length; i++) {
        const friendship = await friendshipStatus(currUserId, users[i].id);

        friendship &&
          usersWithFriendship.push({
            ...users[i],
            friendshipStatus: friendship
          });
      }
      result.users = [...usersWithFriendship];
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
