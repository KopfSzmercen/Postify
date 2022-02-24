import path from "path";
import { createConnection } from "typeorm";
import { Friendship } from "../entities/Friendship";
import { Post } from "../entities/Post";
import { User } from "../entities/User";

const connectDB = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "qqqqqq",
      database: "gql",
      entities: [User, Friendship, Post],
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
