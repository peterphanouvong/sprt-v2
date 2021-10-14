import {
  Arg,
  Field,
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
import { getConnection } from "typeorm";
import { QuickEvent } from "../entities/QuickEvent";

@InputType()
class QuickEventInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  capacity: number;

  @Field({ nullable: true })
  users: string;
}

@InputType()
class QuickEventUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  beemId: string;

  @Field()
  status: string;

  @Field()
  createdAt: string;
}

@Resolver(QuickEvent)
export class QuickEventResolver {
  /**
   *  Resolvers
   */

  @Subscription(() => QuickEvent, {
    topics: ({ args }) => `QUICK-EVENT-${args.id}`,
  })
  async newQuickEvent(
    @Root() quickEvent: QuickEvent | undefined,
    @Arg("id") id: number
  ): Promise<QuickEvent | undefined> {
    if (quickEvent === undefined) {
      return QuickEvent.findOne(id);
    }
    return quickEvent;
  }

  // Create
  @Mutation(() => QuickEvent)
  async createQuickEvent(
    @Arg("input") input: QuickEventInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<QuickEvent | undefined> {
    const event = await QuickEvent.create({
      ...input,
    }).save();
    await pubSub.publish(`QUICK-EVENT-${event.id}`, event);
    return QuickEvent.findOne(event.id);
  }

  // Read
  @Query(() => QuickEvent, { nullable: true })
  quickEvent(
    @Arg("id", () => Int) id: number
  ): Promise<QuickEvent | undefined> {
    return QuickEvent.findOne(id);
  }

  // Update
  @Mutation(() => QuickEvent, { nullable: true })
  async updateQuickEvent(
    @Arg("id") id: number,
    @Arg("input") input: QuickEventInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<QuickEvent | null> {
    const { raw } = await getConnection()
      .createQueryBuilder()
      .update(QuickEvent)
      .set({ ...input })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    await pubSub.publish(`QUICK-EVENT-${id}`, raw[0]);
    return raw[0];
  }

  // @Mutation(() => Boolean)
  // async initNewQuickEvent(
  //   @Arg("id") id:number;
  // ) {
  //   const event = await QuickEvent.findOne(id);
  // }

  @Mutation(() => QuickEvent)
  async joinQuickEvent(
    @Arg("input") input: QuickEventUserInput,
    @Arg("id") id: number,
    @PubSub() pubSub: PubSubEngine
  ): Promise<QuickEvent | undefined> {
    const event = await QuickEvent.findOne(id);

    let userString = "";
    if (event?.users) {
      let users = JSON.parse(event.users);

      users.forEach((user: any) => {
        if (user.email === input.email) {
          throw Error("An attendee with that email already exists");
        }
      });

      users.push(input);
      userString = JSON.stringify(users);
    }

    const { raw } = await getConnection()
      .createQueryBuilder()
      .update(QuickEvent)
      .set({ users: userString })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    await pubSub.publish(`QUICK-EVENT-${id}`, raw[0]);

    return raw[0];
  }
}
