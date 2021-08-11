import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { User } from "./User";

@ObjectType()
@Entity()
export class ClubAdmin extends BaseEntity {
  @PrimaryColumn()
  clubId: number;

  @ManyToOne(() => Club, (club) => club.admins)
  club: Club;

  @PrimaryColumn()
  adminId: number;

  @ManyToOne(() => User, (u) => u.club_admin)
  admin: User;
}
