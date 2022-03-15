import path from "path";
import { Connection, createConnection } from "typeorm";
import { Comment } from "../entities/Comment";
import { Friendship } from "../entities/Friendship";
import { Note } from "../entities/Note";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Vote } from "../entities/Vote";
import "dotenv/config";
import * as ConnectionParser from "pg-connection-string";
import "dotenv/config";

const connectDB = async () => {
  try {
    let connection: Connection | null = null;
    if (process.env.MODE === "DEV") {
      connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "qqqqqq",
        database: "gql",
        entities: [User, Friendship, Post, Vote, Comment, Note],
        synchronize: true,
        logging: process.env.MODE === "DEV",
        migrations: [path.join(__dirname, "./migrations/*")]
      });
    } else {
      const databaseUrl: string = process.env.DATABASE_URL!;
      const connectionOptions = ConnectionParser.parse(databaseUrl);

      const typeOrmOptions: any = {
        type: "postgres",
        host: connectionOptions.host,
        user: connectionOptions.user,
        port: connectionOptions.port,
        password: connectionOptions.password,
        database: connectionOptions.database,
        synchronize: true,
        entities: [User, Friendship, Post, Vote, Comment, Note]
      };
      connection = await createConnection(typeOrmOptions);
    }

    await connection.query(`
    CREATE OR REPLACE FUNCTION get_status(u1 int, u2 int)
    RETURNS TEXT
    AS
    $BODY$

    DECLARE 
    result text := '';
    f1 int;
    f2 int;
   
    BEGIN
    SELECT id from friendship
    where "user" = u1 and friend = u2 into f1;

    SELECT id from friendship
    where "user" = u2 and friend = u1 into f2;

    IF f1 IS NOT NULL and f2 IS NOT NULL THEN
    result := 'ARE FRIENDS';

    ELSIF f1 IS NOT NULL and f2 IS NULL THEN
    result := 'PENDING OUTGOING';

    ELSIF f1 IS NULL and f2 IS NOT NULL THEN
    result := 'PENDING INCOMING';

    ELSE
    result := 'NO REQUEST';

    END IF;

    RETURN result;
    END;
    $BODY$ 
    language plpgsql;

    `);
    return connection;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default connectDB;
