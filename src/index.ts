import "reflect-metadata";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user/UserResolver";
import connectDB from "./utils/connectDB";
import session from "express-session";
import { PostResolver } from "./resolvers/post/PostResolver";
import { NoteResolver } from "./resolvers/note/NoteResolver";
import "dotenv/config";
import MongoStore from "connect-mongo";
import path from "path";

const PORT = process.env.PORT || 4000;

async function main() {
  await connectDB();

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
      resave: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI!
      }),
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET!,
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

  if (process.env.MODE === "PROD") {
    app.use(express.static("frontend/build"));
    app.get("/*", (req, res) => {
      res.sendFile(path.resolve(`frontend/build/index.html`));
    });
  }
  // const root = path.join(__dirname, "../frontend/build/");

  // // console.log(root);

  // app.use(express.static(root));
  // app.get("/*", (req, res) => {
  //   console.log(root);
  //   // console.log(req.url);
  //   res.sendFile(`${root}index.html`);
  // });

  httpServer.listen({ port: PORT });
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

main().catch((error) => console.log(error));
