import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createAttendeeLoader } from "./utils/createAttendeeLoader";
// import { createClubLoader } from "./utils/createClubLoader";
// import { createEventLoader } from "./utils/createEventLoader";
// import { createUserLoader } from "./utils/createUserLoader";

declare global {
  namespace Express {
    interface Session {
      userId: number;
    }
  }
}
declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export type MyContext = {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
  attendeeLoader: ReturnType<typeof createAttendeeLoader>;
  // clubLoader: ReturnType<typeof createClubLoader>;
  // eventLoader: ReturnType<typeof createEventLoader>;
};
