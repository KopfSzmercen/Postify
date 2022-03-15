import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
@ObjectType()
export class Vote extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn()
  userId!: number;

  @Column()
  @Field(() => Int)
  value!: number;

  @PrimaryColumn()
  postId!: number;

  @ManyToOne(() => User, (user) => user.votes, {
    onDelete: "CASCADE"
  })
  user!: User;

  @ManyToOne(() => Post, (post) => post.votes, {
    onDelete: "CASCADE"
  })
  post!: Post;
}
