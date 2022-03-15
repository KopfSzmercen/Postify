"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("Not authenticated");
    }
    else {
        return next();
    }
};
exports.default = isAuth;
