import { Field, FieldResolver, Int, ObjectType, Root } from "type-graphql";
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ClubEvent } from "./ClubEvent";
import { EventAttendee } from "./EventAttendee";
// import { EventAttendee } from "./EventAttendee";
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

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => String)
  @Column()
  location!: string;

  @Field(() => String)
  @Column()
  datetime!: Date;

  @Field()
  @Column()
  hostId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.events)
  host: User;

  @OneToMany(() => ClubEvent, (ce) => ce.event)
  clubs: ClubEvent[];

  @OneToMany(() => EventAttendee, (ea) => ea.event)
  attendeeConnection: EventAttendee[];

  @Field(() => [User])
  attendees: User[];

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
