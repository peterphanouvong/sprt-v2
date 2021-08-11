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
} from "type-graphql";
import { MyContext } from "src/types";
import { isAuth } from "../middleware/isAuth";
import { Event } from "../entities/Event";
// import { EventAttendee } from "../entities/EventAttendee";
// import { User } from "../entities/User";

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

  // @Field()
  // hostId: number;
}

// @ObjectType()
// class PaginatedEvents {
//   @Field(() => [Post])
//   posts: Post[];

//   @Field(() => Boolean)
//   hasMore: boolean;
// }

@Resolver(Event)
export class EventResolver {
  @Query(() => [Event])
  async events(): Promise<Event[]> {
    // @Arg("limit", () => Int) limit: number,
    // @Arg("cursor", () => String, { nullable: true }) cursor: string | null

    return Event.find({ relations: ["host"] });

    // const realLimit = Math.min(50, limit);
    // const realLimitPlusOne = realLimit + 1;
    // const replacements: any[] = [realLimitPlusOne];
    // if (cursor) {
    //   replacements.push(new Date(parseInt(cursor)));
    // }
    // const posts = await getConnection().query(
    //   `
    //     select p.*,
    //     json_build_object(
    //       'id', u.id,
    //       'username', u.username,
    //       'email', u.email,
    //       'createdAt', u."createdAt",
    //       'updatedAt', u."updatedAt"
    //     ) creator
    //     from post p
    //     inner join "user" u on u.id = p."creatorId"
    //     ${cursor ? `where p."createdAt" < $2` : ""}
    //     order by p."createdAt" DESC
    //     limit $1
    //   `,
    //   replacements
    // );
    // return {
    //   posts: posts.slice(0, realLimit),
    //   hasMore: posts.length === realLimitPlusOne,
    // };
  }

  @Query(() => Event, { nullable: true })
  event(@Arg("id", () => Int) id: number): Promise<Event | undefined> {
    return Event.findOne(id, { relations: ["host"] });
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
    const event = await Event.findOne(id, { relations: ["host"] });
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
    return Event.findOne(id, { relations: ["host"] });
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

  // @Mutation(() => Boolean)
  // async addAttendee(
  //   @Arg("id") id: number,
  //   @Arg("userId") userId: number
  // ): Promise<Boolean> {
  //   // find the event
  //   const event = await Event.findOne(id);

  //   // find the user
  //   const user = await User.findOne(userId);

  //   // create eventAttendee(eventId, userId)
  //   await EventAttendee.insert({ event, attendee: user });

  //   // add ea to eventConn & userConn\

  //   return true;
  // }
}
