import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Attendee } from "./Attendee";

@ObjectType()
@Entity()
export class SavedAttendee extends Attendee {
  @Column()
  password!: string;

  @Field(() => String)
  @Column({ nullable: true })
  avatarImageLink: string;
}
