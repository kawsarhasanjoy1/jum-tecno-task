import { jwtDecode } from "jwt-decode";
import { AppError } from "../error/AppError";
import { StatusCodes } from "http-status-codes";

export const verifyToken = (token: string) => {
  try {
    const decode = jwtDecode(token);
    return decode;
  } catch (err) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized");
  }
};
