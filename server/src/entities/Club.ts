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

  @OneToMany(() => ClubFollower, (cf) => cf.club)
  followers: ClubFollower[];

  @OneToMany(() => ClubAdmin, (ca) => ca.club)
  admins: ClubAdmin[];

  @OneToMany(() => ClubMember, (cm) => cm.club)
  members: ClubMember[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
