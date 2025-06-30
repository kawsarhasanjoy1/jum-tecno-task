import { Schema, model, Types } from "mongoose";

const weeklySummarySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    weekStart: { type: Date, required: true },
    weekEnd: { type: Date, required: true },
    moodCounts: {
      Happy: { type: Number, default: 0 },
      Sad: { type: Number, default: 0 },
      Angry: { type: Number, default: 0 },
      Excited: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

weeklySummarySchema.index({ user: 1, weekStart: 1 }, { unique: true });

export const WeeklySummary = model("WeeklySummary", weeklySummarySchema);
