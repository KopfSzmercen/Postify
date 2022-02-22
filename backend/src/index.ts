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
      secret: "dsfdewfewfewq",
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
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
      methods: ["GET", "PUT", "POST", "OPTIONS"]
    })
  );

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
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
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      methods: ["GET", "PUT", "POST", "OPTIONS"]
    }
  });

  httpServer.listen({ port: 4000 });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

main().catch((error) => console.log(error));
