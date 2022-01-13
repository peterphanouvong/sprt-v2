import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { EventTemplate } from "../entities/EventTemplate";

@InputType()
class EventTemplateInput {
  @Field(() => String)
  templateName: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Number, { nullable: true })
  capacity: number;

  @Field(() => String, { nullable: true })
  clubBeemId: string;

  @Field(() => String, { nullable: true })
  bsb: string;

  @Field(() => String, { nullable: true })
  accountNumber: string;

  @Field(() => String, { nullable: true })
  venue: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => String, { nullable: true })
  date: Date;

  @Field(() => String, { nullable: true })
  startTime: string;

  @Field(() => String, { nullable: true })
  endTime: string;

  @Field(() => String, { nullable: true })
  youtubeLink: string;

  @Field(() => String, { nullable: true })
  logoImageLink: string;

  @Field(() => String, { nullable: true })
  bannerImageLink: string;
}

@Resolver(EventTemplate)
export class EventTemplateResolver {
  @Query(() => [EventTemplate])
  eventTemplates(
    @Ctx() { req }: MyContext
  ): Promise<EventTemplate[] | undefined> {
    return EventTemplate.find({ where: { ownerId: req.session.userId } });
  }

  @Query(() => EventTemplate)
  eventTemplate(@Arg("id") id: number): Promise<EventTemplate | undefined> {
    return EventTemplate.findOne({ id });
  }

  @Mutation(() => EventTemplate)
  async createEventTemplate(
    @Arg("input") input: EventTemplateInput,
    @Ctx() { req }: MyContext
  ): Promise<EventTemplate | undefined> {
    const eventTemplate = await EventTemplate.create({
      ...input,
      ownerId: req.session.userId,
    }).save();

    return eventTemplate;
  }

  @Mutation(() => Boolean)
  async deleteEventTemplate(
    @Arg("templateId") templateId: number
  ): Promise<Boolean> {
    const eventTemplate = await EventTemplate.findOne(templateId);
    if (!eventTemplate) {
      return false;
    }

    await EventTemplate.delete(templateId);
    return true;
  }

  @Mutation(() => EventTemplate, { nullable: true })
  async updateEventTemplate(
    @Arg("id") id: number,
    @Arg("input") input: EventTemplateInput
  ): Promise<EventTemplate | null> {
    const { raw } = await getConnection()
      .createQueryBuilder()
      .update(EventTemplate)
      .set({ ...input })
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return raw[0];
  }

  // @FieldResolver(() => User, { nullable: true })
  // async owner(
  //   @Root() eventTemplate: EventTemplate,
  //   // @Ctx() { userLoader }: MyContext
  // ): Promise<User | null> {
  //   const templateOwner = await getConnection().query(`
  //     select "*"
  //     from "user"
  //     where "id = ${eventTemplate.}
  //   `);

  //   // console.log(userLoader);
  //   // console.log(userLoader.load(eventTemplate.id));
  //   // return userLoader.load(eventTemplate.id);
  //   return null;
  // }

  // @FieldResolver()
}
