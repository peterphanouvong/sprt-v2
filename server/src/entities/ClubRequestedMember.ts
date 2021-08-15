import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { User } from "./User";

@ObjectType()
@Entity()
export class ClubRequestedMember extends BaseEntity {
  @PrimaryColumn()
  clubId: number;

  @ManyToOne(() => Club, (club) => club.followers)
  club: Club;

  @PrimaryColumn()
  requestedMemberId: number;

  @ManyToOne(() => User, (u) => u.club_member)
  requestedMember: User;
}
