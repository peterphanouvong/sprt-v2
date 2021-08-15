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

@ObjectType()
@Entity()
export class Club extends BaseEntity {
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
  @Column()
  phoneNumber!: string;

  @Field()
  @Column()
  description: string;

  @OneToMany(() => ClubEvent, (ce) => ce.club)
  events: ClubEvent[];

  @Field(() => [User])
  followers: User[];

  @OneToMany(() => ClubFollower, (cf) => cf.club)
  followerConnection: ClubFollower[];

  @Field(() => [User])
  requestedMembers: User[];

  @OneToMany(() => ClubRequestedMember, (cm) => cm.club)
  requestedMemberConnection: ClubRequestedMember[];

  @Field(() => [User])
  admins: User[];

  @OneToMany(() => ClubAdmin, (ca) => ca.club)
  adminConnection: ClubAdmin[];

  @OneToMany(() => ClubMember, (cm) => cm.club)
  members: ClubMember[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
