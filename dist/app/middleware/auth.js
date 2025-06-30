"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const AppError_1 = require("../error/AppError");
const http_status_codes_1 = require("http-status-codes");
const verifyToken_1 = require("../utils/verifyToken");
const model_1 = require("../modules/users/model");
const auth = (...requiredRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "you are not authorized");
        }
        const decode = (0, verifyToken_1.verifyToken)(token);
        const { phone, userId, role, aud, exp } = decode;
        console.log(phone, userId);
        const users = yield model_1.User.findOne({ phone: phone, _id: userId });
        if (!users) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "this user is not found");
        }
        if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "you are not authorized");
        }
        req.user = decode;
        next();
    });
};
exports.auth = auth;
