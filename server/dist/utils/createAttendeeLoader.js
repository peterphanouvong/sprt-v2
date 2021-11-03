"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttendeeLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const Attendee_1 = require("../entities/Attendee");
const createAttendeeLoader = () => new dataloader_1.default(async (attendeeIds) => {
    const attendees = await Attendee_1.Attendee.findByIds(attendeeIds);
    const attendeeIdToAttendee = {};
    attendees.forEach((u) => {
        attendeeIdToAttendee[u.id] = u;
    });
    return attendeeIds.map((attendeeId) => attendeeIdToAttendee[attendeeId]);
});
exports.createAttendeeLoader = createAttendeeLoader;
//# sourceMappingURL=createAttendeeLoader.js.map