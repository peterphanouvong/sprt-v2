import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class EventTemplate extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  templateName: string;

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  date: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  startTime: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  endTime: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  venue: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  price: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  youtubeLink: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  logoImageLink: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  bannerImageLink: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  capacity: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  clubBeemId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.eventTemplates)
  owner: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  // Future proofing - not being used yet
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  level: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  mixed: string;
}
