import { Attendee } from "../entities/Attendee";
import { Query, Mutation, Arg, Resolver, Field, InputType } from "type-graphql";

@InputType()
class AttendeeInput {
  @Field(() => String)
  firstname!: string;

  @Field(() => String)
  lastname!: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  phoneNumber!: string;

  @Field(() => String)
  beemId!: string;
}

@Resolver(Attendee)
export class AttendeeResolver {
  @Query(() => [Attendee])
  attendees(): Promise<Attendee[] | undefined> {
    return Attendee.find();
  }

  @Mutation(() => Attendee)
  async createAttendee(
    @Arg("input") input: AttendeeInput
  ): Promise<Attendee | undefined> {
    const attendee = await Attendee.create(input).save();
    console.log(attendee);
    return attendee;
  }

  // @FieldResolver()
}
