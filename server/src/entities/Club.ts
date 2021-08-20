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
import { ClubAdmin } from "./ClubAdmin";
import { ClubEvent } from "./ClubEvent";
import { ClubFollower } from "./ClubFollower";
import { ClubMember } from "./ClubMember";
import { ClubRequestedMember } from "./ClubRequestedMember";
import { User } from "./User";
import { Event } from "./Event";

@ObjectType()
@Entity()
export class Club extends BaseEntity {
  /**
   * Fields
   */

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ unique: true })
  phoneNumber!: string;

  @Field()
  @Column()
  description: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [User])
  followers: User[];

  @Field(() => [User])
  requestedMembers: User[];

  @Field(() => [User])
  admins: User[];

  // hosting events
  @Field(() => [Event], { nullable: true })
  @OneToMany(() => Event, (event) => event.club)
  events: Event[];

  /**
   * Connections
   */

  @OneToMany(() => ClubEvent, (ce) => ce.club)
  eventConnection: ClubEvent[];

  @OneToMany(() => ClubFollower, (cf) => cf.club)
  followerConnection: ClubFollower[];

  @OneToMany(() => ClubRequestedMember, (cm) => cm.club)
  requestedMemberConnection: ClubRequestedMember[];

  @OneToMany(() => ClubAdmin, (ca) => ca.club)
  adminConnection: ClubAdmin[];

  @OneToMany(() => ClubMember, (cm) => cm.club)
  memberConnection: ClubMember[];
}

/**
 * Notes:
 * I would like to consider this for many to many relationships: "adminIds": [1,2,3] --> This will make sql things easier
 */
