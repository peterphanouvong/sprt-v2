import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { Event } from "./Event";

@ObjectType()
@Entity()
export class ClubEvent extends BaseEntity {
  @PrimaryColumn()
  clubId: number;

  @ManyToOne(() => Club, (club) => club.events)
  club: Club;

  @PrimaryColumn()
  eventId: number;

  @ManyToOne(() => Event, (e) => e.clubs, {
    onDelete: "CASCADE",
  })
  event: Event;
}
