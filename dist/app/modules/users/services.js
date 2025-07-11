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
exports.userServices = void 0;
const model_1 = require("./model");
const userRegister = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield model_1.User.findOne({ phone: payload === null || payload === void 0 ? void 0 : payload.phone });
    if (users) {
        throw new Error("this number is already exist");
    }
    const result = yield model_1.User.create(payload);
    return result;
});
exports.userServices = {
    userRegister,
};
