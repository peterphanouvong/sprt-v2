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
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], EventInput.prototype, "youtubeLink", void 0);
EventInput = __decorate([
    type_graphql_1.InputType()
], EventInput);
let EventResolver = class EventResolver {
    async createEvent(input, { req }) {
        const { id } = await Event_1.Event.create(Object.assign(Object.assign({}, input), { ownerId: req.session.userId })).save();
        const event = await Event_1.Event.findOne(id, { relations: ["owner"] });
        console.log("event", event);
        return Event_1.Event.findOne(id, { relations: ["owner"] });
    }
    async event(id) {
        return Event_1.Event.findOne(id, { relations: ["owner"] });
    }
    async events() {
        return Event_1.Event.find();
    }
    async liveEvents({ req }) {
        return Event_1.Event.find({
            where: { isCompleted: false, ownerId: req.session.userId },
        });
    }
    async pastEvents({ req }) {
        return Event_1.Event.find({
            where: { isCompleted: true, ownerId: req.session.userId },
        });
    }
    async updateEvent(id, input) {
        const event = await Event_1.Event.findOne(id);
        if (!event) {
            return undefined;
        }
        await Event_1.Event.merge(event, input).save();
        return event;
    }
    async addNewAttendee(id, input, pubSub) {
        console.log("MY INPUT: ", input);
        const createAttendee = new attendee_1.AttendeeResolver().createAttendee;
        const res = await createAttendee(input);
        const num = await typeorm_1.getConnection().query(`
      select max(position) 
      from "event_attendee" ea 
      where ea."isConfirmed" = false and 
      ea."eventId" = ${id};
    `);
        console.log("NUM IS: ", num);
        await EventAttendee_1.EventAttendee.insert({
            eventId: id,
            attendeeId: res.id,
            isPayingCash: input.isPayingCash,
            position: num[0].max !== null ? num[0].max + 1 : 0,
        });
        pubSub.publish(`EVENT-${id}`, EventAttendee_1.EventAttendee.find({ where: { eventId: id }, relations: ["attendee"] }));
        return true;
    }
    async removeAttendee(attendeeId, eventId, pubSub) {
        await EventAttendee_1.EventAttendee.delete({ attendeeId, eventId });
        pubSub.publish(`EVENT-${eventId}`, EventAttendee_1.EventAttendee.find({
            where: { eventId: eventId },
            relations: ["attendee"],
        }));
        return true;
    }
    async addExistingAttendee(id, attendeeId) {
        await EventAttendee_1.EventAttendee.insert({
            eventId: id,
            attendeeId: attendeeId,
        });
        return true;
    }
    async confirmAttendee(eventId, attendeeId, pubSub) {
        console.log(eventId);
        console.log(attendeeId);
        const position = await typeorm_1.getConnection().query(`
      select "position" 
      from "event_attendee" ea 
      where ea."attendeeId" = ${attendeeId}
      and ea."eventId" = ${eventId};
    `);
        const pivot = position[0].position;
        console.log("asd position is: ", pivot);
        const attendeesAfterPivot = await typeorm_1.getConnection().query(`
      select ea."attendeeId", ea."position" 
      from "event_attendee" ea 
      where ea."position" > ${pivot}; 
    `);
        attendeesAfterPivot.forEach((a) => {
            EventAttendee_1.EventAttendee.update({ eventId, attendeeId: a.attendeeId }, { position: a.position - 1 });
        });
        await EventAttendee_1.EventAttendee.update({ eventId, attendeeId }, { isConfirmed: true, position: 0 });
        pubSub.publish(`EVENT-${eventId}`, EventAttendee_1.EventAttendee.find({
            where: { eventId: eventId },
            relations: ["attendee"],
        }));
        return true;
    }
    async unconfirmAttendee(eventId, attendeeId, pubSub) {
        console.log(eventId);
        console.log(attendeeId);
        const num = await typeorm_1.getConnection().query(`
      select max(position) 
      from "event_attendee" ea 
      where ea."isConfirmed" = false and 
      ea."eventId" = ${eventId};
    `);
        await EventAttendee_1.EventAttendee.update({ eventId, attendeeId }, { isConfirmed: false, position: num[0].max !== null ? num[0].max + 1 : 0 });
        pubSub.publish(`EVENT-${eventId}`, EventAttendee_1.EventAttendee.find({
            where: { eventId: eventId },
            relations: ["attendee"],
        }));
        return true;
    }
    async markEventAsComplete(id) {
        const event = await Event_1.Event.findOne(id);
        if (!event) {
            return undefined;
        }
        await Event_1.Event.merge(event, { isCompleted: true }).save();
        return event;
    }
    async markEventAsLive(id) {
        const event = await Event_1.Event.findOne(id);
        if (!event) {
            return undefined;
        }
        await Event_1.Event.merge(event, { isCompleted: false }).save();
        return event;
    }
    async shiftAttendeePosition(src, dest, eventId, attendeeId, pubSub) {
        if (src > dest) {
            for (let pos = src - 1; pos >= dest; pos--) {
                await EventAttendee_1.EventAttendee.update({ eventId, position: pos }, { position: pos + 1 });
            }
        }
        else {
            for (let pos = src + 1; pos <= dest; pos++) {
                console.log("pos is: ", pos);
                await EventAttendee_1.EventAttendee.update({ eventId, position: pos }, { position: pos - 1 });
            }
        }
        await EventAttendee_1.EventAttendee.update({ eventId, isConfirmed: true }, { position: 0 });
        await EventAttendee_1.EventAttendee.update({ eventId, attendeeId }, { position: dest });
        pubSub.publish(`EVENT-${eventId}`, EventAttendee_1.EventAttendee.find({
            where: { eventId: eventId },
            relations: ["attendee"],
        }));
        return true;
    }
    async deleteEvent(id) {
        await Event_1.Event.delete(id);
        return true;
    }
    async numConfirmed(event) {
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
        console.log("attendeeLoader");
        console.log(attendeeLoader);
        return attendeeLoader.loadMany(eventAttendeeIds.map((e) => e.attendeeId));
    }
    async attendeeConnection(event) {
        const attendeeConnections = await typeorm_1.getConnection().query(`
      select "attendeeId", "isConfirmed"
      from "event_attendee"
      where "eventId" = ${event.id};
    `);
        const eventAttendeeIds = attendeeConnections.map((e) => {
            return { eventId: event.id, attendeeId: e.attendeeId };
        });
        return await EventAttendee_1.EventAttendee.findByIds(eventAttendeeIds);
    }
    async eventAttendees(eventAttendees, id) {
        console.log(id);
        return eventAttendees;
    }
    async eventAttendeesTrigger(id, pubSub) {
        pubSub.publish(`EVENT-${id}`, EventAttendee_1.EventAttendee.find({ where: { eventId: id }, relations: ["attendee"] }));
        return EventAttendee_1.EventAttendee.find({
            where: { eventId: id },
            relations: ["attendee"],
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Event_1.Event),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventInput, Object]),
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
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "liveEvents", null);
__decorate([
    type_graphql_1.Query(() => [Event_1.Event]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
    __param(2, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, attendee_1.AttendeeInput,
        type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "addNewAttendee", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("attendeeId")),
    __param(1, type_graphql_1.Arg("eventId")),
    __param(2, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "removeAttendee", null);
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
    __param(0, type_graphql_1.Arg("eventId")),
    __param(1, type_graphql_1.Arg("attendeeId")),
    __param(2, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "confirmAttendee", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("eventId")),
    __param(1, type_graphql_1.Arg("attendeeId")),
    __param(2, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "unconfirmAttendee", null);
__decorate([
    type_graphql_1.Mutation(() => Event_1.Event),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "markEventAsComplete", null);
__decorate([
    type_graphql_1.Mutation(() => Event_1.Event),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "markEventAsLive", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("src")),
    __param(1, type_graphql_1.Arg("dest")),
    __param(2, type_graphql_1.Arg("eventId")),
    __param(3, type_graphql_1.Arg("attendeeId")),
    __param(4, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "shiftAttendeePosition", null);
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
__decorate([
    type_graphql_1.FieldResolver(() => [EventAttendee_1.EventAttendee]),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event_1.Event]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "attendeeConnection", null);
__decorate([
    type_graphql_1.Subscription(() => [EventAttendee_1.EventAttendee], {
        topics: ({ args }) => `EVENT-${args.id}`,
    }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "eventAttendees", null);
__decorate([
    type_graphql_1.Mutation(() => [EventAttendee_1.EventAttendee]),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.PubSub()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "eventAttendeesTrigger", null);
EventResolver = __decorate([
    type_graphql_1.Resolver(Event_1.Event)
], EventResolver);
exports.EventResolver = EventResolver;
//# sourceMappingURL=event.js.map