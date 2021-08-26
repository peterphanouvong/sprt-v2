"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Club_1 = require("../entities/Club");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const ClubAdmin_1 = require("../entities/ClubAdmin");
const ClubFollower_1 = require("../entities/ClubFollower");
const ClubRequestedMember_1 = require("../entities/ClubRequestedMember");
const isAuth_1 = require("../middleware/isAuth");
const errorDetailToObject_1 = require("../utils/errorDetailToObject");
let ClubInput = class ClubInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClubInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClubInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClubInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClubInput.prototype, "phoneNumber", void 0);
ClubInput = __decorate([
    type_graphql_1.InputType()
], ClubInput);
let ClubResolver = class ClubResolver {
    async followers(club, { userLoader }) {
        var _a;
        const clubFollowerIds = await typeorm_1.getConnection().query(`
       select array_agg("followerId")
       from "club_follower"
       where "clubId" = ${club.id};
     `);
        return userLoader.loadMany((_a = clubFollowerIds[0].array_agg) !== null && _a !== void 0 ? _a : []);
    }
    async admins(club, { userLoader }) {
        var _a;
        const clubAdminIds = await typeorm_1.getConnection().query(`
       select array_agg("adminId")
       from "club_admin"
       where "clubId" = ${club.id};
     `);
        return userLoader.loadMany((_a = clubAdminIds[0].array_agg) !== null && _a !== void 0 ? _a : []);
    }
    async requestedMembers(club, { userLoader }) {
        var _a;
        const requestedMemberIds = await typeorm_1.getConnection().query(`
       select array_agg("requestedMemberId")
       from "club_requested_member"
       where "clubId" = ${club.id};
     `);
        return userLoader.loadMany((_a = requestedMemberIds[0].array_agg) !== null && _a !== void 0 ? _a : []);
    }
    async members(club, { userLoader }) {
        var _a;
        const memberIds = await typeorm_1.getConnection().query(`
       select array_agg("memberId")
       from "club_member"
       where "clubId" = ${club.id};
     `);
        return userLoader.loadMany((_a = memberIds[0].array_agg) !== null && _a !== void 0 ? _a : []);
    }
    async events(club, { eventLoader }) {
        var _a;
        const eventIds = await typeorm_1.getConnection().query(`
       select array_agg("eventId")
       from "club_event"
       where "clubId" = ${club.id};
     `);
        return eventLoader.loadMany((_a = eventIds[0].array_agg) !== null && _a !== void 0 ? _a : []);
    }
    async createClub(input, { req }) {
        let club;
        try {
            const res = await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(Club_1.Club)
                .values(Object.assign({}, input))
                .returning("*")
                .execute();
            club = res.raw[0];
        }
        catch (error) {
            if (error.detail.includes("already exists")) {
                const errorObj = errorDetailToObject_1.errorDetailToObject(error.detail);
                if (errorObj)
                    throw Error(`{"${errorObj[0]}": "A club with ${errorObj[0]}, ${errorObj[1]} already exists."}`);
            }
        }
        if (!club)
            throw Error("There was an unexpected error creating your club");
        this.addAdmin(club.id, req.session.userId);
        return club;
    }
    async clubs() {
        return Club_1.Club.find({});
    }
    async club(clubId) {
        return Club_1.Club.findOne(clubId);
    }
    async clubByAdminId(adminId) {
        const clubId = await typeorm_1.getConnection().query(`
    select "clubId" 
    from "club_admin"
    where "clubId" = ${adminId};
  `);
        console.log(clubId);
        return Club_1.Club.findOne(clubId[0].clubId);
    }
    async updateClub({ req }, clubId, input) {
        const admins = await ClubAdmin_1.ClubAdmin.find({ clubId });
        if (admins.length === 0) {
            throw Error("That club does not exist");
        }
        const adminIds = admins.map((admin) => admin.adminId);
        if (!adminIds.includes(req.session.userId)) {
            throw Error("User is not authorised");
        }
        let club;
        try {
            const res = await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(Club_1.Club)
                .set(Object.assign({}, input))
                .where("id = :id", {
                id: clubId,
            })
                .returning("*")
                .execute();
            club = res.raw[0];
        }
        catch (error) {
            if (error.detail.includes("already exists")) {
                const errorObj = errorDetailToObject_1.errorDetailToObject(error.detail);
                if (errorObj)
                    throw Error(`{"${errorObj[0]}": "A club with ${errorObj[0]}, ${errorObj[1]} already exists."}`);
            }
        }
        if (!club)
            throw Error("There was an unexpected error updating your club");
        return club;
    }
    async deleteClub(id, { req }) {
        const admins = await typeorm_1.getConnection().query(`
    select "adminId" 
    from "club_admin"
    where "clubId" = ${id};
  `);
        if (!admins
            .map((user) => user.adminId)
            .includes(req.session.userId)) {
            throw Error("User is not authorised to delete this club");
        }
        await Club_1.Club.delete({ id });
        return true;
    }
    async followClub(clubId, followerId) {
        try {
            await ClubFollower_1.ClubFollower.insert({
                clubId: clubId,
                followerId: followerId,
            });
        }
        catch (error) {
            if (error.detail.includes("already exists")) {
                throw Error(`That user is already following this club!`);
            }
        }
        return true;
    }
    async unfollowClub(clubId, followerId) {
        await ClubFollower_1.ClubFollower.delete({
            clubId: clubId,
            followerId: followerId,
        });
        return true;
    }
    async addRequestedMember(clubId, requestedMemberId) {
        try {
            await ClubRequestedMember_1.ClubRequestedMember.insert({
                clubId: clubId,
                requestedMemberId: requestedMemberId,
            });
        }
        catch (error) {
            if (error.detail.includes("already exists")) {
                throw Error(`You have already requested to follow this club`);
            }
        }
        return true;
    }
    async addAdmin(clubId, adminId) {
        try {
            await ClubAdmin_1.ClubAdmin.insert({
                clubId: clubId,
                adminId: adminId,
            });
        }
        catch (error) {
            if (error.detail.includes("already exists")) {
                throw Error(`That user is already an admin of this club`);
            }
        }
        return true;
    }
    async removeAllAdminsFromClub(clubId) {
        await ClubAdmin_1.ClubAdmin.delete({ clubId: clubId });
        return true;
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Club_1.Club, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "followers", null);
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Club_1.Club, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "admins", null);
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Club_1.Club, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "requestedMembers", null);
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Club_1.Club, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "members", null);
__decorate([
    type_graphql_1.FieldResolver(() => Event),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Club_1.Club, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "events", null);
__decorate([
    type_graphql_1.Mutation(() => Club_1.Club),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClubInput, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "createClub", null);
__decorate([
    type_graphql_1.Query(() => [Club_1.Club]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "clubs", null);
__decorate([
    type_graphql_1.Query(() => Club_1.Club),
    __param(0, type_graphql_1.Arg("clubId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "club", null);
__decorate([
    type_graphql_1.Query(() => Club_1.Club),
    __param(0, type_graphql_1.Arg("adminId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "clubByAdminId", null);
__decorate([
    type_graphql_1.Mutation(() => Club_1.Club, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("clubId")),
    __param(2, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, ClubInput]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "updateClub", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "deleteClub", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("clubId")),
    __param(1, type_graphql_1.Arg("followerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "followClub", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("clubId")),
    __param(1, type_graphql_1.Arg("followerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "unfollowClub", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("clubId")),
    __param(1, type_graphql_1.Arg("requestedMemberId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "addRequestedMember", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("clubId")),
    __param(1, type_graphql_1.Arg("adminId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "addAdmin", null);
ClubResolver = __decorate([
    type_graphql_1.Resolver(Club_1.Club)
], ClubResolver);
exports.ClubResolver = ClubResolver;
//# sourceMappingURL=club.js.map