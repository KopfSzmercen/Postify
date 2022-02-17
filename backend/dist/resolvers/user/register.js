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
exports.RegisterResult = exports.RegisterInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("../../entities/User");
const isEmail_1 = __importDefault(require("../../utils/validation/isEmail"));
const isLength_1 = __importDefault(require("../../utils/validation/isLength"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let RegisterInput = class RegisterInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "confirmPassword", void 0);
RegisterInput = __decorate([
    type_graphql_1.InputType()
], RegisterInput);
exports.RegisterInput = RegisterInput;
let RegisterError = class RegisterError {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], RegisterError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], RegisterError.prototype, "message", void 0);
RegisterError = __decorate([
    type_graphql_1.ObjectType()
], RegisterError);
let RegisterResult = class RegisterResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], RegisterResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(() => [RegisterError]),
    __metadata("design:type", Array)
], RegisterResult.prototype, "errors", void 0);
RegisterResult = __decorate([
    type_graphql_1.ObjectType()
], RegisterResult);
exports.RegisterResult = RegisterResult;
const handleRegister = async (input) => {
    const registerResult = {
        success: true,
        errors: []
    };
    const isValidUsername = isLength_1.default(input.username, 5, 15);
    if (isValidUsername !== true)
        registerResult.errors.push({ field: "username", message: isValidUsername });
    const isValidPassword = isLength_1.default(input.password, 5, 15);
    if (isValidPassword !== true)
        registerResult.errors.push({ field: "password", message: isValidPassword });
    if (input.password !== input.confirmPassword)
        registerResult.errors.push({
            field: "password",
            message: "Passwords do not match"
        });
    if (!isEmail_1.default(input.email))
        registerResult.errors.push({ field: "email", message: "Invalid email" });
    if (registerResult.errors.length > 0) {
        registerResult.success = false;
        return registerResult;
    }
    const hashedPassword = await bcrypt_1.default.hash(input.password, 10);
    try {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values({
            username: input.username,
            email: input.email,
            password: hashedPassword
        })
            .returning("*")
            .execute();
    }
    catch (err) {
        const error = err;
        if ((error === null || error === void 0 ? void 0 : error.code) === "23505" && (error === null || error === void 0 ? void 0 : error.detail.includes("username")))
            registerResult.errors.push({
                field: "username",
                message: "This username is already used."
            });
        if ((error === null || error === void 0 ? void 0 : error.code) === "23505" && (error === null || error === void 0 ? void 0 : error.detail.includes("email")))
            registerResult.errors.push({
                field: "email",
                message: "This email is already used."
            });
    }
    if (registerResult.errors.length > 0)
        registerResult.success = false;
    return registerResult;
};
exports.default = handleRegister;
