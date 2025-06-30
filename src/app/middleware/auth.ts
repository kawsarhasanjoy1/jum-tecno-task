import { NextFunction, Request, Response } from "express";
import { TRole } from "../modules/users/interface";
import { AppError } from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import { jwtDecode } from "jwt-decode";
import { verifyToken } from "../utils/verifyToken";
import { User } from "../modules/users/model";
import { JwtPayload } from "jsonwebtoken";

export const auth = (...requiredRole: TRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized");
    }
    const decode = verifyToken(token);
    const { phone, userId, role, aud, exp } = decode as JwtPayload;
    console.log(phone,userId)
    const users = await User.findOne({ phone: phone, _id: userId });
    if (!users) {
      throw new AppError(StatusCodes.NOT_FOUND, "this user is not found");
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized");
    }
    req.user = decode as JwtPayload;
    next();
  };
};
