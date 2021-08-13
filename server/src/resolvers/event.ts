import {
  Arg,
  Int,
  Query,
  Mutation,
  Resolver,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  FieldResolver,
  Root,
} from "type-graphql";
import { MyContext } from "src/types";
import { isAuth } from "../middleware/isAuth";
import { Event } from "../entities/Event";
import { User } from "../entities/User";

@InputType()
class EventInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  datetime: string;
}

@Resolver(Event)
export class EventResolver {
  @FieldResolver(() => User)
  host(@Root() event: Event) {
    return User.findOne(event.hostId);
  }

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return Event.find();
  }

  @Query(() => Event, { nullable: true })
  event(@Arg("id", () => Int) id: number): Promise<Event | undefined> {
    return Event.findOne(id);
  }

  @Mutation(() => Event)
  @UseMiddleware(isAuth)
  async createEvent(
    @Ctx() { req }: MyContext,
    @Arg("input") input: EventInput
  ): Promise<Event | undefined> {
    const { id } = await Event.create({
      ...input,
      hostId: req.session.userId,
    }).save();
    const event = await Event.findOne(id);
    return event;
  }

  @Mutation(() => Event, { nullable: true })
  async updateEvent(
    @Ctx() { req }: MyContext,
    @Arg("id") id: number,
    @Arg("input") input: EventInput
  ): Promise<Event | null | undefined> {
    const event = await Event.findOne(id);
    if (!event) {
      return null;
    }

    if (req.session.userId !== event.hostId) {
      return null;
    }

    await Event.update(id, { ...input });
    return Event.findOne(id);
  }

  @Mutation(() => Boolean)
  async deleteEvent(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const event = await Event.findOne(id);

    if (!event) {
      return false;
    }

    if (event.hostId != req.session.userId) {
      throw new Error("not authorized");
    }

    await Event.delete({ id, hostId: req.session.userId });
    return true;
  }
}
