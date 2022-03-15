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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const typeorm_1 = require("typeorm");
const User_1 = require("../../entities/User");
const isAuth_1 = __importDefault(require("../../middleware/isAuth"));
const friends_1 = require("./friends");
const getUsers_1 = require("./getUsers");
const login_1 = __importStar(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const register_1 = __importStar(require("./register"));
let MeResult = class MeResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], MeResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], MeResult.prototype, "username", void 0);
MeResult = __decorate([
    type_graphql_1.ObjectType()
], MeResult);
let UserResolver = class UserResolver {
    async me(context) {
        const result = { success: true };
        if (!context.req.session.userId) {
            result.success = false;
            return result;
        }
        const user = await typeorm_1.getConnection()
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .where("user.id = :userId", {
            userId: context.req.session.userId
        })
            .getOne();
        if (!user) {
            result.success = false;
            return result;
        }
        result.username = user.username;
        return result;
    }
    async register(options) {
        return await register_1.default(options);
    }
    async login(options, context) {
        return await login_1.default(options, context);
    }
    async createFriendship(options, context) {
        return await friends_1.handleCreateFriendship(options, context);
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
    async getUserById(input, context) {
        return await getUsers_1.handleGetUserById(input, context);
    }
    logout(context) {
        return logout_1.default(context);
    }
};
__decorate([
    type_graphql_1.Query(() => MeResult),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
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
    type_graphql_1.UseMiddleware(isAuth_1.default),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [friends_1.CreateFriendshipInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createFriendship", null);
__decorate([
    type_graphql_1.Mutation(() => friends_1.RegularResult),
    type_graphql_1.UseMiddleware(isAuth_1.default),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [friends_1.ManageFriendsRequestInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "manageFriendsRequest", null);
__decorate([
    type_graphql_1.Query(() => getUsers_1.GetUsersResult),
    type_graphql_1.UseMiddleware(isAuth_1.default),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getUsers_1.UsersOptions, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    type_graphql_1.Query(() => getUsers_1.GetUsersByUsernameResult),
    type_graphql_1.UseMiddleware(isAuth_1.default),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getUsers_1.GetUsersByUsernameInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsersByUsername", null);
__decorate([
    type_graphql_1.Query(() => getUsers_1.GetUserByIdResult),
    type_graphql_1.UseMiddleware(isAuth_1.default),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getUsers_1.GetUserByIdInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.default),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
