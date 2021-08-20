import { Field, Int, ObjectType } from "type-graphql";
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Post } from "./Post";
import { Event } from "./Event";
import { ClubFollower } from "./ClubFollower";
import { ClubMember } from "./ClubMember";
import { ClubAdmin } from "./ClubAdmin";
import { EventAttendee } from "./EventAttendee";
import { ClubRequestedMember } from "./ClubRequestedMember";
import { Club } from "./Club";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  /**
   * Fields
   */

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // created posts
  @Field(() => Post)
  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  // hosting events
  @Field(() => [Event], { nullable: true })
  @OneToMany(() => Event, (event) => event.host)
  events: Event[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [Club], { nullable: true })
  followingClubs: Club[];

  /**
   * Connections
   */

  @OneToMany(() => ClubFollower, (cf) => cf.follower)
  clubFollowerConnection: ClubFollower[];

  @OneToMany(() => ClubMember, (cm) => cm.member)
  clubMemberConnection: ClubMember[];

  @OneToMany(() => ClubAdmin, (ca) => ca.admin)
  clubAdminConnection: ClubAdmin[];

  @OneToMany(() => EventAttendee, (ca) => ca.attendee)
  eventAttendeeConnection: EventAttendee[];

  @OneToMany(() => ClubRequestedMember, (crm) => crm.requestedMember)
  clubRequestedMemberConnection: ClubRequestedMember[];
}
