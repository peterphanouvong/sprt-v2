import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { User } from "./User";

@ObjectType()
@Entity()
export class ClubRequestedMember extends BaseEntity {
  /**
   * Fields
   */

  @PrimaryColumn()
  clubId: number;

  @PrimaryColumn()
  requestedMemberId: number;

  /**
   * Connections
   */

  @ManyToOne(() => Club, (club) => club.followers)
  club: Club;

  @ManyToOne(() => User, (u) => u.clubRequestedMemberConnection)
  requestedMember: User;
}