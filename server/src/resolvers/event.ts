import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Event } from "../entities/Event";

@InputType()
class EventInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Number, { nullable: true })
  capacity: number;

  @Field(() => String)
  clubBeemId: string;

  @Field(() => String, { nullable: true })
  venue: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => Number, { nullable: true })
  price: number;
}

@Resolver(Event)
export class EventResolver {
  @Query(() => Event)
  event() {
    return true;
  }

  @Mutation(() => Event)
  async createEvent(
    @Arg("input") input: EventInput
  ): Promise<Event | undefined> {
    const event = await Event.create(input).save();
    console.log(event);
    return event;
  }

  // @FieldResolver()
}
