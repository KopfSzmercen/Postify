import path from "path";
import { createConnection } from "typeorm";
import { Comment } from "../entities/Comment";
import { Friendship } from "../entities/Friendship";
import { Note } from "../entities/Note";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Vote } from "../entities/Vote";

const connectDB = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "qqqqqq",
      database: "gql",
      entities: [User, Friendship, Post, Vote, Comment, Note],
      synchronize: true,
      logging: true,
      migrations: [path.join(__dirname, "./migrations/*")]
    });
    return connection;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default connectDB;
