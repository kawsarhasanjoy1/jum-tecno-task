import { Model } from "mongoose";
import { USER_ROLE } from "./user.constance";

export type TRole = keyof typeof USER_ROLE;
export type TUser = {
  phone: string;
  password: string;
  role: TRole;
};

export interface TUserModelType extends Model<TUser> {
  comparePassword(plainPass: string, hashPass: string): Promise<boolean>;
}
