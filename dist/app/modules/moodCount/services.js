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
exports.weeklySummaryService = void 0;
const model_1 = require("./model");
const weekRange_1 = require("../../utils/weekRange");
exports.weeklySummaryService = {
    increment: (userId, date, mood) => __awaiter(void 0, void 0, void 0, function* () {
        const { weekStart, weekEnd } = (0, weekRange_1.getWeekRange)(date);
        yield model_1.WeeklySummary.findOneAndUpdate({ user: userId, weekStart }, {
            $inc: { [`moodCounts.${mood}`]: 1 },
            $setOnInsert: { weekEnd, user: userId },
        }, { upsert: true });
    }),
    decrement: (userId, date, mood) => __awaiter(void 0, void 0, void 0, function* () {
        const { weekStart } = (0, weekRange_1.getWeekRange)(date);
        yield model_1.WeeklySummary.findOneAndUpdate({ user: userId, weekStart }, { $inc: { [`moodCounts.${mood}`]: -1 } });
    }),
    getWeeklySummary: (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, date = new Date()) {
        const { weekStart } = (0, weekRange_1.getWeekRange)(date);
        return yield model_1.WeeklySummary.findOne({ user: userId, weekStart });
    }),
};
