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

    ELSIF f1 IS NOT NULL and f2 IS NULL  THEN
    result := 'PENDING OUTGOING';

    ELSIF f1 IS NOT NULL and f2 IS NOT NULL THEN
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
