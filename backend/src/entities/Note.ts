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
export class Note extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn()
  userId!: number;

  @Field()
  @Column()
  text!: string;

  @ManyToOne(() => User, (user) => user.votes)
  user!: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}
