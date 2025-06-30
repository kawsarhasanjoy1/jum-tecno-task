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
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../error/AppError");
const model_1 = require("./model");
const services_1 = require("../moodCount/services");
const createMood = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield model_1.Mood.findOne({
        user: payload.user,
        date: payload.date,
        deleted: false,
    });
    if (exists)
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "Mood already logged for this date");
    yield services_1.weeklySummaryService.increment(payload === null || payload === void 0 ? void 0 : payload.user, payload === null || payload === void 0 ? void 0 : payload.date, payload === null || payload === void 0 ? void 0 : payload.mood);
    return yield model_1.Mood.create(payload);
});
const getMoods = (query, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = query;
    const startDates = startDate ? new Date(startDate) : undefined;
    const endDates = startDate ? new Date(endDate) : undefined;
    const filter = { user: userId };
    if (startDates && endDates) {
        filter.date = { $gte: startDates, $lte: endDates };
    }
    return yield model_1.Mood.find(filter).sort({ date: -1 });
});
const updateMood = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield model_1.Mood.findById(id);
    if (!existing)
        throw new Error("Mood not found");
    if (payload.mood && payload.mood !== existing.mood) {
        yield services_1.weeklySummaryService.decrement(existing.user, existing.date, existing.mood);
        yield services_1.weeklySummaryService.increment(existing.user, existing.date, payload.mood);
    }
    return yield model_1.Mood.findByIdAndUpdate(id, payload, { new: true });
});
const softDeleteMood = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield model_1.Mood.findOne({
        _id: id,
        user: userId,
        deleted: false,
    });
    if (!existing)
        throw new Error("Mood not found or already deleted");
    yield services_1.weeklySummaryService.decrement(userId, existing.date, existing.mood);
    return yield model_1.Mood.findByIdAndUpdate(id, { deleted: true, deletedAt: new Date() }, { new: true });
});
const restoreMood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield model_1.Mood.findById(id);
    if (!existing || !existing.deleted)
        throw new Error("Mood not found or not deleted");
    yield services_1.weeklySummaryService.increment(existing.user, existing.date, existing.mood);
    return yield model_1.Mood.findByIdAndUpdate(id, { deleted: false, deletedAt: null }, { new: true });
});
exports.modeServices = {
    createMood,
    getMoods,
    updateMood,
    softDeleteMood,
    restoreMood,
};
