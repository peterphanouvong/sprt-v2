import { Field, ObjectType } from "type-graphql";
import { ChildEntity, Column } from "typeorm";
import { Attendee } from "./Attendee";

@ObjectType()
@ChildEntity()
export class SavedAttendee extends Attendee {
  @Column()
  password!: string;

  @Field(() => String)
  @Column({ nullable: true })
  avatarImageLink: string;
}
