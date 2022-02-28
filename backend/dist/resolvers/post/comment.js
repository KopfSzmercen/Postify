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
exports.handleAddComment = exports.AddCommentResult = exports.AddCommentInput = void 0;
const type_graphql_1 = require("type-graphql");
const globals_1 = require("typeorm/globals");
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
        await globals_1.getConnection().query(`
      insert into comment ("userId", "postId", text)
      values ($1, $2, $3)
      `, [userId, postId, text]);
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
