"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const Friendship_1 = require("../entities/Friendship");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const connectDB = async () => {
    try {
        const connection = await typeorm_1.createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "qqqqqq",
            database: "gql",
            entities: [User_1.User, Friendship_1.Friendship, Post_1.Post],
            synchronize: true,
            logging: true,
            migrations: [path_1.default.join(__dirname, "./migrations/*")]
        });
        return connection;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.default = connectDB;
