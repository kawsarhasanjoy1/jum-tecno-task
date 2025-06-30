import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  data: JwtPayload,
  secret: string,
  expireIn: string
) => {
  return jwt.sign(data, secret, { expiresIn: expireIn as any });
};
