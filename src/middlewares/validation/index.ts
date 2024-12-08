import { validateInput } from "@/helpers/auth";
import { CustomError } from "@/types/utils";
import { handleError } from "@/utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the body (ensure req.body is typed as T)
      await validateInput(schema, req.body);

      next();
    } catch (error) {
      handleError(error as CustomError, res);
    }
  };
};

export const validateQuery = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validateInput(schema, req.query);
      next();
    } catch (error) {
      handleError(error as CustomError, res);
    }
  };
};
