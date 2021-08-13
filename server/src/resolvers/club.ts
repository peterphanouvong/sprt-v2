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
import { Club } from "../entities/Club";
import { User } from "../entities/User";
import { getConnection } from "typeorm";

@InputType()
class ClubInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;
}

@Resolver(Club)
export class ClubResolver {
  @Mutation(() => Club)
  // @UseMiddleware(isAuth)
  async createClub(@Arg("input") input: ClubInput): Promise<Club> {
    return Club.create(input).save();
  }

  @Query(() => [Club])
  async clubs(): Promise<Club[]> {
    return Club.find({});
  }

  @Mutation(() => Boolean)
  async deleteClub(@Arg("id") id: number): Promise<boolean> {
    // const post = await Club.findOne(id);
    // console.log(post);
    console.log(id);
    const club = await Club.findOne(id);
    if (!club) {
      return false;
    }

    // TODO: check if authorized with organisers/owners

    await Club.delete({ id });
    return true;
  }

  @FieldResolver(() => User)
  async admins(@Root() club: Club, @Ctx() { userLoader }: MyContext) {
    // get a list of the attendeeIds
    const clubAdminIds = await getConnection().query(`
      select "adminId" 
      from "club_admin"
      where "clubId" = ${club.id};
    `);

    // clubAdminIds = [ { clubId: 1 } ]
    console.log(clubAdminIds);
    return userLoader.loadMany(
      clubAdminIds.map((e: { adminId: number }) => e.adminId)
    );
  }
}
