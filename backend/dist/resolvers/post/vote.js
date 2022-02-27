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
exports.VoteResult = exports.VoteInput = void 0;
const type_graphql_1 = require("type-graphql");
const globals_1 = require("typeorm/globals");
const Vote_1 = require("../../entities/Vote");
let VoteInput = class VoteInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], VoteInput.prototype, "postId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], VoteInput.prototype, "value", void 0);
VoteInput = __decorate([
    type_graphql_1.InputType()
], VoteInput);
exports.VoteInput = VoteInput;
let VoteResult = class VoteResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], VoteResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], VoteResult.prototype, "errors", void 0);
VoteResult = __decorate([
    type_graphql_1.ObjectType()
], VoteResult);
exports.VoteResult = VoteResult;
const handleVote = async (input, ctx) => {
    const isUpdoot = input.value !== -1;
    const realValue = isUpdoot ? 1 : -1;
    const { userId } = ctx.req.session;
    const { postId } = input;
    const result = {
        success: true,
        errors: []
    };
    try {
        const vote = await Vote_1.Vote.findOne({
            where: {
                postId,
                userId
            }
        });
        if (vote && vote.value !== realValue) {
            await globals_1.getConnection().transaction(async (tm) => {
                await tm.query(`
          update vote
          set value = $1
          where "postId" = $2 and "userId" = $3
        `, [realValue, postId, userId]);
                await tm.query(`
          update post
          set points = points + $1
          where id = $2
        `, [2 * realValue, postId]);
            });
        }
        else if (!vote) {
            await globals_1.getConnection().transaction(async (tm) => {
                await tm.query(`
        insert into vote ("userId", "postId", value)
    values ($1, $2, $3);
        `, [userId, postId, realValue]);
                await tm.query(`
        update post
    set points = points + $1
    where id = $2;
        `, [realValue, postId]);
            });
        }
        return result;
    }
    catch (err) {
        const error = err;
        result.success = false;
        if (error.message)
            result.errors.push(error.message);
        return result;
    }
};
exports.default = handleVote;
