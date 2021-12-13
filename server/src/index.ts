import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import { execute, subscribe } from "graphql";
import { graphqlUploadExpress } from "graphql-upload";
import { createServer } from "http";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Attendee } from "./entities/Attendee";
import { Event } from "./entities/Event";
import { EventAttendee } from "./entities/EventAttendee";
import { EventTemplate } from "./entities/EventTemplate";
import { SavedAttendee } from "./entities/SavedAttendee";
import { User } from "./entities/User";
import { AttendeeResolver } from "./resolvers/attendee";
import { EventResolver } from "./resolvers/event";
import { EventTemplateResolver } from "./resolvers/event-template";
import { QuickEventResolver } from "./resolvers/quick-event";
import { UploadResolver } from "./resolvers/upload";
import { UserResolver } from "./resolvers/user";
import { createAttendeeLoader } from "./utils/createAttendeeLoader";
// import { createClubLoader } from "./utils/createClubLoader";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    // synchronize: true,
    entities: [
      User,
      Event,
      Attendee,
      EventAttendee,
      EventTemplate,
      SavedAttendee,
    ],
    migrations: [path.join(__dirname, "./migrations/*")],
  });

  // await Event.delete({});
  // await EventAttendee.delete({});
  // await EventTemplate.delete({});

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
        "https://www.sprt.fun",
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
        domain: __prod__ ? ".sprt.fun" : undefined,
      },
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      UploadResolver,
      QuickEventResolver,
      EventResolver,
      EventTemplateResolver,
      AttendeeResolver,
    ],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    // @ts-ignore
    uploads: false,
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      attendeeLoader: createAttendeeLoader(),
      // clubLoader: createClubLoader(),
      // eventLoader: createEventLoader(),
    }),
  });

  await apolloServer.start();
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const httpServer = createServer(app);

  httpServer.listen(parseInt(process.env.PORT), () => {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema: schema,
      },
      {
        server: httpServer,
        path: "/subscriptions",
      }
    );
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
