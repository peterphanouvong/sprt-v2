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
exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Post_1 = require("./Post");
const Event_1 = require("./Event");
const ClubFollower_1 = require("./ClubFollower");
const ClubMember_1 = require("./ClubMember");
const ClubAdmin_1 = require("./ClubAdmin");
const EventAttendee_1 = require("./EventAttendee");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(() => Post_1.Post),
    typeorm_1.OneToMany(() => Post_1.Post, (post) => post.creator),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    type_graphql_1.Field(() => Event_1.Event),
    typeorm_1.OneToMany(() => Event_1.Event, (event) => event.host),
    __metadata("design:type", Array)
], User.prototype, "events", void 0);
__decorate([
    typeorm_1.OneToMany(() => ClubFollower_1.ClubFollower, (cf) => cf.follower),
    __metadata("design:type", Array)
], User.prototype, "following_clubs", void 0);
__decorate([
    typeorm_1.OneToMany(() => ClubMember_1.ClubMember, (cm) => cm.member),
    __metadata("design:type", Array)
], User.prototype, "club_member", void 0);
__decorate([
    typeorm_1.OneToMany(() => ClubAdmin_1.ClubAdmin, (ca) => ca.admin),
    __metadata("design:type", Array)
], User.prototype, "club_admin", void 0);
__decorate([
    typeorm_1.OneToMany(() => EventAttendee_1.EventAttendee, (ca) => ca.attendee),
    __metadata("design:type", Array)
], User.prototype, "eventAttendeeConn", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map