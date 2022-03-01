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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostResult = exports.CreatePostInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Post_1 = require("../../entities/Post");
const isLength_1 = __importDefault(require("../../utils/validation/isLength"));
let CreatePostInput = class CreatePostInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "text", void 0);
CreatePostInput = __decorate([
    type_graphql_1.InputType()
], CreatePostInput);
exports.CreatePostInput = CreatePostInput;
let CreatePostError = class CreatePostError {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreatePostError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreatePostError.prototype, "message", void 0);
CreatePostError = __decorate([
    type_graphql_1.ObjectType()
], CreatePostError);
let CreatePostResult = class CreatePostResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], CreatePostResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [CreatePostError]),
    __metadata("design:type", Array)
], CreatePostResult.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Post_1.Post, { nullable: true }),
    __metadata("design:type", Post_1.Post)
], CreatePostResult.prototype, "returnedPost", void 0);
CreatePostResult = __decorate([
    type_graphql_1.ObjectType()
], CreatePostResult);
exports.CreatePostResult = CreatePostResult;
const handleCreatePost = async (input, ctx) => {
    const result = {
        success: true,
        errors: []
    };
    const creatorId = ctx.req.session.userId;
    const isValidTitle = isLength_1.default(input.title, 5, 40);
    if (isValidTitle !== true)
        result.errors.push({ field: "password", message: isValidTitle });
    const isValidText = isLength_1.default(input.text, 5, 5000);
    if (!isValidText)
        result.errors.push({ field: "text", message: isValidText });
    if (result.errors.length > 0) {
        result.success = false;
        return result;
    }
    try {
        const newPost = await typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values({
            title: input.title,
            text: input.text,
            creatorId
        })
            .returning("id")
            .execute();
        const newPostId = newPost.raw[0].id;
        console.log(newPostId);
        const post = await typeorm_1.getConnection().query(`
          select p.*, 
          json_build_object(
            'username', u.username,
            'id', u.id,
            'email', u.email
            ) creator,
          (select value from vote where "userId" = $1 and "postId" = p.id) "voteStatus",
          (select count (*) from comment where "postId" = p.id) "commentsNumber"
          from post p
          inner join public.user u on u.id = p."creatorId"
          where p.id = $2
        `, [creatorId, newPostId]);
        result.returnedPost = { ...post[0] };
        return result;
    }
    catch (err) {
        const error = err;
        if (error.message)
            result.errors.push({ field: "other", message: error.message });
        result.success = false;
        return result;
    }
};
exports.default = handleCreatePost;
