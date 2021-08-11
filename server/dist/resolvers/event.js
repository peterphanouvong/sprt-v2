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
exports.EventResolver = void 0;
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/isAuth");
const Event_1 = require("../entities/Event");
const EventAttendee_1 = require("../entities/EventAttendee");
const User_1 = require("../entities/User");
let EventInput = class EventInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EventInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EventInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EventInput.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EventInput.prototype, "datetime", void 0);
EventInput = __decorate([
    type_graphql_1.InputType()
], EventInput);
let EventResolver = class EventResolver {
    async events() {
        return Event_1.Event.find({ relations: ["host"] });
    }
    event(id) {
        return Event_1.Event.findOne(id, { relations: ["host"] });
    }
    async createEvent({ req }, input) {
        const { id } = await Event_1.Event.create(Object.assign(Object.assign({}, input), { hostId: req.session.userId })).save();
        const event = await Event_1.Event.findOne(id, { relations: ["host"] });
        return event;
    }
    async updateEvent({ req }, id, input) {
        const event = await Event_1.Event.findOne(id);
        if (!event) {
            return null;
        }
        if (req.session.userId !== event.hostId) {
            return null;
        }
        await Event_1.Event.update(id, Object.assign({}, input));
        return Event_1.Event.findOne(id, { relations: ["host"] });
    }
    async deleteEvent(id, { req }) {
        const event = await Event_1.Event.findOne(id);
        if (!event) {
            return false;
        }
        if (event.hostId != req.session.userId) {
            throw new Error("not authorized");
        }
        await Event_1.Event.delete({ id, hostId: req.session.userId });
        return true;
    }
    async addAttendee(id, userId) {
        const event = await Event_1.Event.findOne(id);
        const user = await User_1.User.findOne(userId);
        await EventAttendee_1.EventAttendee.insert({ event, attendee: user });
        return true;
    }
};
__decorate([
    type_graphql_1.Query(() => [Event_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "events", null);
__decorate([
    type_graphql_1.Query(() => Event_1.Event, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "event", null);
__decorate([
    type_graphql_1.Mutation(() => Event_1.Event),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, EventInput]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
__decorate([
    type_graphql_1.Mutation(() => Event_1.Event, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id")),
    __param(2, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, EventInput]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "updateEvent", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "deleteEvent", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "addAttendee", null);
EventResolver = __decorate([
    type_graphql_1.Resolver(Event_1.Event)
], EventResolver);
exports.EventResolver = EventResolver;
//# sourceMappingURL=event.js.map