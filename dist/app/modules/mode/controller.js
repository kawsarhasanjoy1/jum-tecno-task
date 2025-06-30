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
exports.moodController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const services_1 = require("./services");
const sendResponse_1 = require("../../utils/sendResponse");
const createMood = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const normalizedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const payload = Object.assign(Object.assign({}, req.body), { user: req.user.userId, date: normalizedDate });
    const result = yield services_1.modeServices.createMood(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        data: result,
        message: "Mood created successfully",
    });
}));
const getMoods = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const moods = yield services_1.modeServices.getMoods(req.query, userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Mood list fetched",
        data: moods,
    });
}));
const updateMood = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.modeServices.updateMood(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "mood updated successful",
        data: result,
    });
}));
const softDeleteMood = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const result = yield services_1.modeServices.softDeleteMood((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId, id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "mood soft deleted successful",
        data: result,
    });
}));
const restoreMood = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_1.modeServices.restoreMood(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "mood restore successful",
        data: result,
    });
}));
// const getWeeklySummary = catchAsync(async (req: Request, res: Response) => {
//   const summary = await modeServices.getWeeklySummary(req.user.userId);
//   sendResponse(res, {
//     statusCode: 200,
//     message: 'Weekly mood summary fetched successfully',
//     data: summary,
//   });
// });
exports.moodController = {
    createMood,
    getMoods,
    updateMood,
    softDeleteMood,
    restoreMood,
};
