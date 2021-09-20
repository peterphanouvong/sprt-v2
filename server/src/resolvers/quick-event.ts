import { QuickEvent } from "../entities/QuickEvent";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";

@InputType()
class QuickEventInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  capacity: number;
}

@Resolver(QuickEvent)
export class QuickEventResolver {
  // Create
  @Mutation(() => QuickEvent)
  async createQuickEvent(
    @Arg("input") input: QuickEventInput
  ): Promise<QuickEvent | undefined> {
    const event = await QuickEvent.create({
      ...input,
    }).save();

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
    @Arg("input") input: QuickEventInput
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
    return raw[0];
  }
}
