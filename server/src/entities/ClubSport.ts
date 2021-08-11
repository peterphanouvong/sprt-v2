import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { Sport } from "./Sport";

@ObjectType()
@Entity()
export class ClubSport extends BaseEntity {
  @PrimaryColumn()
  clubId: number;

  @ManyToOne(() => Club, (club) => club.events)
  club: Club;

  @PrimaryColumn()
  sportId: number;

  @ManyToOne(() => Sport, (s) => s.clubs, {
    onDelete: "CASCADE",
  })
  sport: Sport;
}
