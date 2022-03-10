import { Field, Int, ObjectType } from "type-graphql";
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

  @Field()
  @Column()
  type!: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  senderId?: number;

  @ManyToOne(() => User, (user) => user.notes)
  user!: User;

  @ManyToOne(() => User, (user) => user.notes, {
    onDelete: "CASCADE"
  })
  post!: Note;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}
