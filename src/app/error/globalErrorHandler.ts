import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
type TErrorSource = {
  path: string;
  message: string;
}[];
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "something went wrong";
  let errorSource: TErrorSource = [
    { path: "", message: "something went wrong" },
  ];
  if (err instanceof mongoose.Error.ValidationError) {
    (statusCode = StatusCodes.CONFLICT),
      (message = "Validation error"),
      (errorSource = Object.keys(err?.errors)?.map((item) => ({
        path: item,
        message: `${item} is required`,
      })));
  }
  if (err.code == 11000) {
    statusCode = StatusCodes.CONFLICT;
    message = "duplicate error!";
    errorSource = Object.keys(err?.keyValue)?.map((item) => ({
      path: item,
      message: `this ${item} is already exist!`,
    }));
  }

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSource = [{ path: "", message: err?.message }];
  }
  if (err instanceof Error) {
    statusCode = StatusCodes.CONFLICT;
    message = err?.message;
    errorSource = [{ path: "", message: err?.message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
  });
};
