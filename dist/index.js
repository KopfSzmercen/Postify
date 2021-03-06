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
const express_session_1 = __importDefault(require("express-session"));
const PostResolver_1 = require("./resolvers/post/PostResolver");
const NoteResolver_1 = require("./resolvers/note/NoteResolver");
require("dotenv/config");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const path_1 = __importDefault(require("path"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const compression_1 = __importDefault(require("compression"));
const PORT = process.env.PORT || 4000;
async function main() {
    await connectDB_1.default();
    const app = express_1.default();
    app.set("trust proxy", 1);
    app.use(connect_history_api_fallback_1.default());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({
        extended: true
    }));
    app.use(compression_1.default());
    app.use(express_session_1.default({
        name: "userId",
        resave: false,
        store: connect_mongo_1.default.create({
            mongoUrl: process.env.MONGO_URI
        }),
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 10 * 40,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        }
    }));
    app.use(cors_1.default({
        origin: ["http://localhost:3000", "*"],
        credentials: true,
        methods: ["GET", "PUT", "POST", "OPTIONS"]
    }));
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver, PostResolver_1.PostResolver, NoteResolver_1.NoteResolver],
            validate: false
        }),
        plugins: [apollo_server_core_1.ApolloServerPluginDrainHttpServer({ httpServer })],
        context: ({ req, res }) => ({ req, res })
    });
    await server.start();
    server.applyMiddleware({
        app,
        cors: {
            origin: ["http://localhost:3000", "*"],
            credentials: true,
            methods: ["GET", "PUT", "POST", "OPTIONS"]
        }
    });
    if (process.env.MODE === "PROD") {
        const frontend = path_1.default.join(__dirname, "../frontend/build");
        app.use(express_1.default.static(frontend));
        app.get("*", (req, res) => {
            res.sendFile(path_1.default.join(frontend, "/index.html"));
        });
    }
    httpServer.listen({ port: PORT });
    console.log(`???? Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}
main().catch((error) => console.log(error));
