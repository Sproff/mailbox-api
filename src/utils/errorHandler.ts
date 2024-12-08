import { type Response } from "express";
import { CustomError } from "@/types/utils";

const ErrorHandler = (statusCode: number, message: string) => {
  const error = new Error(message) as CustomError;
  error.name = "ErrorHandler";
  error.statusCode = statusCode;

  return error;
};

const handleError = (err: CustomError, res: Response) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
    status: "error",
    data: null,
  });
};

export { ErrorHandler, handleError };
