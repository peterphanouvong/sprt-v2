import DataLoader from "dataloader";
import { EventAttendee } from "../entities/EventAttendee";

export const createEventAttendeeLoader = () =>
  new DataLoader<number, EventAttendee>(async (attendeeIds) => {
    const eventAttendees = await EventAttendee.findByIds(
      attendeeIds as number[]
    );
    const attendeeIdToAttendee: Record<number, EventAttendee> = {};
    eventAttendees.forEach((u) => {
      attendeeIdToAttendee[u.attendeeId] = u;
    });
    console.log("ASdasdasdassdasddasdasdasdsadasdasdas");
    console.log(attendeeIds);
    return attendeeIds.map((attendeeId) => attendeeIdToAttendee[attendeeId]);
  });
