import {
  Arg,
  Query,
  Mutation,
  Resolver,
  InputType,
  Field,
  Ctx,
  FieldResolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { Club } from "../entities/Club";
import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { ClubAdmin } from "../entities/ClubAdmin";
import { ClubFollower } from "../entities/ClubFollower";
import { ClubRequestedMember } from "../entities/ClubRequestedMember";
import { isAuth } from "../middleware/isAuth";
import { errorDetailToObject } from "../utils/errorDetailToObject";
import { FileUpload, GraphQLUpload, Upload } from "graphql-upload";
import path from "path";
const { Storage } = require("@google-cloud/storage");

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

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../sprt-5111-c956c44c12d4.json"),
  projectId: "sprt-5111",
});
const bucketName = "test-sprt-bucket";

@Resolver(Club)
export class ClubResolver {
  /**
   * Field Resolvers
   */

  @FieldResolver(() => User)
  async followers(@Root() club: Club, @Ctx() { userLoader }: MyContext) {
    const clubFollowerIds = await getConnection().query(`
       select array_agg("followerId")
       from "club_follower"
       where "clubId" = ${club.id};
     `);
    return userLoader.loadMany(clubFollowerIds[0].array_agg ?? []);
  }

  @FieldResolver(() => User)
  async admins(@Root() club: Club, @Ctx() { userLoader }: MyContext) {
    const clubAdminIds = await getConnection().query(`
       select array_agg("adminId")
       from "club_admin"
       where "clubId" = ${club.id};
     `);
    return userLoader.loadMany(clubAdminIds[0].array_agg ?? []);
  }

  @FieldResolver(() => User)
  async requestedMembers(@Root() club: Club, @Ctx() { userLoader }: MyContext) {
    const requestedMemberIds = await getConnection().query(`
       select array_agg("requestedMemberId")
       from "club_requested_member"
       where "clubId" = ${club.id};
     `);
    return userLoader.loadMany(requestedMemberIds[0].array_agg ?? []);
  }

  @FieldResolver(() => User)
  async members(@Root() club: Club, @Ctx() { userLoader }: MyContext) {
    const memberIds = await getConnection().query(`
       select array_agg("memberId")
       from "club_member"
       where "clubId" = ${club.id};
     `);
    return userLoader.loadMany(memberIds[0].array_agg ?? []);
  }

  @FieldResolver(() => Event)
  async events(@Root() club: Club, @Ctx() { eventLoader }: MyContext) {
    const eventIds = await getConnection().query(`
       select array_agg("eventId")
       from "club_event"
       where "clubId" = ${club.id};
     `);
    return eventLoader.loadMany(eventIds[0].array_agg ?? []);
  }

  /**
   * CRUD
   */

  // Create
  @Mutation(() => Club)
  @UseMiddleware(isAuth)
  async createClub(
    @Arg("input") input: ClubInput,
    @Ctx() { req }: MyContext
  ): Promise<Club> {
    let club;
    try {
      const res = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Club)
        .values({
          ...input,
        })
        .returning("*")
        .execute();
      club = res.raw[0];
    } catch (error) {
      if (error.detail.includes("already exists")) {
        const errorObj = errorDetailToObject(error.detail);
        if (errorObj)
          throw Error(
            `{"${errorObj[0]}": "A club with ${errorObj[0]}, ${errorObj[1]} already exists."}`
          );
      }
    }

    if (!club) throw Error("There was an unexpected error creating your club");
    this.addAdmin(club.id, req.session.userId);
    return club;
  }

  // Read
  @Query(() => [Club])
  async clubs(): Promise<Club[]> {
    return Club.find({});
  }

  @Query(() => Club)
  async club(@Arg("clubId") clubId: number): Promise<Club | undefined> {
    return Club.findOne(clubId);
  }

  @Query(() => Club)
  async clubByAdminId(
    @Arg("adminId") adminId: number
  ): Promise<Club | undefined> {
    const clubId = await getConnection().query(`
    select "clubId" 
    from "club_admin"
    where "adminId" = ${adminId};
  `);

    console.log("HEYELEOEHEYUEEI ========", clubId);

    return Club.findOne(clubId[0].clubId);
  }

  // Update
  @Mutation(() => Club, { nullable: true })
  async updateClub(
    @Ctx() { req }: MyContext,
    @Arg("clubId") clubId: number,
    @Arg("input") input: ClubInput
  ): Promise<Club> {
    const admins = await ClubAdmin.find({ clubId });
    if (admins.length === 0) {
      throw Error("That club does not exist");
    }
    const adminIds = admins.map((admin) => admin.adminId);
    if (!adminIds.includes(req.session.userId)) {
      throw Error("User is not authorised");
    }
    let club;
    try {
      const res = await getConnection()
        .createQueryBuilder()
        .update(Club)
        .set({ ...input })
        .where("id = :id", {
          id: clubId,
        })
        .returning("*")
        .execute();

      club = res.raw[0];
    } catch (error) {
      if (error.detail.includes("already exists")) {
        const errorObj = errorDetailToObject(error.detail);
        if (errorObj)
          throw Error(
            `{"${errorObj[0]}": "A club with ${errorObj[0]}, ${errorObj[1]} already exists."}`
          );
      }
    }

    if (!club) throw Error("There was an unexpected error updating your club");

    return club;
  }

  // Delete
  @Mutation(() => Boolean)
  async deleteClub(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const admins = await getConnection().query(`
    select "adminId" 
    from "club_admin"
    where "clubId" = ${id};
  `);
    if (
      !admins
        .map((user: { adminId: any }) => user.adminId)
        .includes(req.session.userId)
    ) {
      throw Error("User is not authorised to delete this club");
    }
    // this.removeAllAdminsFromClub(id);

    await Club.delete({ id });
    return true;
  }

  // Other

  @Mutation(() => Boolean)
  async followClub(
    @Arg("clubId") clubId: number,
    @Arg("followerId") followerId: number
  ): Promise<boolean> {
    try {
      await ClubFollower.insert({
        clubId: clubId,
        followerId: followerId,
      });
    } catch (error) {
      if (error.detail.includes("already exists")) {
        throw Error(`That user is already following this club!`);
      }
    }
    return true;
  }

  @Mutation(() => Boolean)
  async unfollowClub(
    @Arg("clubId") clubId: number,
    @Arg("followerId") followerId: number
  ): Promise<boolean> {
    // no need to handle error here since deleting something that doesn't exist means nothing

    await ClubFollower.delete({
      clubId: clubId,
      followerId: followerId,
    });

    return true;
  }

  @Mutation(() => Boolean)
  async addRequestedMember(
    @Arg("clubId") clubId: number,
    @Arg("requestedMemberId") requestedMemberId: number
  ): Promise<boolean> {
    try {
      await ClubRequestedMember.insert({
        clubId: clubId,
        requestedMemberId: requestedMemberId,
      });
    } catch (error) {
      if (error.detail.includes("already exists")) {
        throw Error(`You have already requested to follow this club`);
      }
    }
    return true;
  }

  @Mutation(() => Boolean)
  async addAdmin(
    @Arg("clubId") clubId: number,
    @Arg("adminId") adminId: number
  ): Promise<boolean> {
    try {
      await ClubAdmin.insert({
        clubId: clubId,
        adminId: adminId,
      });
    } catch (error) {
      if (error.detail.includes("already exists")) {
        throw Error(`That user is already an admin of this club`);
      }
    }
    return true;
  }

  @Mutation(() => Boolean)
  async uploadImage(
    //1
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload
  ) {
    console.log(filename);
  }

  // @Mutation(() => Boolean)
  // async uploadImage(
  //   //1
  //   @Arg("file", () => GraphQLUploadvvv)
  //   { createReadStream, filename }: FileUpload
  // ) {
  //   //2
  //   await new Promise(async (_resolve, reject) =>
  //     createReadStream()
  //       .pipe(
  //         storage.bucket(bucketName).file(filename).createWriteStream({
  //           resumable: false,
  //           gzip: true,
  //         })
  //       )
  //       //3
  //       .on("finish", () =>
  //         storage
  //           .bucket(bucketName)
  //           .file(filename)
  //           .makePublic()
  //           .then((e: { object: any }[]) => {
  //             console.log(e[0].object);
  //             console.log(
  //               `https://storage.googleapis.com/${bucketName}/${e[0].object}`
  //             );
  //           })
  //       )
  //       .on("error", () => reject(false))
  //   );
  // }

  async removeAllAdminsFromClub(clubId: number): Promise<boolean> {
    await ClubAdmin.delete({ clubId: clubId });
    return true;
  }
}
