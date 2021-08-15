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
    async createClub(input, { req }) {
        const duplicateName = await Club_1.Club.find({ name: input.name });
        if (duplicateName.length > 0) {
            throw Error(`{"name": "A club already exists with this name"}`);
        }
        const duplicateEmail = await Club_1.Club.find({ email: input.email });
        if (duplicateEmail.length > 0) {
            throw Error(`{"email": "A club already exists with this email"}`);
        }
        const duplicateNumber = await Club_1.Club.find({ phoneNumber: input.phoneNumber });
        if (duplicateNumber.length > 0) {
            throw Error(`{"phoneNumber": "A club already exists with this phone number"}`);
        }
        const club = await Club_1.Club.create(input).save();
        this.addAdmin(club.id, req.session.userId);
        return club;
    }
    async updateClub({ req }, clubId, input) {
        const club = await Club_1.Club.findOne(clubId);
        if (!club) {
            throw Error("Club does not exist");
        }
        const admins = await ClubAdmin_1.ClubAdmin.find({ clubId });
        const adminIds = admins.map((admin) => admin.adminId);
        if (!adminIds.includes(req.session.userId)) {
            throw Error("User is not authorised");
        }
        const duplicateName = await Club_1.Club.find({ name: input.name });
        console.log(duplicateName);
        if (duplicateName.length > 0 &&
            !duplicateName.map((c) => c.name).includes(club.name)) {
            throw Error(`{"name": "A club already exists with this name"}`);
        }
        const duplicateEmail = await Club_1.Club.find({ email: input.email });
        if (duplicateEmail.length > 0 &&
            !duplicateEmail.map((c) => c.email).includes(club.email)) {
            throw Error(`{"email": "A club already exists with this email"}`);
        }
        const duplicateNumber = await Club_1.Club.find({ phoneNumber: input.phoneNumber });
        if (duplicateNumber.length > 0 &&
            !duplicateNumber.map((c) => c.phoneNumber).includes(club.phoneNumber)) {
            throw Error(`{"phoneNumber": "A club already exists with this phone number"}`);
        }
        await Club_1.Club.update(clubId, Object.assign({}, input));
        return Club_1.Club.findOne(clubId);
    }
    async followClub(clubId, followerId) {
        const following = await ClubFollower_1.ClubFollower.find({ clubId, followerId });
        if (following.length > 0) {
            throw Error("User is already following this club");
        }
        const res = await ClubFollower_1.ClubFollower.create({ clubId, followerId }).save();
        return true;
    }
    async unfollowClub(clubId, followerId) {
        const following = await ClubFollower_1.ClubFollower.find({ clubId, followerId });
        if (following.length === 0) {
            throw Error("User is already not following this club");
        }
        const res = await ClubFollower_1.ClubFollower.delete({ clubId, followerId });
        return true;
    }
    async followers(club, { userLoader }) {
        const clubFollowerIds = await typeorm_1.getConnection().query(`
      select "followerId" 
      from "club_follower"
      where "clubId" = ${club.id};
    `);
        console.log(clubFollowerIds);
        return userLoader.loadMany(clubFollowerIds.map((e) => e.followerId));
    }
    async addAdmin(clubId, adminId) {
        const exists = await ClubAdmin_1.ClubAdmin.find({
            clubId: clubId,
            adminId: adminId,
        });
        if (exists.length) {
            throw Error("that person is already an admin");
        }
        const res = await ClubAdmin_1.ClubAdmin.create({
            clubId: clubId,
            adminId: adminId,
        }).save();
        console.log(res);
        return true;
    }
    async clubs() {
        return Club_1.Club.find({});
    }
    async deleteClub(id, { req }) {
        console.log(id);
        const club = await Club_1.Club.findOne(id);
        const admins = await typeorm_1.getConnection().query(`
    select "adminId" 
    from "club_admin"
    where "clubId" = ${id};
  `);
        if (!club) {
            return false;
        }
        console.log(club);
        if (!admins
            .map((user) => user.adminId)
            .includes(req.session.userId)) {
            throw Error("User is not authorised to delete this club");
        }
        this.removeAllAdminsFromClub(id);
        await Club_1.Club.delete({ id });
        return true;
    }
    async removeAllAdminsFromClub(clubId) {
        await ClubAdmin_1.ClubAdmin.delete({ clubId: clubId });
        return true;
    }
    async admins(club, { userLoader }) {
        const clubAdminIds = await typeorm_1.getConnection().query(`
      select "adminId" 
      from "club_admin"
      where "clubId" = ${club.id};
    `);
        console.log(clubAdminIds);
        return userLoader.loadMany(clubAdminIds.map((e) => e.adminId));
    }
};
__decorate([
    type_graphql_1.Mutation(() => Club_1.Club),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClubInput, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "createClub", null);
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
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Club_1.Club, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "followers", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("clubId")),
    __param(1, type_graphql_1.Arg("adminId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "addAdmin", null);
__decorate([
    type_graphql_1.Query(() => [Club_1.Club]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "clubs", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "deleteClub", null);
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Club_1.Club, Object]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "admins", null);
ClubResolver = __decorate([
    type_graphql_1.Resolver(Club_1.Club)
], ClubResolver);
exports.ClubResolver = ClubResolver;
//# sourceMappingURL=club.js.map