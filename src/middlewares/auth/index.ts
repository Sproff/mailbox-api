import { Request, Response, NextFunction } from "express";
import { ErrorHandler, handleError } from "@/utils/errorHandler";
import { User } from "@/types/auth";
import { CustomError } from "@/types/utils";
import { compareHash, verifyToken } from "@/helpers/auth";
import { getUserByEmail } from "@/services/user";
import { JwtPayload } from "jsonwebtoken";

export const loginEmailValidator = async (
  req: Request & { user?: Partial<User> },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    if (!email) {
      throw ErrorHandler(401, "Unauthorized access. Incorrect details");
    }

    const user = await getUserByEmail(email);
    if (!user) {
      throw ErrorHandler(401, "Unauthorized access. Incorrect details");
    }

    req.user = user;
    next();
  } catch (error) {
    handleError(error as CustomError, res);
  }
};

export const loginPasswordValidator = async (
  req: Request & { user?: Partial<User> },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user, body } = req;

    if (!user || !user.password) {
      throw ErrorHandler(401, "Unauthorized access. Incorrect details");
    }

    const isAuthenticUser = await compareHash(body.password, user.password);

    if (!isAuthenticUser) {
      throw ErrorHandler(401, "Unauthorized access. Incorrect details");
    }

    const { password, ...rest } = user;
    req.user = rest;
    next();
  } catch (error) {
    handleError(error as CustomError, res);
  }
};

const checkAuthorizationToken = (authorization: string | undefined) => {
  if (!authorization) return null;

  const tokenParts = authorization.split(" ");
  return tokenParts.length > 1 ? tokenParts[1] : authorization;
};

const checkToken = (req: Request) => {
  const {
    headers: { authorization },
  } = req;

  const bearerToken = checkAuthorizationToken(authorization);
  return bearerToken;
};

export const authenticate = (
  req: Request & { user?: string | JwtPayload },
  _res: Response,
  next: NextFunction
) => {
  const token = checkToken(req);
  if (!token) {
    throw ErrorHandler(401, "Access denied, a valid access token is required");
  }
  try {
    const decoded = verifyToken(token, process.env.SECRET as string);
    req.user = decoded;

    next();
  } catch (error) {
    throw ErrorHandler(401, "Access denied, invalid token");
  }
};
