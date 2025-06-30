import { Request, Response } from "express";
import { weeklySummaryService } from "./services";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const getWeeklySummary = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;

  const summary = await weeklySummaryService.getWeeklySummary(userId);

  sendResponse(res, {
    statusCode: 200,
    data: summary,
    message: "Weekly summary fetched successfully",
  });
});

