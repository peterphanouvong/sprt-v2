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
  @JoinColumn({ name: "eventId" })
  event: Event;

  @PrimaryColumn()
  attendeeId: number;

  @ManyToOne(() => User, (user) => user.eventConnection)
  @JoinColumn({ name: "attendeeId" })
  attendee: User;
}
