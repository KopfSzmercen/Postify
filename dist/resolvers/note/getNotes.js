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
exports.GetNotesResult = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Note_1 = require("../../entities/Note");
let GetNotesResult = class GetNotesResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], GetNotesResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], GetNotesResult.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => [Note_1.Note]),
    __metadata("design:type", Array)
], GetNotesResult.prototype, "notes", void 0);
GetNotesResult = __decorate([
    type_graphql_1.ObjectType()
], GetNotesResult);
exports.GetNotesResult = GetNotesResult;
const handleGetNotes = async (ctx) => {
    const userId = ctx.req.session.userId;
    const result = {
        success: true,
        notes: []
    };
    try {
        const notes = await typeorm_1.getConnection()
            .getRepository(Note_1.Note)
            .createQueryBuilder("n")
            .where('n."userId" = :userId', { userId })
            .getMany();
        result.notes = [...notes];
        return result;
    }
    catch (err) {
        const error = err;
        if (error.message)
            result.errors = [error.message];
        result.success = false;
        return result;
    }
};
exports.default = handleGetNotes;
