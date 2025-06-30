import { Response } from "express";
type TData<T> = {
  statusCode: number;
  message: string;
  data: T;
};
export const sendResponse = <T>(res: Response, data: TData<T>) => {
  res.status(data.statusCode).json({
    success: true,
    statusCode: data?.statusCode,
    message: data?.message,
    data: data?.data,
  });
};
