import { Schema, model } from "mongoose";
import { TMood } from "./interface";

const moodSchema = new Schema<TMood>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mood: {
      type: String,
      enum: ["Happy", "Sad", "Angry", "Excited"],
      required: true,
    },
    note: { type: String },
    date: { type: Date, required: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

moodSchema.index({ user: 1, date: 1 }, { unique: true });

export const Mood = model<TMood>("Mood", moodSchema);
