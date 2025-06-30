import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./services";

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.userRegister(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "user created successful",
    data: user,
  });
});

export const userController = {
  register,
};
