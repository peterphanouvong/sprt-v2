import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@ObjectType()
@Entity()
export class EventAttendee extends BaseEntity {
  /**
   * Fields
   */
  @PrimaryColumn()
  eventId: number;

  @PrimaryColumn()
  attendeeId: number;

  /**
   * Connections
   */
  @ManyToOne(() => Event, (event) => event.attendeeConnection)
  event: Event;

  @ManyToOne(() => User, (user) => user.eventAttendeeConnection)
  attendee: User;
}
