import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { Event } from "./Event";

@ObjectType()
@Entity()
export class ClubEvent extends BaseEntity {
  /**
   * Fields
   */

  @PrimaryColumn()
  clubId: number;

  @PrimaryColumn()
  eventId: number;

  /**
   * Connections
   */

  @ManyToOne(() => Club, (club) => club.eventConnection)
  club: Club;

  @ManyToOne(() => Event, (e) => e.clubConnection, {
    onDelete: "CASCADE",
  })
  event: Event;
}
