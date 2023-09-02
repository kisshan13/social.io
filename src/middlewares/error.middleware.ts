import type { Request, Response, NextFunction } from "express";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.json(500).json({
    message: err.message,
    cause: err.cause,
    stack: err.stack,
  });
}
export default errorHandler;
