import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn()
  userId!: number;

  @Column()
  @Field()
  text!: string;

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

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}
