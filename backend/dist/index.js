"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/user/UserResolver");
const connectDB_1 = __importDefault(require("./utils/connectDB"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const PostResolver_1 = require("./resolvers/post/PostResolver");
async function main() {
    await connectDB_1.default();
    const redisClient = new ioredis_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const app = express_1.default();
    app.set("trust proxy", 1);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({
        extended: true
    }));
    app.use(express_session_1.default({
        name: "userId",
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: false,
        secret: "dsfdewfewfewq",
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 10 * 40,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        }
    }));
    app.use(cors_1.default({
        origin: ["https://studio.apollographql.com", "http://localhost:3000"],
        credentials: true,
        methods: ["GET", "PUT", "POST", "OPTIONS"]
    }));
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver, PostResolver_1.PostResolver],
            validate: false
        }),
        plugins: [apollo_server_core_1.ApolloServerPluginDrainHttpServer({ httpServer })],
        context: ({ req, res }) => ({ req, res })
    });
    await server.start();
    server.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: ["https://studio.apollographql.com", "http://localhost:3000"],
            methods: ["GET", "PUT", "POST", "OPTIONS"]
        }
    });
    httpServer.listen({ port: 4000 });
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
main().catch((error) => console.log(error));
