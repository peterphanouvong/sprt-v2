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
import { Club } from "../entities/Club";
import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { ClubAdmin } from "../entities/ClubAdmin";
import { ClubFollower } from "../entities/ClubFollower";
import { ClubRequestedMember } from "../entities/ClubRequestedMember";

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

  @Mutation(() => Club, { nullable: true })
  async updateClub(
    @Ctx() { req }: MyContext,
    @Arg("clubId") clubId: number,
    @Arg("input") input: ClubInput
  ): Promise<Club | null | undefined> {
    const club = await Club.findOne(clubId);
    if (!club) {
      throw Error("Club does not exist");
    }
    const admins = await ClubAdmin.find({ clubId });

    const adminIds = admins.map((admin) => admin.adminId);
    if (!adminIds.includes(req.session.userId)) {
      throw Error("User is not authorised");
    }

    const duplicateName = await Club.find({ name: input.name });
    console.log(duplicateName);
    if (
      duplicateName.length > 0 &&
      !duplicateName.map((c) => c.name).includes(club.name)
    ) {
      throw Error(`{"name": "A club already exists with this name"}`);
    }

    const duplicateEmail = await Club.find({ email: input.email });
    if (
      duplicateEmail.length > 0 &&
      !duplicateEmail.map((c) => c.email).includes(club.email)
    ) {
      throw Error(`{"email": "A club already exists with this email"}`);
    }

    const duplicateNumber = await Club.find({ phoneNumber: input.phoneNumber });
    if (
      duplicateNumber.length > 0 &&
      !duplicateNumber.map((c) => c.phoneNumber).includes(club.phoneNumber)
    ) {
      throw Error(
        `{"phoneNumber": "A club already exists with this phone number"}`
      );
    }

    await Club.update(clubId, { ...input });

    return Club.findOne(clubId);
  }

  @Mutation(() => Boolean)
  async followClub(
    @Arg("clubId") clubId: number,
    @Arg("followerId") followerId: number
  ): Promise<boolean> {
    const following = await ClubFollower.find({ clubId, followerId });
    if (following.length > 0) {
      throw Error("User is already following this club");
    }

    const res = await ClubFollower.create({ clubId, followerId }).save();
    return true;
  }

  @Mutation(() => Boolean)
  async unfollowClub(
    @Arg("clubId") clubId: number,
    @Arg("followerId") followerId: number
  ): Promise<boolean> {
    const following = await ClubFollower.find({ clubId, followerId });
    if (following.length === 0) {
      throw Error("User is already not following this club");
    }

    const res = await ClubFollower.delete({ clubId, followerId });
    return true;
  }

  @FieldResolver(() => User)
  async followers(@Root() club: Club, @Ctx() { userLoader }: MyContext) {
    // get a list of the attendeeIds
    const clubFollowerIds = await getConnection().query(`
      select "followerId" 
      from "club_follower"
      where "clubId" = ${club.id};
    `);

    // clubAdminIds = [ { clubId: 1 } ]
    console.log(clubFollowerIds);
    return userLoader.loadMany(
      clubFollowerIds.map((e: { followerId: number }) => e.followerId)
    );
  }

  @Mutation(() => Boolean)
  async addRequestedMember(
    @Arg("clubId") clubId: number,
    @Arg("requestedMemberId") requestedMemberId: number
  ): Promise<boolean> {
    const exists = await ClubRequestedMember.find({
      clubId: clubId,
      requestedMemberId: requestedMemberId,
    });

    if (exists.length) {
      throw Error("you have already requested to be a member of this club");
    }

    const res = await ClubRequestedMember.create({
      clubId: clubId,
      requestedMemberId: requestedMemberId,
    }).save();
    return true;
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

  @FieldResolver(() => User)
  async requestedMembers(@Root() club: Club, @Ctx() { userLoader }: MyContext) {
    // get a list of the requestedMemberIds
    const requestedMemberIds = await getConnection().query(`
      select array_agg("requestedMemberId")
      from "club_requested_member"
      where "clubId" = ${club.id};
    `);
    // clubAdminIds = [ { clubId: 1 } ]
    // console.log(clubAdminIds);
    return userLoader.loadMany(requestedMemberIds[0].array_agg ?? []);
  }
}
