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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Club = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ClubAdmin_1 = require("./ClubAdmin");
const ClubEvent_1 = require("./ClubEvent");
const ClubFollower_1 = require("./ClubFollower");
const ClubMember_1 = require("./ClubMember");
const ClubRequestedMember_1 = require("./ClubRequestedMember");
const User_1 = require("./User");
const Event_1 = require("./Event");
let Club = class Club extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Club.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Club.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Club.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Club.prototype, "phoneNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Club.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], Club.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Club.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    __metadata("design:type", Array)
], Club.prototype, "followers", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    __metadata("design:type", Array)
], Club.prototype, "requestedMembers", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    __metadata("design:type", Array)
], Club.prototype, "admins", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    __metadata("design:type", Array)
], Club.prototype, "members", void 0);
__decorate([
    type_graphql_1.Field(() => [Event_1.Event], { nullable: true }),
    typeorm_1.OneToMany(() => Event_1.Event, (event) => event.club),
    __metadata("design:type", Array)
], Club.prototype, "events", void 0);
__decorate([
    typeorm_1.OneToMany(() => ClubEvent_1.ClubEvent, (ce) => ce.club),
    __metadata("design:type", Array)
], Club.prototype, "eventConnection", void 0);
__decorate([
    typeorm_1.OneToMany(() => ClubFollower_1.ClubFollower, (cf) => cf.club),
    __metadata("design:type", Array)
], Club.prototype, "followerConnection", void 0);
__decorate([
    typeorm_1.OneToMany(() => ClubRequestedMember_1.ClubRequestedMember, (cm) => cm.club),
    __metadata("design:type", Array)
], Club.prototype, "requestedMemberConnection", void 0);
__decorate([
    typeorm_1.OneToMany(() => ClubAdmin_1.ClubAdmin, (ca) => ca.club),
    __metadata("design:type", Array)
], Club.prototype, "adminConnection", void 0);
__decorate([
    typeorm_1.OneToMany(() => ClubMember_1.ClubMember, (cm) => cm.club),
    __metadata("design:type", Array)
], Club.prototype, "memberConnection", void 0);
Club = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Club);
exports.Club = Club;
//# sourceMappingURL=Club.js.map