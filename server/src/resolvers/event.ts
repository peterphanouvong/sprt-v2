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
import { EventAttendee } from "../entities/EventAttendee";
import { getConnection } from "typeorm";
import { Club } from "../entities/Club";
import { ClubEvent } from "../entities/ClubEvent";
import { ClubAdmin } from "src/entities/ClubAdmin";

@InputType()
class EventInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  startTime: string;

  @Field({ nullable: true })
  endTime: string;

  @Field({ nullable: true })
  capacity: number;

  @Field({ defaultValue: 1 })
  creatorTypeId: number;

  @Field({ defaultValue: 1 })
  publicityTypeId: number;

  @Field(() => Int, { nullable: true })
  clubId: number;
}

@Resolver(Event)
export class EventResolver {
  /**
   * Field Resolvers
   */

  @FieldResolver(() => [User])
  async attendees(@Root() event: Event, @Ctx() { userLoader }: MyContext) {
    const eventAttendeeIds = await getConnection().query(`
      select "attendeeId" 
      from "event_attendee"
      where "eventId" = ${event.id};
    `);
    return userLoader.loadMany(
      eventAttendeeIds.map((e: { attendeeId: number }) => e.attendeeId)
    );
  }

  @FieldResolver(() => User)
  host(@Root() event: Event, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(event.hostId);
  }

  @FieldResolver(() => Club, { nullable: true })
  async club(
    @Root() event: Event,
    @Ctx() { clubLoader }: MyContext
  ): Promise<Club | null> {
    if (event.clubId !== null) {
      return clubLoader.load(event.clubId);
    }
    return null;
  }

  /**
   * CRUD
   */

  // Create
  @Mutation(() => Event)
  @UseMiddleware(isAuth)
  async createEvent(
    @Ctx() { req }: MyContext,
    @Arg("input") input: EventInput
  ): Promise<Event | undefined> {
    const event = await Event.create({
      ...input,
      hostId: req.session.userId,
    }).save();
    if (input.clubId) {
      this.addClubEvent(input.clubId, event.id);
    }
    return Event.findOne(event.id);
  }

  // Read
  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return Event.find();
  }

  @Query(() => Event, { nullable: true })
  event(@Arg("id", () => Int) id: number): Promise<Event | undefined> {
    return Event.findOne(id);
  }

  // Update
  @Mutation(() => Event, { nullable: true })
  async updateEvent(
    @Ctx() { req }: MyContext,
    @Arg("id") id: number,
    @Arg("input") input: EventInput
  ): Promise<Event | null> {
    const { raw } = await getConnection()
      .createQueryBuilder()
      .update(Event)
      .set({ ...input })
      .where('id = :id and "hostId" = :hostId', {
        id,
        hostId: req.session.userId,
      })
      .returning("*")
      .execute();
    return raw[0];
  }

  @Mutation(() => Boolean)
  async addClubEvent(
    @Arg("clubId") clubId: number,
    @Arg("eventId") eventId: number
  ): Promise<boolean> {
    try {
      await ClubEvent.insert({
        clubId: clubId,
        eventId: eventId,
      });
    } catch (error) {
      if (error.detail.includes("already exists")) {
        throw Error(`That club already has an event with the given eventId`);
      }
    }
    return true;
  }

  // Delete
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
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

  /**
   * Other
   */

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async addAttendee(
    @Ctx() { req }: MyContext,
    @Arg("eventId", () => Int) eventId: number
  ): Promise<User | undefined> {
    try {
      await EventAttendee.insert({
        eventId: eventId,
        attendeeId: req.session.userId,
      });
    } catch (error) {
      if (error.detail.includes("already exists")) {
        throw Error(`That user is already attending the event!`);
      }
    }
    return await User.findOne(req.session.userId);
  }

  @Mutation(() => Boolean)
  async removeAttendee(
    @Arg("eventId", () => Int) eventId: number,
    @Arg("attendeeId", () => Int) attendeeId: number
  ): Promise<boolean> {
    await EventAttendee.delete({
      eventId: eventId,
      attendeeId: attendeeId,
    });
    return true;
  }

  @Query(() => [Event])
  @UseMiddleware(isAuth)
  async feed(@Arg("id") id: number, @Ctx() { eventLoader }: MyContext) {
    const eventIds = await getConnection().query(`
    select array_agg(e.id)
    from "event" e
    inner join "club_follower" cf on cf."clubId" = e."clubId"
    where cf."followerId" = ${id};
  `);

    return eventLoader.loadMany(eventIds[0].array_agg ?? []);

    // aim: show me events posted by the clubs that i follow
  }
}
