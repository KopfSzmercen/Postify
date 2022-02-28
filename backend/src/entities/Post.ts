import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";
import { Vote } from "./Vote";

@ObjectType()
class PaginatedComment {
  @Field()
  id!: number;

  @Field()
  text!: string;

  @Field()
  updatedAt!: string;

  @Field()
  creatorName!: string;

  @Field()
  creatorId!: number;
}

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field(() => Int, { nullable: true })
  voteStatus?: number | null; // 1 or -1 or null

  @Field()
  @Column()
  creatorId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  creator!: User;

  @OneToMany(() => Vote, (vote) => vote.post)
  votes!: Vote[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[];

  @Field(() => [PaginatedComment], { nullable: true })
  paginatedComments?: PaginatedComment[];

  @Field()
  commentsNumber!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}
