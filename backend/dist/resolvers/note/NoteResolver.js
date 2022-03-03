"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Note_1 = require("../../entities/Note");
const deleteNote_1 = __importStar(require("./deleteNote"));
const getNotes_1 = __importStar(require("./getNotes"));
let NoteResolver = class NoteResolver {
    async getNotes(context) {
        return await getNotes_1.default(context);
    }
    async deleteNote(context, input) {
        return await deleteNote_1.default(input, context);
    }
};
__decorate([
    type_graphql_1.Query(() => getNotes_1.GetNotesResult),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "getNotes", null);
__decorate([
    type_graphql_1.Mutation(() => deleteNote_1.DeleteNoteResult),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, deleteNote_1.DeleteNoteInput]),
    __metadata("design:returntype", Promise)
], NoteResolver.prototype, "deleteNote", null);
NoteResolver = __decorate([
    type_graphql_1.Resolver(Note_1.Note)
], NoteResolver);
exports.NoteResolver = NoteResolver;
