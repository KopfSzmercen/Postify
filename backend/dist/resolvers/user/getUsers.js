"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByUsername = exports.GetUsersByUsernameResult = exports.GetUsersByUsernameInput = exports.handleGetUsers = exports.GetUsersResult = exports.UsersOptions = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Friendship_1 = require("../../entities/Friendship");
const User_1 = require("../../entities/User");
const friendshipStatus = async (currentUserId, secondUserId) => {
    try {
        const requestFromUser = await typeorm_1.getConnection()
            .getRepository(Friendship_1.Friendship)
            .createQueryBuilder("f")
            .where("f.user = :currentUserId AND f.friend = :secondUserId", {
            currentUserId,
            secondUserId
        })
            .getOne();
        const decisionOfSecondUser = await typeorm_1.getConnection()
            .getRepository(Friendship_1.Friendship)
            .createQueryBuilder("f")
            .where("f.user = :secondUserId AND f.friend = :currentUserId", {
            secondUserId,
            currentUserId
        })
            .getOne();
        if (requestFromUser && decisionOfSecondUser)
            return "ARE FRIENDS";
        if (requestFromUser && !decisionOfSecondUser)
            return "PENDING TO";
        if (!requestFromUser && decisionOfSecondUser)
            return "PENDING FROM";
        return "NO REQUEST";
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
};
let UsersOptions = class UsersOptions {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UsersOptions.prototype, "limit", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UsersOptions.prototype, "cursor", void 0);
UsersOptions = __decorate([
    type_graphql_1.InputType()
], UsersOptions);
exports.UsersOptions = UsersOptions;
let UserProfile = class UserProfile {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserProfile.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UserProfile.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserProfile.prototype, "friendshipStatus", void 0);
UserProfile = __decorate([
    type_graphql_1.ObjectType()
], UserProfile);
let GetUsersResult = class GetUsersResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GetUsersResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], GetUsersResult.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [UserProfile]),
    __metadata("design:type", Array)
], GetUsersResult.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GetUsersResult.prototype, "hasMore", void 0);
GetUsersResult = __decorate([
    type_graphql_1.ObjectType()
], GetUsersResult);
exports.GetUsersResult = GetUsersResult;
const handleGetUsers = async (options, ctx) => {
    const result = {
        success: true,
        errors: [],
        users: [],
        hasMore: false
    };
    const currUserId = ctx.req.session.userId;
    console.log(currUserId);
    const limit = options.limit || 20;
    const cursor = options.cursor || 1;
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    try {
        const users = await typeorm_1.getConnection()
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .orderBy("user.id", "ASC")
            .take(realLimitPlusOne)
            .where("user.id > :cursor AND user.id != :currUserId", {
            cursor,
            currUserId
        })
            .take(realLimitPlusOne)
            .getMany();
        const usersWithFriendship = [];
        for (let i = 0; i < users.length; i++) {
            const friendship = await friendshipStatus(currUserId, users[i].id);
            friendship &&
                usersWithFriendship.push({ ...users[i], friendshipStatus: friendship });
        }
        result.users = usersWithFriendship.slice(0, realLimit);
        if (users.length === realLimitPlusOne)
            result.hasMore = true;
        return result;
    }
    catch (err) {
        const error = err;
        result.success = false;
        result.errors = [];
        result.errors.push(error.message);
        return result;
    }
};
exports.handleGetUsers = handleGetUsers;
let GetUsersByUsernameInput = class GetUsersByUsernameInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GetUsersByUsernameInput.prototype, "username", void 0);
GetUsersByUsernameInput = __decorate([
    type_graphql_1.InputType()
], GetUsersByUsernameInput);
exports.GetUsersByUsernameInput = GetUsersByUsernameInput;
let GetUsersByUsernameResult = class GetUsersByUsernameResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GetUsersByUsernameResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], GetUsersByUsernameResult.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [UserProfile]),
    __metadata("design:type", Array)
], GetUsersByUsernameResult.prototype, "users", void 0);
GetUsersByUsernameResult = __decorate([
    type_graphql_1.ObjectType()
], GetUsersByUsernameResult);
exports.GetUsersByUsernameResult = GetUsersByUsernameResult;
const getUsersByUsername = async (options, ctx) => {
    const result = {
        success: true,
        users: []
    };
    const currUserId = ctx.req.session.userId;
    const { username } = options;
    try {
        const users = await typeorm_1.getConnection()
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .where("user.username LIKE :username AND user.id != :currUserId", {
            username: `%${username}%`,
            currUserId
        })
            .getMany();
        if (users.length > 0) {
            const usersWithFriendship = [];
            console.log("here");
            for (let i = 0; i < users.length; i++) {
                const friendship = await friendshipStatus(currUserId, users[i].id);
                friendship &&
                    usersWithFriendship.push({
                        ...users[i],
                        friendshipStatus: friendship
                    });
            }
            result.users = [...usersWithFriendship];
        }
        return result;
    }
    catch (err) {
        const error = err;
        result.success = false;
        result.errors = [];
        error.message && result.errors.push(error.message);
        return result;
    }
};
exports.getUsersByUsername = getUsersByUsername;
