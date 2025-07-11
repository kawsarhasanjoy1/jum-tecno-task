import { NextFunction, Request, Response } from "express";

export const catchAsync = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next).catch((err: any) => next(err)));
  };
};
