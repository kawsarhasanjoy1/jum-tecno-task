import { Types } from 'mongoose';
import { WeeklySummary } from './model';
import { TMoodType } from '../mode/interface';
import { getWeekRange } from '../../utils/weekRange';


export const weeklySummaryService = {
  increment: async (userId: Types.ObjectId, date: Date, mood: TMoodType) => {
    const { weekStart, weekEnd } = getWeekRange(date);
    await WeeklySummary.findOneAndUpdate(
      { user: userId, weekStart },
      {
        $inc: { [`moodCounts.${mood}`]: 1 },
        $setOnInsert: { weekEnd, user: userId },
      },
      { upsert: true }
    );
  },

  decrement: async (userId: Types.ObjectId, date: Date, mood: TMoodType) => {
    const { weekStart } = getWeekRange(date);
    await WeeklySummary.findOneAndUpdate(
      { user: userId, weekStart },
      { $inc: { [`moodCounts.${mood}`]: -1 } }
    );
  },

  getWeeklySummary: async (userId: Types.ObjectId, date = new Date()) => {
    const { weekStart } = getWeekRange(date);
    return await WeeklySummary.findOne({ user: userId, weekStart });
  },
};
