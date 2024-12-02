import { NextFunction, Request, Response } from "express";
import AppError from "../utils/errorHandling";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      status: err.statusCode,
    });
  }

  return res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred.",
    status: 500,
  });
};

export default errorHandler;
