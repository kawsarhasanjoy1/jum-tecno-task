import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { modeServices } from "./services";
import { sendResponse } from "../../utils/sendResponse";
import { Types } from "mongoose";

const createMood = catchAsync(async (req: Request, res: Response) => {
  const today = new Date();
  const normalizedDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const payload = {
    ...req.body,
    user: req.user.userId,
    date: normalizedDate,
  };

  const result = await modeServices.createMood(payload);
  sendResponse(res, {
    statusCode: 201,
    data: result,
    message: "Mood created successfully",
  });
});

const getMoods = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const moods = await modeServices.getMoods(req.query, userId);
  sendResponse(res, {
    statusCode: 200,
    message: "Mood list fetched",
    data: moods,
  });
});

const updateMood = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await modeServices.updateMood(id, req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "mood updated successful",
    data: result,
  });
});

const softDeleteMood = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await modeServices.softDeleteMood(req.user?.userId, id);
  sendResponse(res, {
    statusCode: 200,
    message: "mood soft deleted successful",
    data: result,
  });
});

const restoreMood = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await modeServices.restoreMood(id);
  sendResponse(res, {
    statusCode: 200,
    message: "mood restore successful",
    data: result,
  });
});

// const getWeeklySummary = catchAsync(async (req: Request, res: Response) => {
//   const summary = await modeServices.getWeeklySummary(req.user.userId);

//   sendResponse(res, {
//     statusCode: 200,
//     message: 'Weekly mood summary fetched successfully',
//     data: summary,
//   });
// });

export const moodController = {
  createMood,
  getMoods,
  updateMood,
  softDeleteMood,
  restoreMood,
};
