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
import { Attendee } from "./Attendee";
import { EventAttendee } from "./EventAttendee";
import { User } from "./User";

@ObjectType()
@Entity()
export class Event extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  isCompleted: boolean;

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

  @Field(() => [EventAttendee])
  @ManyToOne(() => EventAttendee, (ea) => ea.event)
  attendeeConnection: EventAttendee[];

  @Field()
  @Column()
  ownerId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.events)
  owner: User;

  @Field(() => [Attendee])
  attendees: Attendee[];

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
