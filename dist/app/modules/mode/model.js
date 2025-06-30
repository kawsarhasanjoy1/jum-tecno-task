"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mood = void 0;
const mongoose_1 = require("mongoose");
const moodSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    mood: {
        type: String,
        enum: ["Happy", "Sad", "Angry", "Excited"],
        required: true,
    },
    note: { type: String },
    date: { type: Date, required: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
moodSchema.index({ user: 1, date: 1 }, { unique: true });
exports.Mood = (0, mongoose_1.model)("Mood", moodSchema);
