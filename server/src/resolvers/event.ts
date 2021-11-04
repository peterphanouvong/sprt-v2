import { EventAttendee } from "../entities/EventAttendee";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
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
    @Arg("input") input: EventInput
  ): Promise<Event | undefined> {
    const event = await Event.create(input).save();
    console.log(event);
    return event;
  }

  // read.
  @Query(() => Event)
  async event(@Arg("id") id: string): Promise<Event | undefined> {
    return Event.findOne(id);
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
    @Arg("input") input: EventInput
  ): Promise<Event | undefined> {
    const event = await Event.findOne(id);
    if (!event) {
      return undefined;
    }
    await Event.merge(event, input).save();
    return event;
  }

  @Mutation(() => Boolean)
  async addNewAttendee(
    @Arg("id") id: number,
    @Arg("input") input: AttendeeInput
  ): Promise<boolean> {
    const createAttendee = new AttendeeResolver().createAttendee;
    const res = await createAttendee(input);

    await EventAttendee.insert({
      eventId: id,
      attendeeId: res!.id,
    });

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
    const res = event;
    console.log("LOOK HERE", res);

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
    return attendeeLoader.loadMany(
      eventAttendeeIds.map((e: { attendeeId: number }) => e.attendeeId)
    );
  }
}
