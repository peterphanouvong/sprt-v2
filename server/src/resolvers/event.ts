import { EventAttendee } from "../entities/EventAttendee";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Event } from "../entities/Event";
import { AttendeeInput, AttendeeResolver } from "./attendee";
import { Attendee } from "../entities/Attendee";
import { getConnection } from "typeorm";
import { MyContext } from "../types";

@InputType()
class EventInput {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => Boolean, { nullable: true })
  isCompleted: boolean;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  date: string;

  @Field(() => String, { nullable: true })
  startTime: string;

  @Field(() => String, { nullable: true })
  endTime: string;

  @Field(() => Number, { nullable: true })
  capacity: number;

  @Field(() => String, { nullable: true })
  clubBeemId: string;

  @Field(() => String, { nullable: true })
  venue: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => String, { nullable: true })
  youtubeLink: string;
}

@Resolver(Event)
export class EventResolver {
  /**
   * CRUD
   */

  // create.
  @Mutation(() => Event)
  async createEvent(
    @Arg("input") input: EventInput,
    @Ctx() { req }: MyContext
  ): Promise<Event | undefined> {
    const { id } = await Event.create({
      ...input,
      ownerId: req.session.userId,
    }).save();

    const event = await Event.findOne(id, { relations: ["owner"] });
    console.log("event", event);

    return Event.findOne(id, { relations: ["owner"] });
  }

  @Query(() => Event)
  async event(@Arg("id") id: string): Promise<Event | undefined> {
    return Event.findOne(id, { relations: ["owner"] });
  }

  @Query(() => [Event])
  async events(): Promise<Event[] | undefined> {
    return Event.find();
  }

  @Query(() => [Event])
  async liveEvents(): Promise<Event[] | undefined> {
    return Event.find({ where: { isCompleted: false } });
  }

  @Query(() => [Event])
  async pastEvents(): Promise<Event[] | undefined> {
    return Event.find({ where: { isCompleted: true } });
  }

  // update.
  @Mutation(() => Event)
  async updateEvent(
    @Arg("id") id: string,
    @Arg("input") input: EventInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Event | undefined> {
    const event = await Event.findOne(id);
    if (!event) {
      return undefined;
    }
    await Event.merge(event, input).save();
    await pubSub.publish(`EVENT-${id}`, event);
    return event;
  }

  @Mutation(() => Boolean)
  async addNewAttendee(
    @Arg("id") id: number,
    @Arg("input") input: AttendeeInput,
    @Ctx() { attendeeLoader }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    const createAttendee = new AttendeeResolver().createAttendee;
    const res = await createAttendee(input);

    await EventAttendee.insert({
      eventId: id,
      attendeeId: res!.id,
    });

    const eventAttendeeIds = await getConnection().query(`
      select "attendeeId" 
      from "event_attendee"
      where "eventId" = ${id};
    `);

    const attendees = attendeeLoader.loadMany(
      eventAttendeeIds.map((e: { attendeeId: number }) => e.attendeeId)
    );

    await pubSub.publish(`EVENT-${id}`, attendees);
    return true;
  }

  @Mutation(() => Boolean)
  async addExistingAttendee(
    @Arg("id") id: number,
    @Arg("attendeeId") attendeeId: number
  ): Promise<boolean> {
    await EventAttendee.insert({
      eventId: id,
      attendeeId: attendeeId,
    });

    return true;
  }

  @Mutation(() => Event)
  async markEventAsComplete(@Arg("id") id: number): Promise<Event | undefined> {
    const event = await Event.findOne(id);
    if (!event) {
      return undefined;
    }
    await Event.merge(event, { isCompleted: true }).save();
    return event;
  }

  @Mutation(() => Event)
  async markEventAsLive(@Arg("id") id: number): Promise<Event | undefined> {
    const event = await Event.findOne(id);
    if (!event) {
      return undefined;
    }
    await Event.merge(event, { isCompleted: false }).save();
    return event;
  }

  // delete.
  @Mutation(() => Boolean)
  async deleteEvent(@Arg("id") id: string): Promise<boolean> {
    await Event.delete(id);
    return true;
  }

  /**
   * field resolvers.
   */

  @FieldResolver(() => Int)
  async numConfirmed(@Root() event: Event): Promise<number> {
    const test = await getConnection().query(`
      select count(*)
      from "attendee" a
      where a.id = any(    
        select "attendeeId"
        from "event_attendee" ea
        where ea."eventId" = ${event.id}
        and ea."isConfirmed" = true
      );
    `);

    return parseInt(test[0].count);
  }

  @FieldResolver(() => Int)
  async numWaitlist(@Root() event: Event): Promise<number> {
    const test = await getConnection().query(`
      select count(*)
      from "attendee" a
      where a.id = any(    
        select "attendeeId"
        from "event_attendee" ea
        where ea."eventId" = ${event.id}
        and ea."isConfirmed" = false
      );
    `);

    return parseInt(test[0].count);
  }

  @FieldResolver(() => [Attendee])
  async attendees(@Root() event: Event, @Ctx() { attendeeLoader }: MyContext) {
    const eventAttendeeIds = await getConnection().query(`
      select "attendeeId" 
      from "event_attendee"
      where "eventId" = ${event.id};
    `);
    console.log("attendeeLoader");
    console.log(attendeeLoader);
    return attendeeLoader.loadMany(
      eventAttendeeIds.map((e: { attendeeId: number }) => e.attendeeId)
    );
  }

  @FieldResolver(() => [EventAttendee])
  async attendeeConnection(
    @Root() event: Event,
    @Ctx() { eventAttendeeLoader }: MyContext
  ) {
    // console.log(event);
    const attendeeConnections = await getConnection().query(`
      select "attendeeId", "isConfirmed"
      from "event_attendee"
      where "eventId" = ${event.id};
    `);
    console.log("Asdsad");
    console.log(eventAttendeeLoader);
    console.log(attendeeConnections);
    return eventAttendeeLoader.loadMany(
      attendeeConnections.map((e: { attendeeId: number }) => e.attendeeId)
    );
  }

  @Subscription(() => [Attendee], {
    topics: ({ args }) => `EVENT-${args.id}`,
  })
  async eventAttendees(
    @Root() attendees: [Attendee],
    @Arg("id") id: number,
    @Ctx() { attendeeLoader }: MyContext
  ) {
    console.log("ATTENDEE SUBSCRIPTION");
    if (attendees === undefined) {
      const eventAttendeeIds = await getConnection().query(`
      select "attendeeId" 
      from "event_attendee"
      where "eventId" = ${id};
    `);

      return attendeeLoader.loadMany(
        eventAttendeeIds.map((e: { attendeeId: number }) => e.attendeeId)
      );
    }

    return attendees;
  }
}
