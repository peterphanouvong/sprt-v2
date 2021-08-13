import { ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@ObjectType()
@Entity()
export class EventAttendee extends BaseEntity {
  @PrimaryColumn()
  eventId: number;

  @ManyToOne(() => Event, (event) => event.attendeeConnection)
  event: Event;

  @PrimaryColumn()
  attendeeId: number;

  @ManyToOne(() => User, (user) => user.eventConnection)
  attendee: User;
}
