import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import { graphqlUploadExpress } from "graphql-upload";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Club } from "./entities/Club";
import { ClubAdmin } from "./entities/ClubAdmin";
import { ClubEvent } from "./entities/ClubEvent";
import { ClubFollower } from "./entities/ClubFollower";
import { ClubMember } from "./entities/ClubMember";
import { ClubRequestedMember } from "./entities/ClubRequestedMember";
import { ClubSport } from "./entities/ClubSport";
import { CreatorType } from "./entities/CreatorType";
import { Event } from "./entities/Event";
import { EventAttendee } from "./entities/EventAttendee";
import { Post } from "./entities/Post";
import { PublicityType } from "./entities/PublicityType";
import { Sport } from "./entities/Sport";
import { User } from "./entities/User";
import { ClubResolver } from "./resolvers/club";
import { EventResolver } from "./resolvers/event";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { PublicityTypeResolver } from "./resolvers/publicityType";
import { UserResolver } from "./resolvers/user";
import { createClubLoader } from "./utils/createClubLoader";
import { createEventLoader } from "./utils/createEventLoader";
import { createUserLoader } from "./utils/createUserLoader";

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
  // await ClubEvent.delete({});
  // await ClubFollower.delete({});
  // await ClubMember.delete({});
  // await ClubAdmin.delete({});
  // await ClubRequestedMember.delete({});
  // await Club.delete({});
  // await User.delete({});

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
    // @ts-ignore
    uploads: false,
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
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

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
