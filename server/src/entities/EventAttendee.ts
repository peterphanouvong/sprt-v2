import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Event } from "./Event";
import { Attendee } from "./Attendee";

@ObjectType()
@Entity()
export class EventAttendee extends BaseEntity {
  @PrimaryColumn()
  @Field(() => Number)
  eventId: number;

  @PrimaryColumn()
  @Field(() => Number)
  attendeeId: number;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isConfirmed: boolean;

  @Field(() => String)
  joinTime: Date;

  @ManyToOne(() => Event, (event) => event.attendeeConnection, {
    onDelete: "CASCADE",
  })
  event: Event;

  @ManyToOne(() => Attendee, (attendee) => attendee.eventConnection, {
    onDelete: "CASCADE",
  })
  attendee: Attendee;
}
