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
const Attendee_1 = require("./entities/Attendee");
const Event_1 = require("./entities/Event");
const EventAttendee_1 = require("./entities/EventAttendee");
const EventTemplate_1 = require("./entities/EventTemplate");
const SavedAttendee_1 = require("./entities/SavedAttendee");
const User_1 = require("./entities/User");
const attendee_1 = require("./resolvers/attendee");
const event_1 = require("./resolvers/event");
const event_template_1 = require("./resolvers/event-template");
const quick_event_1 = require("./resolvers/quick-event");
const upload_1 = require("./resolvers/upload");
const user_1 = require("./resolvers/user");
const createAttendeeLoader_1 = require("./utils/createAttendeeLoader");
const main = async () => {
    const conn = await typeorm_1.createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        entities: [
            User_1.User,
            Event_1.Event,
            Attendee_1.Attendee,
            EventAttendee_1.EventAttendee,
            EventTemplate_1.EventTemplate,
            SavedAttendee_1.SavedAttendee,
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
            "https://www.sprt.fun",
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
            user_1.UserResolver,
            upload_1.UploadResolver,
            quick_event_1.QuickEventResolver,
            event_1.EventResolver,
            event_template_1.EventTemplateResolver,
            attendee_1.AttendeeResolver,
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
            attendeeLoader: createAttendeeLoader_1.createAttendeeLoader(),
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