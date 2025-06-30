import { model, Schema } from "mongoose";
import { TUser, TUserModelType } from "./interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, TUserModelType>(
  {
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

userSchema.index({ phone: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  next();
});

userSchema.statics.comparePassword = async function (
  plainPass: string,
  hashPass: string
) {
  return await bcrypt.compare(plainPass, hashPass);
};

export const User = model<TUser, TUserModelType>("User", userSchema);
