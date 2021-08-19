import DataLoader from "dataloader";
import { Club } from "../entities/Club";

export const createClubLoader = () =>
  new DataLoader<number, Club>(async (clubIds) => {
    const clubs = await Club.findByIds(clubIds as number[]);
    const clubIdsToUser: Record<number, Club> = {};
    clubs.forEach((u) => {
      clubIdsToUser[u.id] = u;
    });
    return clubIds.map((userId) => clubIdsToUser[userId]);
  });
