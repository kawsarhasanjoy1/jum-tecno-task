"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt_decode_1 = require("jwt-decode");
const AppError_1 = require("../error/AppError");
const http_status_codes_1 = require("http-status-codes");
const verifyToken = (token) => {
    try {
        const decode = (0, jwt_decode_1.jwtDecode)(token);
        return decode;
    }
    catch (err) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "you are not authorized");
    }
};
exports.verifyToken = verifyToken;
