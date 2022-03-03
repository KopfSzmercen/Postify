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
exports.EditPostInput = void 0;
const type_graphql_1 = require("type-graphql");
const createPost_1 = require("./createPost");
const typeorm_1 = require("typeorm");
const Post_1 = require("../../entities/Post");
let EditPostInput = class EditPostInput extends createPost_1.CreatePostInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], EditPostInput.prototype, "postId", void 0);
EditPostInput = __decorate([
    type_graphql_1.InputType()
], EditPostInput);
exports.EditPostInput = EditPostInput;
const handleEditPost = async (input, ctx) => {
    const result = {
        success: true,
        errors: []
    };
    try {
        typeorm_1.getConnection()
            .createQueryBuilder()
            .update(Post_1.Post)
            .set({ title: input.title, text: input.text })
            .where("id = :postId", { postId: input.postId })
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
exports.default = handleEditPost;
