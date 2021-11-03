import DataLoader from "dataloader";
import { Attendee } from "../entities/Attendee";

export const createAttendeeLoader = () =>
  new DataLoader<number, Attendee>(async (attendeeIds) => {
    const attendees = await Attendee.findByIds(attendeeIds as number[]);
    const attendeeIdToAttendee: Record<number, Attendee> = {};
    attendees.forEach((u) => {
      attendeeIdToAttendee[u.id] = u;
    });
    return attendeeIds.map((attendeeId) => attendeeIdToAttendee[attendeeId]);
  });
