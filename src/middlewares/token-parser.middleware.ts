import type { NextFunction, Request, Response } from "express";

function tokenParser(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization?.split(" ")[1];
  Object.defineProperty(res, "token", {
    value: authToken ? authToken : false,
    writable: false,
  });
  next();
}

export default tokenParser;
