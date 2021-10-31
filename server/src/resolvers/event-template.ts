import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { EventTemplate } from "../entities/EventTemplate";

@InputType()
class EventTemplateInput {
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

  @Field(() => String)
  templateName: string;
}

@Resolver(EventTemplate)
export class EventTemplateResolver {
  @Query(() => [EventTemplate])
  eventTemplates(): Promise<EventTemplate[] | undefined> {
    return EventTemplate.find();
  }

  @Mutation(() => EventTemplate)
  async createEventTemplate(
    @Arg("input") input: EventTemplateInput
  ): Promise<EventTemplate | undefined> {
    const eventTemplate = await EventTemplate.create(input).save();
    console.log(eventTemplate);
    return eventTemplate;
  }

  // @FieldResolver()
}
