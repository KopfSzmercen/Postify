"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleLogout = (ctx) => {
    const { req, res } = ctx;
    return new Promise((resolve) => {
        req.session.destroy((error) => {
            res.clearCookie("userId");
            if (error) {
                console.log(error);
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
};
exports.default = handleLogout;
