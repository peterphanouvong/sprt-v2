import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { User } from "./User";

@ObjectType()
@Entity()
export class ClubMember extends BaseEntity {
  @PrimaryColumn()
  clubId: number;

  @ManyToOne(() => Club, (club) => club.followers)
  club: Club;

  @PrimaryColumn()
  memberId: number;

  @ManyToOne(() => User, (u) => u.club_member)
  member: User;
}
