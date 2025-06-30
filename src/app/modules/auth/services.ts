import config from "../../config";
import { createToken } from "../../utils/createToken";
import { User } from "../users/model";
import { TUser } from "./interface";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: TUser) => {
  const user = await User.findOne({ phone: payload.phone });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await User.comparePassword(
    payload?.password,
    user?.password
  );
  if (!isPasswordValid) throw new Error("Invalid password");
  const jwtPayload = {
    userId: user?._id,
    phone: user?.phone,
    role: user?.role,
  } as JwtPayload;
  const token = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expire_in as string
  );

  return {
    accessToken: token,
    user,
  };
};

export const authServices = {
  loginUser,
};
