import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { User } from "./User";

@ObjectType()
@Entity()
export class ClubAdmin extends BaseEntity {
  /**
   * Fields
   */

  @PrimaryColumn()
  clubId: number;

  @PrimaryColumn()
  adminId: number;

  /**
   * Connections
   */

  @ManyToOne(() => Club, (club) => club.adminConnection)
  club: Club;

  @ManyToOne(() => User, (u) => u.clubAdminConnection)
  admin: User;
}
