"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const Comment_1 = require("../entities/Comment");
const Friendship_1 = require("../entities/Friendship");
const Note_1 = require("../entities/Note");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const Vote_1 = require("../entities/Vote");
require("dotenv/config");
const ConnectionParser = __importStar(require("pg-connection-string"));
require("dotenv/config");
const connectDB = async () => {
    try {
        let connection = null;
        if (process.env.MODE === "DEV") {
            connection = await typeorm_1.createConnection({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "qqqqqq",
                database: "gql",
                entities: [User_1.User, Friendship_1.Friendship, Post_1.Post, Vote_1.Vote, Comment_1.Comment, Note_1.Note],
                synchronize: true,
                logging: process.env.MODE === "DEV",
                migrations: [path_1.default.join(__dirname, "./migrations/*")]
            });
        }
        else {
            const databaseUrl = process.env.DATABASE_URL;
            const connectionOptions = ConnectionParser.parse(databaseUrl);
            const typeOrmOptions = {
                type: "postgres",
                host: connectionOptions.host,
                username: connectionOptions.user,
                port: connectionOptions.port,
                password: connectionOptions.password,
                database: connectionOptions.database,
                synchronize: true,
                entities: [User_1.User, Friendship_1.Friendship, Post_1.Post, Vote_1.Vote, Comment_1.Comment, Note_1.Note]
            };
            connection = await typeorm_1.createConnection(typeOrmOptions);
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
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.default = connectDB;
