import { Request, Response } from "express";
import { Redis } from "ioredis";

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
};
