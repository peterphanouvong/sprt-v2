"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventAttendeeLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const EventAttendee_1 = require("../entities/EventAttendee");
const createEventAttendeeLoader = () => new dataloader_1.default(async (attendeeIds) => {
    const eventAttendees = await EventAttendee_1.EventAttendee.findByIds(attendeeIds);
    const attendeeIdToAttendee = {};
    eventAttendees.forEach((u) => {
        attendeeIdToAttendee[u.attendeeId] = u;
    });
    console.log("ASdasdasdassdasddasdasdasdsadasdasdas");
    console.log(attendeeIds);
    return attendeeIds.map((attendeeId) => attendeeIdToAttendee[attendeeId]);
});
exports.createEventAttendeeLoader = createEventAttendeeLoader;
//# sourceMappingURL=createEventAttendeeLoader.js.map