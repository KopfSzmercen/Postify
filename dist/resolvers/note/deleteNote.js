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
exports.DeleteNoteResult = exports.DeleteNoteInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Note_1 = require("../../entities/Note");
let DeleteNoteInput = class DeleteNoteInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], DeleteNoteInput.prototype, "noteId", void 0);
DeleteNoteInput = __decorate([
    type_graphql_1.InputType()
], DeleteNoteInput);
exports.DeleteNoteInput = DeleteNoteInput;
let DeleteNoteResult = class DeleteNoteResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], DeleteNoteResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], DeleteNoteResult.prototype, "errors", void 0);
DeleteNoteResult = __decorate([
    type_graphql_1.ObjectType()
], DeleteNoteResult);
exports.DeleteNoteResult = DeleteNoteResult;
const handleDeleteNote = async (input, ctx) => {
    const { noteId } = input;
    const { userId } = ctx.req.session;
    const result = {
        success: true
    };
    try {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(Note_1.Note)
            .where(`id = :noteId and userId = :userId`, {
            noteId,
            userId
        })
            .execute();
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
exports.default = handleDeleteNote;
