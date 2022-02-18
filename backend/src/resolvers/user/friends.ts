import { Field, InputType, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { Friendship } from "../../entities/Friendship";
import { User } from "../../entities/User";
import { MyContext } from "../../types";

@InputType()
export class CreateFriendshipInput {
  @Field()
  friend!: number;
}

@ObjectType()
export class RegularResult {
  @Field()
  success!: boolean;

  @Field(() => [String])
  errors!: string[];
}

export const handleCreateFriendship = async (
  options: CreateFriendshipInput,
  ctx: MyContext
) => {
  const result: RegularResult = {
    success: true,
    errors: []
  };

  //*TODO CHANGE TO SESSION */
  const userId = 46;

  try {
    if (userId === options.friend) {
      result.success = false;
      result.errors.push("Users ids are the same");
      return result;
    }
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .select("user.id")
      .where("user.id = :id", { id: userId })
      .getOne();

    if (!user) {
      result.success = false;
      result.errors.push(`User with id ${userId} does not exist`);
      return result;
    }

    const friend = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .select("user.id")
      .where("user.id = :id", { id: options.friend })
      .getOne();

    if (!friend) {
      result.success = false;
      result.errors.push(`User with id ${friend} does not exist`);
      return result;
    }

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Friendship)
      .values({
        user: user.id,
        friend: friend.id
      })
      .execute();

    return result;
  } catch (err) {
    const error = err as any;
    result.success = false;
    result.errors.push(error?.msg);

    return result;
  }
};

@ObjectType()
class FriendsRequest {
  @Field(() => String)
  message!: string;

  @Field(() => Number)
  senderId!: number;

  @Field(() => String)
  createdAt!: string;
}

@ObjectType()
export class FriendsRequestsResult extends RegularResult {
  @Field(() => [FriendsRequest])
  requests!: FriendsRequest[];
}

export const getFriendshipRequest = async (ctx: MyContext) => {
  //   const { userId } = ctx.req.session;
  const userId = 42;
  const result: FriendsRequestsResult = {
    success: true,
    errors: [],
    requests: []
  };

  if (!userId) {
    result.success = false;
    result.errors.push("User id not provided");
    return result;
  }

  try {
    const friendships = await getConnection()
      .getRepository(Friendship)
      .createQueryBuilder("f")
      .where("f.friend = :friendId", { friendId: userId })
      .getMany();

    const allRequests: FriendsRequest[] = [];

    for (let i = 0; i < friendships.length; i++) {
      const r = friendships[i];
      const senderUsername = await getConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .select("user.username")
        .where("user.id = :id", { id: r.user })
        .getOne();

      const builtRequest: FriendsRequest = {
        message: `${senderUsername?.username} wants to be Your friend`,
        senderId: r.user,
        createdAt: r.createdAt.toISOString()
      };
      allRequests.push({ ...builtRequest });
    }
    result.requests = [...allRequests];
    return result;
  } catch (error) {
    console.log(error);
    result.success = false;
    return result;
  }
};

@InputType()
export class ManageFriendsRequestInput {
  @Field()
  senderId!: number;

  @Field()
  action!: "accept" | "reject";
}

export const handleManageFriendsRequest = async (
  options: ManageFriendsRequestInput,
  ctx: MyContext
) => {
  const result: RegularResult = {
    success: true,
    errors: []
  };

  //const { userId } = ctx.req.session;
  const userId = 42;

  try {
    if (options.action === "reject") {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Friendship)
        .where("user = :userId and friend = :friendId", {
          userId: options.senderId,
          friendId: userId
        })
        .execute();
      return result;
    }

    if (options.action === "accept") {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Friendship)
        .values({
          user: userId,
          friend: options.senderId
        })
        .execute();

      return result;
    }
    return result;
  } catch (err) {
    const error = err as any;
    result.success = false;
    result.errors.push(error.message);
    return result;
  }
};
