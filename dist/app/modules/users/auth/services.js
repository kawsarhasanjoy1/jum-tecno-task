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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const createToken_1 = require("../../utils/createToken");
const model_1 = require("../users/model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.User.findOne({ phone: payload.phone });
    if (!user)
        throw new Error("User not found");
    const isPasswordValid = yield model_1.User.comparePassword(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordValid)
        throw new Error("Invalid password");
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        phone: user === null || user === void 0 ? void 0 : user.phone,
    };
    const token = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_expire_in);
    return {
        accessToken: token,
        user,
    };
});
exports.authServices = {
    loginUser,
};
