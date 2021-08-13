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

@ObjectType()
@Entity()
export class User extends BaseEntity {
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

  @Field(() => Post)
  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  // host
  @Field(() => Event)
  @OneToMany(() => Event, (event) => event.host)
  events: Event[];

  @OneToMany(() => ClubFollower, (cf) => cf.follower)
  following_clubs: ClubFollower[];

  @OneToMany(() => ClubMember, (cm) => cm.member)
  club_member: ClubMember[];

  @OneToMany(() => ClubAdmin, (ca) => ca.admin)
  club_admin: ClubAdmin[];

  @OneToMany(() => EventAttendee, (ca) => ca.attendee)
  eventConnection: EventAttendee[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
