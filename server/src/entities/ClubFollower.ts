import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./Club";
import { User } from "./User";

@ObjectType()
@Entity()
export class ClubFollower extends BaseEntity {
  @PrimaryColumn()
  clubId: number;

  @ManyToOne(() => Club, (club) => club.followers)
  club: Club;

  @PrimaryColumn()
  followerId: number;

  @ManyToOne(() => User, (u) => u.following_clubs)
  follower: User;
}
