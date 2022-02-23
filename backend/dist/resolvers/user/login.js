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
exports.LoginResult = exports.LoginInput = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
let LoginInput = class LoginInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    type_graphql_1.InputType()
], LoginInput);
exports.LoginInput = LoginInput;
let LoginError = class LoginError {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], LoginError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], LoginError.prototype, "message", void 0);
LoginError = __decorate([
    type_graphql_1.ObjectType()
], LoginError);
let LoginResult = class LoginResult {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], LoginResult.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], LoginResult.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], LoginResult.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => [LoginError]),
    __metadata("design:type", Array)
], LoginResult.prototype, "errors", void 0);
LoginResult = __decorate([
    type_graphql_1.ObjectType()
], LoginResult);
exports.LoginResult = LoginResult;
const handleLogin = async (input, context) => {
    const loginResult = {
        success: true,
        errors: []
    };
    const user = await User_1.User.findOne({ email: input.email });
    if (!user) {
        loginResult.errors.push({
            field: "email",
            message: "No user with this email"
        });
        loginResult.success = false;
        return loginResult;
    }
    const passwordsMatch = await bcrypt_1.default.compare(input.password, user.password);
    if (!passwordsMatch) {
        loginResult.errors.push({
            field: "password",
            message: "Invalid password"
        });
        loginResult.success = false;
        return loginResult;
    }
    loginResult.userId = user.id;
    loginResult.username = user.username;
    context.req.session.userId = user.id;
    return loginResult;
};
exports.default = handleLogin;
