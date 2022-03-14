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
exports.handleDeleteComment = exports.DeleteCommentInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Comment_1 = require("../../entities/Comment");
let DeleteCommentInput = class DeleteCommentInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], DeleteCommentInput.prototype, "commentId", void 0);
DeleteCommentInput = __decorate([
    type_graphql_1.InputType()
], DeleteCommentInput);
exports.DeleteCommentInput = DeleteCommentInput;
const handleDeleteComment = async (input, ctx) => {
    const result = {
        success: true,
        errors: []
    };
    const currUserId = ctx.req.session.userId;
    const postId = input.commentId;
    try {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(Comment_1.Comment)
            .where('id = :id and "userId" = :currUserId', { id: postId, currUserId })
            .execute();
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
exports.handleDeleteComment = handleDeleteComment;
