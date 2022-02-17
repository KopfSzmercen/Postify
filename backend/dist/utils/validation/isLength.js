"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLength = (value, min, max) => {
    if (value.length < min) {
        return `Input has to be at least ${min} characters long.`;
    }
    if (value.length > max) {
        return `Input has to be max ${max} characters long.`;
    }
    return true;
};
exports.default = isLength;
