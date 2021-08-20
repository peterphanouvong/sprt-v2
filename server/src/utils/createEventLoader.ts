import DataLoader from "dataloader";
import { Event } from "../entities/Event";

export const createEventLoader = () =>
  new DataLoader<number, Event>(async (eventIds) => {
    const events = await Event.findByIds(eventIds as number[]);
    const eventIdToEvent: Record<number, Event> = {};
    events.forEach((u) => {
      eventIdToEvent[u.id] = u;
    });
    return eventIds.map((eventId) => eventIdToEvent[eventId]);
  });
