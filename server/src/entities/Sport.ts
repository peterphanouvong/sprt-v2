import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ClubSport } from "./ClubSport";

@ObjectType()
@Entity()
export class Sport extends BaseEntity {
  /**
   * Fields
   */

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  /**
   * Connections
   */

  @OneToMany(() => ClubSport, (cs) => cs.sport)
  clubSportConnection: [];
}
