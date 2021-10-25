import path from "path/posix";
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
import { FileUpload, GraphQLUpload } from "graphql-upload";
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFileName: path.join(__dirname, "../../sprt-quick-event-08b7af871940.json"),
  projectId: "sprt-quick-event",
});

const bannerImagesBucket = storage.bucket("qe_banner_images");
// console.log(bannerImagesBucket);

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

  @Field(() => GraphQLUpload, { nullable: true })
  bannerImage: FileUpload;

  @Field(() => GraphQLUpload, { nullable: true })
  logoImage: FileUpload;
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

  @Mutation(() => Boolean)
  async uploadLogoImage(
    //1
    @Arg("file", () => GraphQLUpload)
    object: FileUpload,
    @Arg("eventId") eventId: Number
  ): Promise<boolean> {
    console.log("testing filename: ", object);
    const { createReadStream } = await object;
    const newFilename = `logo/qe-${eventId}-logo.jpg`;
    await new Promise((res) =>
      createReadStream()
        .pipe(
          storage
            .bucket("qe_banner_images")
            .file(newFilename)
            .createWriteStream({
              resumable: false,
              gzip: true,
            })
        )
        .on("finish", res)
    );

    return true;
  }

  // Create
  @Mutation(() => QuickEvent)
  async createQuickEvent(
    @Arg("input") input: QuickEventInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<QuickEvent | undefined> {
    console.log(input);
    const event = await QuickEvent.create({
      ...input,
    }).save();
    await pubSub.publish(`QUICK-EVENT-${event.id}`, event);
    if (input.logoImage) {
      await this.uploadLogoImage(input.logoImage, event.id);
    }
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
          throw Error("An attendee with that phone number already exists");
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
