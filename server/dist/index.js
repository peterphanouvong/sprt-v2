"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const graphql_1 = require("graphql");
const graphql_upload_1 = require("graphql-upload");
const http_1 = require("http");
const ioredis_1 = __importDefault(require("ioredis"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const Club_1 = require("./entities/Club");
const ClubAdmin_1 = require("./entities/ClubAdmin");
const ClubEvent_1 = require("./entities/ClubEvent");
const ClubFollower_1 = require("./entities/ClubFollower");
const ClubMember_1 = require("./entities/ClubMember");
const ClubRequestedMember_1 = require("./entities/ClubRequestedMember");
const ClubSport_1 = require("./entities/ClubSport");
const CreatorType_1 = require("./entities/CreatorType");
const Event_1 = require("./entities/Event");
const EventAttendee_1 = require("./entities/EventAttendee");
const Post_1 = require("./entities/Post");
const PublicityType_1 = require("./entities/PublicityType");
const QuickEvent_1 = require("./entities/QuickEvent");
const Sport_1 = require("./entities/Sport");
const User_1 = require("./entities/User");
const club_1 = require("./resolvers/club");
const event_1 = require("./resolvers/event");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const publicityType_1 = require("./resolvers/publicityType");
const quick_event_1 = require("./resolvers/quick-event");
const upload_1 = require("./resolvers/upload");
const user_1 = require("./resolvers/user");
const createClubLoader_1 = require("./utils/createClubLoader");
const createEventLoader_1 = require("./utils/createEventLoader");
const createUserLoader_1 = require("./utils/createUserLoader");
const main = async () => {
    const conn = await typeorm_1.createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        entities: [
            Post_1.Post,
            CreatorType_1.CreatorType,
            User_1.User,
            Event_1.Event,
            EventAttendee_1.EventAttendee,
            PublicityType_1.PublicityType,
            Club_1.Club,
            ClubEvent_1.ClubEvent,
            ClubFollower_1.ClubFollower,
            ClubMember_1.ClubMember,
            ClubAdmin_1.ClubAdmin,
            ClubRequestedMember_1.ClubRequestedMember,
            Sport_1.Sport,
            ClubSport_1.ClubSport,
            QuickEvent_1.QuickEvent,
        ],
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
    });
    await conn.runMigrations();
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(cors_1.default({
        origin: [
            process.env.CORS_ORIGIN,
            "https://www.sprt.rest",
            "https://studio.apollographql.com",
        ],
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
            domain: constants_1.__prod__ ? ".sprt.rest" : undefined,
        },
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    const schema = await type_graphql_1.buildSchema({
        resolvers: [
            hello_1.HelloResolver,
            post_1.PostResolver,
            user_1.UserResolver,
            event_1.EventResolver,
            club_1.ClubResolver,
            publicityType_1.PublicityTypeResolver,
            upload_1.UploadResolver,
            quick_event_1.QuickEventResolver,
        ],
        validate: false,
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        uploads: false,
        schema,
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: createUserLoader_1.createUserLoader(),
            clubLoader: createClubLoader_1.createClubLoader(),
            eventLoader: createEventLoader_1.createEventLoader(),
        }),
    });
    await apolloServer.start();
    app.use(graphql_upload_1.graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    const httpServer = http_1.createServer(app);
    httpServer.listen(parseInt(process.env.PORT), () => {
        new subscriptions_transport_ws_1.SubscriptionServer({
            execute: graphql_1.execute,
            subscribe: graphql_1.subscribe,
            schema: schema,
        }, {
            server: httpServer,
            path: "/subscriptions",
        });
        console.log("server started on localhost:4000");
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map