import { Types } from 'mongoose';

export type TMoodType = 'Happy' | 'Sad' | 'Angry' | 'Excited';

export type TMood = {
  user: Types.ObjectId;
  mood: TMoodType;
  note?: string;
  date: Date;
  deleted?: boolean;
  deletedAt?: Date | null;
};
