import { Field, Int, ObjectType } from "type-graphql";
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
import { User } from "./User";

@ObjectType()
@Entity()
export class Event extends BaseEntity {
  /**
   * Fields
   */

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
  startTime!: Date;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  capacity: number;

  @Field(() => String)
  @Column()
  endTime: Date;

  @Field()
  @Column()
  hostId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.events)
  host: User;

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

  /**
   * Connections
   */

  @OneToMany(() => ClubEvent, (ce) => ce.event)
  clubConnection: ClubEvent[];

  @OneToMany(() => EventAttendee, (ea) => ea.event, { onDelete: "CASCADE" })
  attendeeConnection: EventAttendee[];
}
