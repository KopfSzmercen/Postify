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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../../entities/Post");
const comment_1 = require("./comment");
const createPost_1 = __importStar(require("./createPost"));
const getPosts_1 = require("./getPosts");
const vote_1 = __importStar(require("./vote"));
let PostResolver = class PostResolver {
    async createPost(input, context) {
        return await createPost_1.default(input, context);
    }
    async getSinglePost(input, context) {
        return await getPosts_1.handleGetSinglePost(input, context);
    }
    async getPaginatedPosts(options, context) {
        return await getPosts_1.handleGetPaginatedPosts(options, context);
    }
    async vote(options, context) {
        return await vote_1.default(options, context);
    }
    async addComment(input, context) {
        return await comment_1.handleAddComment(input, context);
    }
    async getMoreComments(options) {
        return await comment_1.handleGetMoreComments(options);
    }
};
__decorate([
    type_graphql_1.Mutation(() => createPost_1.CreatePostResult),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPost_1.CreatePostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    type_graphql_1.Query(() => getPosts_1.GetSinglePostResult),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getPosts_1.GetSinglePostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getSinglePost", null);
__decorate([
    type_graphql_1.Query(() => getPosts_1.GetPaginatedPostsResult),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getPosts_1.GetPaginatedPostsInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPaginatedPosts", null);
__decorate([
    type_graphql_1.Mutation(() => vote_1.VoteResult),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vote_1.VoteInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "vote", null);
__decorate([
    type_graphql_1.Mutation(() => comment_1.AddCommentResult),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_1.AddCommentInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "addComment", null);
__decorate([
    type_graphql_1.Query(() => comment_1.GetMoreCommentsResult),
    __param(0, type_graphql_1.Arg("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_1.GetMoreCommentsInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getMoreComments", null);
PostResolver = __decorate([
    type_graphql_1.Resolver(Post_1.Post)
], PostResolver);
exports.PostResolver = PostResolver;
