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
exports.handleGetSinglePost = exports.GetSinglePostResult = exports.GetSinglePostInput = void 0;
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
        errors: []
    };
    try {
        const post = await typeorm_1.getConnection()
            .getRepository(Post_1.Post)
            .createQueryBuilder("p")
            .where("p.id = :postId", {
            postId: input.postId
        })
            .leftJoinAndSelect("p.creator", "user")
            .getOne();
        console.log(post);
        if (!post) {
            result.success = false;
            result.errors.push(`Post with id ${input.postId} does not exitst`);
            return result;
        }
        result.post = post;
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
