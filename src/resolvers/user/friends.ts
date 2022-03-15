import { Field, InputType, Int, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { Friendship } from "../../entities/Friendship";
import { Note } from "../../entities/Note";
import { User } from "../../entities/User";
import { MyContext } from "../../types";

@InputType()
export class CreateFriendshipInput {
  @Field(() => Int)
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

  const userId = ctx.req.session.userId;

  try {
    if (userId === options.friend) {
      result.success = false;
      result.errors.push("Users ids are the same");
      return result;
    }
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .select("user")
      .where("user.id = :id", { id: userId })
      .getOne();

    console.log(user);
    if (!user) {
      result.success = false;
      result.errors.push(`User with id ${userId} does not exist`);
      return result;
    }

    const friend = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .select("user")
      .where("user.id = :id", { id: options.friend })
      .getOne();

    if (!friend) {
      result.success = false;
      result.errors.push(`User with id ${friend} does not exist`);
      return result;
    }

    const isAlreadySent = await getConnection()
      .getRepository(Friendship)
      .createQueryBuilder("f")
      .where("user = :friendId AND friend = :userId", {
        friendId: options.friend,
        userId
      })
      .getOne();

    //IF other user already sent invitation accept the friendship
    if (isAlreadySent) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Friendship)
        .values({
          user: userId,
          friend: options.friend
        })
        .execute();

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Note)
        .values({
          text: `${user.username} and You are friends now!`,
          userId: friend.id,
          type: "TEXT"
        })
        .execute();

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Note)
        .values({
          text: `${friend.username} and You are friends now!`,
          userId: user.id,
          type: "TEXT"
        })
        .execute();

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

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Note)
      .values({
        text: `${user.username} wants to be your friend`,
        senderId: user.id,
        userId: friend.id,
        type: "FRIENDS REQ"
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

@InputType()
export class ManageFriendsRequestInput {
  @Field(() => Int)
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

  const { userId } = ctx.req.session;
  const senderId = options.senderId;

  try {
    const initialRequest = await getConnection()
      .getRepository(Friendship)
      .createQueryBuilder("f")
      .where("f.friend = :userId AND f.user = :senderId", { userId, senderId })
      .getOne();

    if (!initialRequest) {
      result.errors = [];
      result.errors.push("Such friends request does not exist");
      result.success = false;
      return result;
    }

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
