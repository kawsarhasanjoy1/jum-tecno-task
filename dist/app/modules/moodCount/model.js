"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeklySummary = void 0;
const mongoose_1 = require("mongoose");
const weeklySummarySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    weekStart: { type: Date, required: true },
    weekEnd: { type: Date, required: true },
    moodCounts: {
        Happy: { type: Number, default: 0 },
        Sad: { type: Number, default: 0 },
        Angry: { type: Number, default: 0 },
        Excited: { type: Number, default: 0 },
    },
}, { timestamps: true });
weeklySummarySchema.index({ user: 1, weekStart: 1 }, { unique: true });
exports.WeeklySummary = (0, mongoose_1.model)("WeeklySummary", weeklySummarySchema);
