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
const EventAttendee_1 = require("../entities/EventAttendee");
const type_graphql_1 = require("type-graphql");
const Event_1 = require("../entities/Event");
const attendee_1 = require("./attendee");
const Attendee_1 = require("../entities/Attendee");
const typeorm_1 = require("typeorm");
let EventInput = class EventInput {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], EventInput.prototype, "isCompleted", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "startTime", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "endTime", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], EventInput.prototype, "capacity", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "clubBeemId", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "venue", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], EventInput.prototype, "price", void 0);
EventInput = __decorate([
    type_graphql_1.InputType()
], EventInput);
let EventResolver = class EventResolver {
    async createEvent(input) {
        const event = await Event_1.Event.create(input).save();
        console.log(event);
        return event;
    }
    async event(id) {
        return Event_1.Event.findOne(id);
    }
    async events() {
        return Event_1.Event.find();
    }
    async liveEvents() {
        return Event_1.Event.find({ where: { isCompleted: false } });
    }
    async pastEvents() {
        return Event_1.Event.find({ where: { isCompleted: true } });
    }
    async updateEvent(id, input) {
        const event = await Event_1.Event.findOne(id);
        if (!event) {
            return undefined;
        }
        await Event_1.Event.merge(event, input).save();
        return event;
    }
    async addNewAttendee(id, input) {
        const createAttendee = new attendee_1.AttendeeResolver().createAttendee;
        const res = await createAttendee(input);
        await EventAttendee_1.EventAttendee.insert({
            eventId: id,
            attendeeId: res.id,
        });
        return true;
    }
    async addExistingAttendee(id, attendeeId) {
        await EventAttendee_1.EventAttendee.insert({
            eventId: id,
            attendeeId: attendeeId,
        });
        return true;
    }
    async deleteEvent(id) {
        await Event_1.Event.delete(id);
        return true;
    }
    async numConfirmed(event) {
        const res = event;
        console.log("LOOK HERE", res);
        const test = await typeorm_1.getConnection().query(`
      select count(*)
      from "attendee" a
      where a.id = any(    
        select "attendeeId"
        from "event_attendee" ea
        where ea."eventId" = ${event.id}
        and ea."isConfirmed" = true
      );
    `);
        return parseInt(test[0].count);
    }
    async numWaitlist(event) {
        const test = await typeorm_1.getConnection().query(`
      select count(*)
      from "attendee" a
      where a.id = any(    
        select "attendeeId"
        from "event_attendee" ea
        where ea."eventId" = ${event.id}
        and ea."isConfirmed" = false
      );
    `);
        return parseInt(test[0].count);
    }
    async attendees(event, { attendeeLoader }) {
        const eventAttendeeIds = await typeorm_1.getConnection().query(`
      select "attendeeId" 
      from "event_attendee"
      where "eventId" = ${event.id};
    `);
        return attendeeLoader.loadMany(eventAttendeeIds.map((e) => e.attendeeId));
    }
};
__decorate([
    type_graphql_1.Mutation(() => Event_1.Event),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventInput]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
__decorate([
    type_graphql_1.Query(() => Event_1.Event),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "event", null);
__decorate([
    type_graphql_1.Query(() => [Event_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "events", null);
__decorate([
    type_graphql_1.Query(() => [Event_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "liveEvents", null);
__decorate([
    type_graphql_1.Query(() => [Event_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "pastEvents", null);
__decorate([
    type_graphql_1.Mutation(() => Event_1.Event),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, EventInput]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "updateEvent", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, attendee_1.AttendeeInput]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "addNewAttendee", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("attendeeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "addExistingAttendee", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "deleteEvent", null);
__decorate([
    type_graphql_1.FieldResolver(() => type_graphql_1.Int),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event_1.Event]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "numConfirmed", null);
__decorate([
    type_graphql_1.FieldResolver(() => type_graphql_1.Int),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event_1.Event]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "numWaitlist", null);
__decorate([
    type_graphql_1.FieldResolver(() => [Attendee_1.Attendee]),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event_1.Event, Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "attendees", null);
EventResolver = __decorate([
    type_graphql_1.Resolver(Event_1.Event)
], EventResolver);
exports.EventResolver = EventResolver;
//# sourceMappingURL=event.js.map