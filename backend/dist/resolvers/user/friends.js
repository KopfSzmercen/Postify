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
exports.handleManageFriendsRequest = exports.ManageFriendsRequestInput = exports.getFriendshipRequest = exports.FriendsRequestsResult = exports.handleCreateFriendship = exports.RegularResult = exports.CreateFriendshipInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Friendship_1 = require("../../entities/Friendship");
const User_1 = require("../../entities/User");
let CreateFriendshipInput = class CreateFriendshipInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CreateFriendshipInput.prototype, "friend", void 0);
CreateFriendshipInput = __decorate([
    type_graphql_1.InputType()
], CreateFriendshipInput);
exports.CreateFriendshipInput = CreateFriendshipInput;
let RegularResult = class RegularResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], RegularResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], RegularResult.prototype, "errors", void 0);
RegularResult = __decorate([
    type_graphql_1.ObjectType()
], RegularResult);
exports.RegularResult = RegularResult;
const handleCreateFriendship = async (options, ctx) => {
    const result = {
        success: true,
        errors: []
    };
    //*TODO CHANGE TO SESSION */
    const userId = 46;
    //const userId = ctx.req.session.userId;
    try {
        if (userId === options.friend) {
            result.success = false;
            result.errors.push("Users ids are the same");
            return result;
        }
        const user = await typeorm_1.getConnection()
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .select("user.id")
            .where("user.id = :id", { id: userId })
            .getOne();
        if (!user) {
            result.success = false;
            result.errors.push(`User with id ${userId} does not exist`);
            return result;
        }
        const friend = await typeorm_1.getConnection()
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .select("user.id")
            .where("user.id = :id", { id: options.friend })
            .getOne();
        if (!friend) {
            result.success = false;
            result.errors.push(`User with id ${friend} does not exist`);
            return result;
        }
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(Friendship_1.Friendship)
            .values({
            user: user.id,
            friend: friend.id
        })
            .execute();
        return result;
    }
    catch (err) {
        const error = err;
        result.success = false;
        result.errors.push(error === null || error === void 0 ? void 0 : error.msg);
        return result;
    }
};
exports.handleCreateFriendship = handleCreateFriendship;
let FriendsRequest = class FriendsRequest {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], FriendsRequest.prototype, "message", void 0);
__decorate([
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], FriendsRequest.prototype, "senderId", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], FriendsRequest.prototype, "createdAt", void 0);
FriendsRequest = __decorate([
    type_graphql_1.ObjectType()
], FriendsRequest);
let FriendsRequestsResult = class FriendsRequestsResult extends RegularResult {
};
__decorate([
    type_graphql_1.Field(() => [FriendsRequest]),
    __metadata("design:type", Array)
], FriendsRequestsResult.prototype, "requests", void 0);
FriendsRequestsResult = __decorate([
    type_graphql_1.ObjectType()
], FriendsRequestsResult);
exports.FriendsRequestsResult = FriendsRequestsResult;
const getFriendshipRequest = async (ctx) => {
    //   const { userId } = ctx.req.session;
    const userId = 42;
    const result = {
        success: true,
        errors: [],
        requests: []
    };
    if (!userId) {
        result.success = false;
        result.errors.push("User id not provided");
        return result;
    }
    try {
        const friendships = await typeorm_1.getConnection()
            .getRepository(Friendship_1.Friendship)
            .createQueryBuilder("f")
            .where("f.friend = :friendId", { friendId: userId })
            .getMany();
        const allRequests = [];
        for (let i = 0; i < friendships.length; i++) {
            const r = friendships[i];
            const senderUsername = await typeorm_1.getConnection()
                .getRepository(User_1.User)
                .createQueryBuilder("user")
                .select("user.username")
                .where("user.id = :id", { id: r.user })
                .getOne();
            const builtRequest = {
                message: `${senderUsername === null || senderUsername === void 0 ? void 0 : senderUsername.username} wants to be Your friend`,
                senderId: r.user,
                createdAt: r.createdAt.toISOString()
            };
            allRequests.push({ ...builtRequest });
        }
        result.requests = [...allRequests];
        return result;
    }
    catch (error) {
        console.log(error);
        result.success = false;
        return result;
    }
};
exports.getFriendshipRequest = getFriendshipRequest;
let ManageFriendsRequestInput = class ManageFriendsRequestInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ManageFriendsRequestInput.prototype, "senderId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ManageFriendsRequestInput.prototype, "action", void 0);
ManageFriendsRequestInput = __decorate([
    type_graphql_1.InputType()
], ManageFriendsRequestInput);
exports.ManageFriendsRequestInput = ManageFriendsRequestInput;
const handleManageFriendsRequest = async (options, ctx) => {
    const result = {
        success: true,
        errors: []
    };
    //const { userId } = ctx.req.session;
    const userId = 42;
    const senderId = options.senderId;
    try {
        const initialRequest = await typeorm_1.getConnection()
            .getRepository(Friendship_1.Friendship)
            .createQueryBuilder("f")
            .where("f.friend = :userId AND f.user = :senderId", { userId, senderId })
            .getOne();
        console.log(initialRequest);
        if (!initialRequest) {
            result.errors = [];
            result.errors.push("Such friends request does not exist");
            result.success = false;
            return result;
        }
        if (options.action === "reject") {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .delete()
                .from(Friendship_1.Friendship)
                .where("user = :userId and friend = :friendId", {
                userId: options.senderId,
                friendId: userId
            })
                .execute();
            return result;
        }
        if (options.action === "accept") {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(Friendship_1.Friendship)
                .values({
                user: userId,
                friend: options.senderId
            })
                .execute();
            return result;
        }
        return result;
    }
    catch (err) {
        const error = err;
        result.success = false;
        result.errors.push(error.message);
        return result;
    }
};
exports.handleManageFriendsRequest = handleManageFriendsRequest;
