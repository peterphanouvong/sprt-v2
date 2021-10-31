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
exports.AttendeeResolver = void 0;
const Attendee_1 = require("../entities/Attendee");
const type_graphql_1 = require("type-graphql");
let AttendeeInput = class AttendeeInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], AttendeeInput.prototype, "firstname", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], AttendeeInput.prototype, "lastname", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], AttendeeInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], AttendeeInput.prototype, "phoneNumber", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], AttendeeInput.prototype, "beemId", void 0);
AttendeeInput = __decorate([
    type_graphql_1.InputType()
], AttendeeInput);
let AttendeeResolver = class AttendeeResolver {
    attendees() {
        return Attendee_1.Attendee.find();
    }
    async createAttendee(input) {
        const attendee = await Attendee_1.Attendee.create(input).save();
        console.log(attendee);
        return attendee;
    }
};
__decorate([
    type_graphql_1.Query(() => [Attendee_1.Attendee]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendeeResolver.prototype, "attendees", null);
__decorate([
    type_graphql_1.Mutation(() => Attendee_1.Attendee),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AttendeeInput]),
    __metadata("design:returntype", Promise)
], AttendeeResolver.prototype, "createAttendee", null);
AttendeeResolver = __decorate([
    type_graphql_1.Resolver(Attendee_1.Attendee)
], AttendeeResolver);
exports.AttendeeResolver = AttendeeResolver;
//# sourceMappingURL=attendee.js.map