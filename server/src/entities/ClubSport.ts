import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { Sport } from "./Sport";

@ObjectType()
@Entity()
export class ClubSport extends BaseEntity {
  /**
   * Fields
   */

  @PrimaryColumn()
  clubId: number;

  @PrimaryColumn()
  sportId: number;

  /**
   * Connections
   */

  @ManyToOne(() => Club, (club) => club.eventConnection, {
    onDelete: "CASCADE",
  })
  club: Club;

  @ManyToOne(() => Sport, (s) => s.clubSportConnection, {
    onDelete: "CASCADE",
  })
  sport: Sport;
}
