import { User } from "./model";
import { TUser } from "./interface";

const userRegister = async (payload: TUser) => {
  const users = await User.findOne({ phone: payload?.phone });
  if (users) {
    throw new Error("this number is already exist");
  }
  const result = await User.create(payload);
  return result;
};

export const userServices = {
  userRegister,
};
