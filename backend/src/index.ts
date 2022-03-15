import "reflect-metadata";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user/UserResolver";
import connectDB from "./utils/connectDB";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { PostResolver } from "./resolvers/post/PostResolver";
import { NoteResolver } from "./resolvers/note/NoteResolver";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

async function main() {
  await connectDB();
  const redisClient = new Redis();
  const RedisStore = connectRedis(session);

  const app = express();
  app.set("trust proxy", 1);

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true
    })
  );
  app.use(
    session({
      name: "userId",
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET!,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10 * 40,
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      }
    })
  );
  app.use(
    cors({
      origin: ["*", "http://localhost:3000"],
      credentials: true,
      methods: ["GET", "PUT", "POST", "OPTIONS"]
    })
  );

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver, NoteResolver],
      validate: false
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => ({ req, res })
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ["*"],
      methods: ["GET", "PUT", "POST", "OPTIONS"]
    }
  });

  httpServer.listen({ port: PORT });
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

main().catch((error) => console.log(error));
