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
exports.handleGetPaginatedPosts = exports.GetPaginatedPostsResult = exports.GetPaginatedPostsInput = exports.handleGetSinglePost = exports.GetSinglePostResult = exports.GetSinglePostInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Post_1 = require("../../entities/Post");
let GetSinglePostInput = class GetSinglePostInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], GetSinglePostInput.prototype, "postId", void 0);
GetSinglePostInput = __decorate([
    type_graphql_1.InputType()
], GetSinglePostInput);
exports.GetSinglePostInput = GetSinglePostInput;
let GetSinglePostResult = class GetSinglePostResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GetSinglePostResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], GetSinglePostResult.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GetSinglePostResult.prototype, "hasMoreComments", void 0);
__decorate([
    type_graphql_1.Field(() => Post_1.Post, { nullable: true }),
    __metadata("design:type", Post_1.Post)
], GetSinglePostResult.prototype, "post", void 0);
GetSinglePostResult = __decorate([
    type_graphql_1.ObjectType()
], GetSinglePostResult);
exports.GetSinglePostResult = GetSinglePostResult;
const handleGetSinglePost = async (input, ctx) => {
    const result = {
        success: true,
        errors: [],
        hasMoreComments: true
    };
    const userId = ctx.req.session.userId;
    try {
        const post = await typeorm_1.getConnection().query(`
          select p.*, 
          json_build_object(
            'username', u.username,
            'id', u.id,
            'email', u.email
            ) creator,

          (select value from vote where "userId" = $1 and "postId" = $2) "voteStatus",

          (select count (*) from comment where "postId" = $2) "commentsNumber",

          array (
          select json_build_object (
            'text', c.text, 
            'id', c.id, 
            'updatedAt', c."updatedAt", 
            'creatorName', username,
            'creatorId', creat.id,
            'canEdit', (case when c."userId" = $1 then 'true' else 'false' end)
            )   

          from comment c
          inner join public.user creat on creat.id = c."userId"
          where c."postId" = $2
          order by c."updatedAt" DESC
          limit 5
          ) "paginatedComments",

          case  when p."creatorId" = $1 then 'true' else 'false' end as "canEdit"
          from post p
          inner join public.user u on u.id = p."creatorId"
          where p.id = $2
        `, [userId, input.postId]);
        if (post.length < 1) {
            result.success = false;
            result.errors.push(`Post with id ${input.postId} does not exitst`);
            return result;
        }
        if (post[0].paginatedComments.length < 5)
            result.hasMoreComments = false;
        result.post = post[0];
        return result;
    }
    catch (err) {
        const error = err;
        if (error.message)
            result.errors.push(error.message);
        result.success = false;
        return result;
    }
};
exports.handleGetSinglePost = handleGetSinglePost;
let GetPaginatedPostsInput = class GetPaginatedPostsInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], GetPaginatedPostsInput.prototype, "limit", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], GetPaginatedPostsInput.prototype, "cursor", void 0);
GetPaginatedPostsInput = __decorate([
    type_graphql_1.InputType()
], GetPaginatedPostsInput);
exports.GetPaginatedPostsInput = GetPaginatedPostsInput;
let GetPaginatedPostsResult = class GetPaginatedPostsResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GetPaginatedPostsResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GetPaginatedPostsResult.prototype, "hasMore", void 0);
__decorate([
    type_graphql_1.Field(() => [Post_1.Post]),
    __metadata("design:type", Array)
], GetPaginatedPostsResult.prototype, "posts", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], GetPaginatedPostsResult.prototype, "errors", void 0);
GetPaginatedPostsResult = __decorate([
    type_graphql_1.ObjectType()
], GetPaginatedPostsResult);
exports.GetPaginatedPostsResult = GetPaginatedPostsResult;
const handleGetPaginatedPosts = async (options, ctx) => {
    const result = {
        success: true,
        posts: [],
        hasMore: false,
        errors: []
    };
    const userId = ctx.req.session.userId;
    const cursor = options.cursor
        ? new Date(parseInt(options.cursor))
        : new Date(Date.now());
    const limit = options.limit;
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    const replacements = [userId, cursor, realLimitPlusOne];
    try {
        const posts = await typeorm_1.getConnection().query(`
        select p.*, 
        json_build_object(
          'username', u.username,
          'id', u.id,
          'email', u.email
          ) creator,
        (select value from vote where "userId" = $1 and "postId" = p.id) "voteStatus",
        (select count (*) from comment where "postId" = p.id) "commentsNumber",
        (case when p."creatorId" = $1 then 'true' else 'false' end) "canEdit"
        
        from post p
        inner join public.user u on u.id = p."creatorId"
        ${cursor ? `where p."createdAt" < $2` : ""}
        order by p."createdAt" DESC
        limit $3
      `, replacements);
        result.posts = posts.slice(0, realLimit);
        if (posts.length === realLimitPlusOne)
            result.hasMore = true;
        return result;
    }
    catch (err) {
        const error = err;
        if (error.message)
            result.errors.push(error.message);
        result.success = false;
        return result;
    }
};
exports.handleGetPaginatedPosts = handleGetPaginatedPosts;
