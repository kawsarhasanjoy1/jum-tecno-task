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
exports.modeServices = void 0;
const model_1 = require("./model");
const createMood = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield model_1.Mood.findOne({
        user: payload.user,
        date: payload.date,
        deleted: false,
    });
    if (exists)
        throw new Error("Mood already logged for this date");
    return yield model_1.Mood.create(payload);
});
const getMoods = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.Mood.find().sort({ date: -1 });
});
const updateMood = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.Mood.findOneAndUpdate({ _id: id }, { payload }, { new: true });
});
const softDeleteMood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.Mood.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true, deletedAt: new Date() }, { new: true });
});
const restoreMood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.Mood.findOneAndUpdate({ _id: id, deleted: true }, { deleted: false, deletedAt: null }, { new: true });
});
exports.modeServices = {
    createMood,
    getMoods,
    updateMood,
    softDeleteMood,
    restoreMood,
};
