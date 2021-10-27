import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Event } from "./Event";

@ObjectType()
@Entity()
export class EventTemplate extends Event {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  templateName: string;
}
