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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
const register_1 = require("./register");
const register_2 = __importDefault(require("./register"));
const login_1 = require("./login");
const login_2 = __importDefault(require("./login"));
const friends_1 = require("./friends");
const getUsers_1 = require("./getUsers");
let UserResolver = class UserResolver {
    async register(options) {
        return await register_2.default(options);
    }
    async login(options, context) {
        return await login_2.default(options, context);
    }
    async createFriendship(options, context) {
        return await friends_1.handleCreateFriendship(options, context);
    }
    async queryFriendsRequests(context) {
        return await friends_1.getFriendshipRequest(context);
    }
    async manageFriendsRequest(options, context) {
        return await friends_1.handleManageFriendsRequest(options, context);
    }
    async getUsers(options, context) {
        return await getUsers_1.handleGetUsers(options, context);
    }
    async getUsersByUsername(options, context) {
        return await getUsers_1.getUsersByUsername(options, context);
    }
    sayHi() {
        return "Hi";
    }
};
__decorate([
    type_graphql_1.Mutation(() => register_1.RegisterResult),
    __param(0, type_graphql_1.Arg("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => login_1.LoginResult),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => friends_1.RegularResult),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [friends_1.CreateFriendshipInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createFriendship", null);
__decorate([
    type_graphql_1.Query(() => friends_1.FriendsRequestsResult),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "queryFriendsRequests", null);
__decorate([
    type_graphql_1.Mutation(() => friends_1.RegularResult),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [friends_1.ManageFriendsRequestInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "manageFriendsRequest", null);
__decorate([
    type_graphql_1.Query(() => getUsers_1.GetUsersResult),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getUsers_1.UsersOptions, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    type_graphql_1.Query(() => getUsers_1.GetUsersByUsernameResult),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getUsers_1.GetUsersByUsernameInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsersByUsername", null);
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "sayHi", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
