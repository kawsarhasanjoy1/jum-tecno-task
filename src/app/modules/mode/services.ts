import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { TUser } from "../users/interface";
import { TMood, TMoodType } from "./interface";
import { Mood } from "./model";
import { Types } from "mongoose";
import { weeklySummaryService } from "../moodCount/services";

const createMood = async (payload: any) => {
  const exists = await Mood.findOne({
    user: payload.user,
    date: payload.date,
    deleted: false,
  });

  if (exists)
    throw new AppError(
      StatusCodes.CONFLICT,
      "Mood already logged for this date"
    );

  await weeklySummaryService.increment(
    payload?.user,
    payload?.date,
    payload?.mood
  );
  return await Mood.create(payload);
};

const getMoods = async (query: Record<string, any>, userId: string) => {
  const { startDate, endDate } = query;
  const startDates = startDate ? new Date(startDate as string) : undefined;
  const endDates = startDate ? new Date(endDate as string) : undefined;
  const filter: Record<string, any> = { user: userId };
  if (startDates && endDates) {
    filter.date = { $gte: startDates, $lte: endDates };
  }
  return await Mood.find(filter).sort({ date: -1 });
};

const updateMood = async (id: string, payload: Partial<TMood>) => {
  const existing = await Mood.findById(id);
  if (!existing) throw new Error("Mood not found");
  if (payload.mood && payload.mood !== existing.mood) {
    await weeklySummaryService.decrement(
      existing.user,
      existing.date,
      existing.mood
    );
    await weeklySummaryService.increment(
      existing.user,
      existing.date,
      payload.mood
    );
  }

  return await Mood.findByIdAndUpdate(id, payload, { new: true });
};

const softDeleteMood = async (userId: Types.ObjectId, id: string) => {
  const existing = await Mood.findOne({
    _id: id,
    user: userId,
    deleted: false,
  });
  if (!existing) throw new Error("Mood not found or already deleted");

  await weeklySummaryService.decrement(userId, existing.date, existing.mood);

  return await Mood.findByIdAndUpdate(
    id,
    { deleted: true, deletedAt: new Date() },
    { new: true }
  );
};

const restoreMood = async (id: string) => {
  const existing = await Mood.findById(id);
  if (!existing || !existing.deleted)
    throw new Error("Mood not found or not deleted");

  await weeklySummaryService.increment(
    existing.user,
    existing.date,
    existing.mood
  );

  return await Mood.findByIdAndUpdate(
    id,
    { deleted: false, deletedAt: null },
    { new: true }
  );
};

export const modeServices = {
  createMood,
  getMoods,
  updateMood,
  softDeleteMood,
  restoreMood,
};
