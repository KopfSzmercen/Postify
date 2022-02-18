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
exports.handleGetUsers = exports.GetUsersResult = exports.UsersOptions = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("../../entities/User");
let UsersOptions = class UsersOptions {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], UsersOptions.prototype, "limit", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
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
    const limit = options.limit || 20;
    const cursor = options.cursor || "a";
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    try {
        const users = await typeorm_1.getConnection()
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .orderBy("user.username", "DESC")
            .take(realLimitPlusOne)
            .where("user.username > :cursor", { cursor })
            .take(realLimitPlusOne)
            .getMany();
        result.users = users.slice(0, realLimit);
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
