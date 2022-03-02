import { Field, InputType, Int, ObjectType } from "type-graphql";
import { getConnection } from "typeorm/globals";
import { Post } from "../../entities/Post";
import { Vote } from "../../entities/Vote";
import { MyContext } from "../../types";

@InputType()
export class VoteInput {
  @Field(() => Int)
  postId!: number;

  @Field(() => Int)
  value!: number;
}

@ObjectType()
export class VoteResult {
  @Field()
  success!: boolean;

  @Field(() => Int, { nullable: true })
  updatedPoints?: number;

  @Field(() => [String])
  errors!: string[];
}

const handleVote = async (input: VoteInput, ctx: MyContext) => {
  const isUpvote = input.value !== -1;
  const realValue = isUpvote ? 1 : -1;
  const { userId } = ctx.req.session;
  const { postId } = input;

  const result: VoteResult = {
    success: true,
    errors: []
  };

  try {
    const vote = await Vote.findOne({
      where: {
        postId,
        userId
      }
    });
    console.log(vote);
    if (vote && vote.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update vote
          set value = $1
          where "postId" = $2 and "userId" = $3
        `,
          [realValue, postId, userId]
        );

        await tm.query(
          `
          update post
          set points = points + $1
          where id = $2
        `,
          [2 * realValue, postId]
        );
      });
    } else if (!vote) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
        insert into vote ("userId", "postId", value)
    values ($1, $2, $3);
        `,
          [userId, postId, realValue]
        );
        await tm.query(
          `
        update post
    set points = points + $1
    where id = $2;
        `,
          [realValue, postId]
        );
      });
    }
    const post = await getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .where("p.id = :postId", { postId })
      .getOne();

    result.updatedPoints = post?.points;

    return result;
  } catch (err) {
    const error = err as Error;
    result.success = false;
    if (error.message) result.errors.push(error.message);
    return result;
  }
};

export default handleVote;
