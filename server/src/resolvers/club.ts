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
import { ClubAdmin } from "../entities/ClubAdmin";

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
  async createClub(
    @Arg("input") input: ClubInput,
    @Ctx() { req }: MyContext
  ): Promise<Club> {
    const duplicateName = await Club.find({ name: input.name });
    if (duplicateName.length > 0) {
      throw Error(`{"name": "A club already exists with this name"}`);
    }

    const duplicateEmail = await Club.find({ email: input.email });
    if (duplicateEmail.length > 0) {
      throw Error(`{"email": "A club already exists with this email"}`);
    }

    const duplicateNumber = await Club.find({ phoneNumber: input.phoneNumber });
    if (duplicateNumber.length > 0) {
      throw Error(
        `{"phoneNumber": "A club already exists with this phone number"}`
      );
    }
    const club = await Club.create(input).save();

    this.addAdmin(club.id, req.session.userId);

    return club;
  }

  @Mutation(() => Boolean)
  async addAdmin(
    @Arg("clubId") clubId: number,
    @Arg("adminId") adminId: number
  ): Promise<boolean> {
    const exists = await ClubAdmin.find({
      clubId: clubId,
      adminId: adminId,
    });

    if (exists.length) {
      throw Error("that person is already an admin");
    }

    const res = await ClubAdmin.create({
      clubId: clubId,
      adminId: adminId,
    }).save();
    console.log(res);
    return true;
  }

  @Query(() => [Club])
  async clubs(): Promise<Club[]> {
    return Club.find({});
  }

  @Mutation(() => Boolean)
  async deleteClub(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    // const post = await Club.findOne(id);
    // console.log(post);
    console.log(id);
    const club = await Club.findOne(id);
    const admins = await getConnection().query(`
    select "adminId" 
    from "club_admin"
    where "clubId" = ${id};
  `);
    // console.log(admins);
    if (!club) {
      return false;
    }
    console.log(club);
    if (
      !admins
        .map((user: { adminId: any }) => user.adminId)
        .includes(req.session.userId)
    ) {
      throw Error("User is not authorised to delete this club");
    }

    // Delete admins from club
    this.removeAllAdminsFromClub(id);

    // TODO: check if authorized with organisers/owners

    await Club.delete({ id });
    return true;
  }

  async removeAllAdminsFromClub(clubId: number): Promise<boolean> {
    await ClubAdmin.delete({ clubId: clubId });
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
