import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./services";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "user login successful",
    data: result,
  });
});

export const authController = {
  login,
};
