import "reflect-metadata";
import express from "express";
import "dotenv-safe/config";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import path from "path";

import { COOKIE_NAME, __prod__ } from "./constants";
import { createUserLoader } from "./utils/createUserLoader";
import { createClubLoader } from "./utils/createClubLoader";
import { createEventLoader } from "./utils/createEventLoader";

import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { EventResolver } from "./resolvers/event";
import { ClubResolver } from "./resolvers/club";

import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { Event } from "./entities/Event";
import { Club } from "./entities/Club";
import { ClubEvent } from "./entities/ClubEvent";
import { Sport } from "./entities/Sport";
import { ClubSport } from "./entities/ClubSport";
import { ClubFollower } from "./entities/ClubFollower";
import { ClubMember } from "./entities/ClubMember";
import { ClubAdmin } from "./entities/ClubAdmin";
import { EventAttendee } from "./entities/EventAttendee";
import { ClubRequestedMember } from "./entities/ClubRequestedMember";
import { PublicityType } from "./entities/PublicityType";
import { CreatorType } from "./entities/CreatorType";
import { PublicityTypeResolver } from "./resolvers/publicityType";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    // synchronize: true,
    entities: [
      Post,
      CreatorType,
      User,
      Event,
      EventAttendee,
      PublicityType,
      Club,
      ClubEvent,
      ClubFollower,
      ClubMember,
      ClubAdmin,
      ClubRequestedMember,
      Sport,
      ClubSport,
    ],
    migrations: [path.join(__dirname, "./migrations/*")],
  });

  // await Post.delete({});
  // await EventAttendee.delete({});
  // await Event.delete({});
  // await ClubRequestedMember.delete({});
  // await ClubFollower.delete({});
  // await ClubAdmin.delete({});
  // await Club.delete({});

  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: [
        process.env.CORS_ORIGIN,
        "https://www.sprt.rest",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years,
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".sprt.rest" : undefined,
      },
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        PostResolver,
        UserResolver,
        EventResolver,
        ClubResolver,
        PublicityTypeResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      clubLoader: createClubLoader(),
      eventLoader: createEventLoader(),
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
