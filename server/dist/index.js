"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const constants_1 = require("./constants");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const event_1 = require("./resolvers/event");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const Event_1 = require("./entities/Event");
const Club_1 = require("./entities/Club");
const ClubEvent_1 = require("./entities/ClubEvent");
const Sport_1 = require("./entities/Sport");
const ClubSport_1 = require("./entities/ClubSport");
const ClubFollower_1 = require("./entities/ClubFollower");
const ClubMember_1 = require("./entities/ClubMember");
const ClubAdmin_1 = require("./entities/ClubAdmin");
const EventAttendee_1 = require("./entities/EventAttendee");
const main = async () => {
    const conn = await typeorm_1.createConnection({
        type: "postgres",
        database: "sprt",
        username: "peterphanouvong",
        password: "",
        logging: true,
        synchronize: true,
        entities: [
            Post_1.Post,
            User_1.User,
            Event_1.Event,
            EventAttendee_1.EventAttendee,
            Club_1.Club,
            ClubEvent_1.ClubEvent,
            ClubFollower_1.ClubFollower,
            ClubMember_1.ClubMember,
            ClubAdmin_1.ClubAdmin,
            Sport_1.Sport,
            ClubSport_1.ClubSport,
        ],
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
    });
    conn.runMigrations();
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient();
    app.use(cors_1.default({
        origin: ["http://localhost:3000", "https://studio.apollographql.com"],
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        secret: "secret",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver, event_1.EventResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis: redis_1.default }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map