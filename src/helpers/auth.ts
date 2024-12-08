import { TokenPayload } from "@/types/utils";
import bcrypt from "bcryptjs";
import { ObjectSchema } from "joi";
import jwt, { SignOptions } from "jsonwebtoken";

export const compareHash = async (plain: string, hash: string) => {
  return await bcrypt.compare(plain, hash);
};

export const generateToken = (
  payload: TokenPayload,
  TOKEN_SECRET: string,
  expiresIn: string = "2h"
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, TOKEN_SECRET, options);
};

export const validateInput = <T>(schema: ObjectSchema<T>, object: T) => {
  return schema.validateAsync(object);
};

export const verifyToken = (token: string, JWT_SECRET: string) => {
  return jwt.verify(token, JWT_SECRET);
};
