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
exports.Event = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Attendee_1 = require("./Attendee");
const EventAttendee_1 = require("./EventAttendee");
const User_1 = require("./User");
let Event = class Event extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { defaultValue: false }),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Event.prototype, "isCompleted", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Event.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "startTime", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "endTime", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "venue", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Event.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "youtubeLink", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "logoImageLink", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "bannerImageLink", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Event.prototype, "capacity", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "clubBeemId", void 0);
__decorate([
    type_graphql_1.Field(() => [EventAttendee_1.EventAttendee]),
    typeorm_1.ManyToOne(() => EventAttendee_1.EventAttendee, (ea) => ea.event),
    __metadata("design:type", Array)
], Event.prototype, "attendeeConnection", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Event.prototype, "ownerId", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.events),
    __metadata("design:type", User_1.User)
], Event.prototype, "owner", void 0);
__decorate([
    type_graphql_1.Field(() => [Attendee_1.Attendee]),
    __metadata("design:type", Array)
], Event.prototype, "attendees", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Event.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Event.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "mixed", void 0);
Event = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Event);
exports.Event = Event;
//# sourceMappingURL=Event.js.map