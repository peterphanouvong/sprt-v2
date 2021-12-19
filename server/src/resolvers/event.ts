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

    return event;
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
  async liveEvents(@Ctx() { req }: MyContext): Promise<Event[] | undefined> {
    return Event.find({
      where: { isCompleted: false, ownerId: req.session.userId },
    });
  }

  @Query(() => [Event])
  async pastEvents(@Ctx() { req }: MyContext): Promise<Event[] | undefined> {
    return Event.find({
      where: { isCompleted: true, ownerId: req.session.userId },
    });
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
    @Arg("input") input: AttendeeInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    console.log("MY INPUT: ", input);
    const createAttendee = new AttendeeResolver().createAttendee;
    const res = await createAttendee(input);

    const num = await getConnection().query(`
      select max(position) 
      from "event_attendee" ea 
      where ea."isConfirmed" = false and 
      ea."eventId" = ${id};
    `);

    console.log("NUM IS: ", num);

    await EventAttendee.insert({
      eventId: id,
      attendeeId: res!.id,
      isPayingCash: input.isPayingCash,
      position: num[0].max !== null ? num[0].max + 1 : 0,
    });

    pubSub.publish(
      `EVENT-${id}`,
      EventAttendee.find({ where: { eventId: id }, relations: ["attendee"] })
    );

    return true;
  }

  @Mutation(() => Boolean)
  async removeAttendee(
    @Arg("attendeeId") attendeeId: number,
    @Arg("eventId") eventId: number,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    await EventAttendee.delete({ attendeeId, eventId });
    pubSub.publish(
      `EVENT-${eventId}`,
      EventAttendee.find({
        where: { eventId: eventId },
        relations: ["attendee"],
      })
    );
    return true;
  }

  // Might have to add logic to position when inserting
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

  @Mutation(() => Boolean)
  async confirmAttendee(
    @Arg("eventId") eventId: number,
    @Arg("attendeeId") attendeeId: number,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    console.log(eventId);
    console.log(attendeeId);

    // Adjust position after confirming
    const position = await getConnection().query(`
      select "position" 
      from "event_attendee" ea 
      where ea."attendeeId" = ${attendeeId}
      and ea."eventId" = ${eventId};
    `);
    const pivot = position[0].position;
    console.log("asd position is: ", pivot);

    const attendeesAfterPivot = await getConnection().query(`
      select ea."attendeeId", ea."position" 
      from "event_attendee" ea 
      where ea."position" > ${pivot}; 
    `);

    // update position of other attendees after confirming
    attendeesAfterPivot.forEach(
      (a: { attendeeId: number; position: number }) => {
        EventAttendee.update(
          { eventId, attendeeId: a.attendeeId },
          { position: a.position - 1 }
        );
      }
    );

    await EventAttendee.update(
      { eventId, attendeeId },
      { isConfirmed: true, position: 0 }
    );

    pubSub.publish(
      `EVENT-${eventId}`,
      EventAttendee.find({
        where: { eventId: eventId },
        relations: ["attendee"],
      })
    );
    return true;
  }

  @Mutation(() => Boolean)
  async unconfirmAttendee(
    @Arg("eventId") eventId: number,
    @Arg("attendeeId") attendeeId: number,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    console.log(eventId);
    console.log(attendeeId);
    const num = await getConnection().query(`
      select max(position) 
      from "event_attendee" ea 
      where ea."isConfirmed" = false and 
      ea."eventId" = ${eventId};
    `);
    await EventAttendee.update(
      { eventId, attendeeId },
      { isConfirmed: false, position: num[0].max !== null ? num[0].max + 1 : 0 }
    );
    pubSub.publish(
      `EVENT-${eventId}`,
      EventAttendee.find({
        where: { eventId: eventId },
        relations: ["attendee"],
      })
    );
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

  @Mutation(() => Boolean)
  async shiftAttendeePosition(
    @Arg("src") src: number,
    @Arg("dest") dest: number,
    @Arg("eventId") eventId: number,
    @Arg("attendeeId") attendeeId: number,
    @PubSub() pubSub: PubSubEngine
  ) {
    // Moving attendee towards top of queue
    if (src > dest) {
      for (let pos: number = src - 1; pos >= dest; pos--) {
        await EventAttendee.update(
          { eventId, position: pos },
          { position: pos + 1 }
        );
      }
    } else {
      // Moving attendee towards bottom of queue
      for (let pos: number = src + 1; pos <= dest; pos++) {
        console.log("pos is: ", pos);
        await EventAttendee.update(
          { eventId, position: pos },
          { position: pos - 1 }
        );
      }
    }
    await EventAttendee.update({ eventId, isConfirmed: true }, { position: 0 });
    await EventAttendee.update({ eventId, attendeeId }, { position: dest });
    pubSub.publish(
      `EVENT-${eventId}`,
      EventAttendee.find({
        where: { eventId: eventId },
        relations: ["attendee"],
      })
    );

    return true;
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
  async attendeeConnection(@Root() event: Event) {
    const attendeeConnections = await getConnection().query(`
      select "attendeeId", "isConfirmed"
      from "event_attendee"
      where "eventId" = ${event.id};
    `);

    const eventAttendeeIds = attendeeConnections.map(
      (e: { attendeeId: number; isConfirmed: boolean }) => {
        return { eventId: event.id, attendeeId: e.attendeeId };
      }
    );
    return await EventAttendee.findByIds(eventAttendeeIds);
  }

  @Subscription(() => [EventAttendee], {
    topics: ({ args }) => `EVENT-${args.id}`,
  })
  async eventAttendees(
    @Root() eventAttendees: [EventAttendee],
    @Arg("id") id: number
  ) {
    console.log(id);
    return eventAttendees;
  }

  @Mutation(() => [EventAttendee])
  async eventAttendeesTrigger(
    @Arg("id") id: number,
    @PubSub() pubSub: PubSubEngine
  ) {
    pubSub.publish(
      `EVENT-${id}`,
      EventAttendee.find({ where: { eventId: id }, relations: ["attendee"] })
    );
    return EventAttendee.find({
      where: { eventId: id },
      relations: ["attendee"],
    });
  }
}
