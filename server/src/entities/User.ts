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
import { Event } from "./Event";
import { EventTemplate } from "./EventTemplate";

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
  @Column({ nullable: true })
  firstname: string;

  @Field()
  @Column({ nullable: true })
  lastname: string;

  @Field()
  @Column({ unique: true })
  clubName!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => [Event], { nullable: true })
  @OneToMany(() => Event, (event) => event.owner)
  events: Event[];

  @Field(() => [EventTemplate], { nullable: true })
  @OneToMany(() => EventTemplate, (eventTemplate) => eventTemplate.owner)
  eventTemplates: EventTemplate[];

  // quick events

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
