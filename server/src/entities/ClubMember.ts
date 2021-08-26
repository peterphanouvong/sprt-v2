import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { User } from "./User";

@ObjectType()
@Entity()
export class ClubMember extends BaseEntity {
  /**
   * Fields
   */

  @PrimaryColumn()
  clubId: number;

  @PrimaryColumn()
  memberId: number;

  /**
   * Connections
   */

  @ManyToOne(() => Club, (club) => club.followers, { onDelete: "CASCADE" })
  club: Club;

  @ManyToOne(() => User, (u) => u.clubMemberConnection, { onDelete: "CASCADE" })
  member: User;
}
