"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const Event_1 = require("../entities/Event");
const createEventLoader = () => new dataloader_1.default(async (eventIds) => {
    const events = await Event_1.Event.findByIds(eventIds);
    const eventIdToEvent = {};
    events.forEach((u) => {
        eventIdToEvent[u.id] = u;
    });
    return eventIds.map((eventId) => eventIdToEvent[eventId]);
});
exports.createEventLoader = createEventLoader;
//# sourceMappingURL=createEventLoader.js.map