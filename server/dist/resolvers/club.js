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
    async createClub(input) {
        return Club_1.Club.create(input).save();
    }
    async clubs() {
        return Club_1.Club.find({});
    }
    async deleteClub(id) {
        console.log(id);
        const club = await Club_1.Club.findOne(id);
        if (!club) {
            return false;
        }
        await Club_1.Club.delete({ id });
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClubInput]),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "createClub", null);
__decorate([
    type_graphql_1.Query(() => [Club_1.Club]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClubResolver.prototype, "clubs", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
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