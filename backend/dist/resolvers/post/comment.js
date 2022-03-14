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
exports.handleGetMoreComments = exports.GetMoreCommentsResult = exports.GetMoreCommentsInput = exports.handleAddComment = exports.AddCommentResult = exports.AddCommentInput = void 0;
const type_graphql_1 = require("type-graphql");
const globals_1 = require("typeorm/globals");
const Comment_1 = require("../../entities/Comment");
const Post_1 = require("../../entities/Post");
const User_1 = require("../../entities/User");
let AddCommentInput = class AddCommentInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], AddCommentInput.prototype, "postId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddCommentInput.prototype, "text", void 0);
AddCommentInput = __decorate([
    type_graphql_1.InputType()
], AddCommentInput);
exports.AddCommentInput = AddCommentInput;
let AddCommentResult = class AddCommentResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], AddCommentResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => Post_1.PaginatedComment, { nullable: true }),
    __metadata("design:type", Post_1.PaginatedComment)
], AddCommentResult.prototype, "returnedComment", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], AddCommentResult.prototype, "errors", void 0);
AddCommentResult = __decorate([
    type_graphql_1.ObjectType()
], AddCommentResult);
exports.AddCommentResult = AddCommentResult;
const handleAddComment = async (input, ctx) => {
    const result = {
        success: true,
        errors: []
    };
    const { userId } = ctx.req.session;
    const { text, postId } = input;
    if (!text) {
        result.success = false;
        result.errors.push("A comment must have some text");
    }
    try {
        const insertionResult = await globals_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(Comment_1.Comment)
            .values({
            userId,
            postId,
            text
        })
            .returning(`
       "userId" "creatorId", id, "postId", to_char("updatedAt", 'YYYY.MM.DD HH:MM') "updatedAt", text
      `)
            .execute();
        const creator = await globals_1.getConnection()
            .getRepository(User_1.User)
            .createQueryBuilder("u")
            .where("u.id = :userId", { userId })
            .getOne();
        result.returnedComment = {
            ...insertionResult.raw[0],
            creatorName: creator === null || creator === void 0 ? void 0 : creator.username
        };
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
exports.handleAddComment = handleAddComment;
let GetMoreCommentsInput = class GetMoreCommentsInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], GetMoreCommentsInput.prototype, "postId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GetMoreCommentsInput.prototype, "cursor", void 0);
GetMoreCommentsInput = __decorate([
    type_graphql_1.InputType()
], GetMoreCommentsInput);
exports.GetMoreCommentsInput = GetMoreCommentsInput;
let GetMoreCommentsResult = class GetMoreCommentsResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GetMoreCommentsResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], GetMoreCommentsResult.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GetMoreCommentsResult.prototype, "hasMoreComments", void 0);
__decorate([
    type_graphql_1.Field(() => [Post_1.PaginatedComment], { nullable: true }),
    __metadata("design:type", Array)
], GetMoreCommentsResult.prototype, "paginatedComments", void 0);
GetMoreCommentsResult = __decorate([
    type_graphql_1.ObjectType()
], GetMoreCommentsResult);
exports.GetMoreCommentsResult = GetMoreCommentsResult;
const handleGetMoreComments = async (input, ctx) => {
    const result = {
        success: true,
        hasMoreComments: false,
        errors: []
    };
    const cursor = input.cursor;
    const postId = input.postId;
    const currUserId = ctx.req.session.userId;
    try {
        const queryResult = await globals_1.getConnection().query(`select array (
      select json_build_object (
        'text', c.text, 
        'id', c.id, 
        'updatedAt', to_char(c."updatedAt", 'YYYY.MM.DD HH24:MI'), 
        'creatorName', username,
        'creatorId', creat.id,
        'canEdit', (case when c."userId" = $3 then 'true' else 'false' end)   
        )
      
      from comment c
      inner join public.user creat on creat.id = c."userId"
      where c."postId" = $1 and c."updatedAt" < $2
      order by c."updatedAt" DESC
      limit 6
      ) "paginatedComments"`, [postId, cursor, currUserId]);
        result.paginatedComments = queryResult[0].paginatedComments.slice(0, 5);
        result.hasMoreComments = queryResult[0].paginatedComments.length > 5;
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
exports.handleGetMoreComments = handleGetMoreComments;
