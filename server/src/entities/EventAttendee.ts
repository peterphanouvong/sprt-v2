import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Event } from "./Event";
import { Attendee } from "./Attendee";

@ObjectType()
@Entity()
export class EventAttendee extends BaseEntity {
  @PrimaryColumn()
  @Field()
  eventId: number;

  @PrimaryColumn()
  @Field()
  attendeeId: number;

  @ManyToOne(() => Event, (event) => event.attendeeConnection, {
    onDelete: "CASCADE",
  })
  event: Event;

  @ManyToOne(() => Attendee, (attendee) => attendee.eventConnection, {
    onDelete: "CASCADE",
  })
  attendee: Attendee;
}
