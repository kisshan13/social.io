import type { Request, Response, NextFunction } from "express";

type Controller = (req: Request, res: Response, next: NextFunction) => void;

function requestHandler(controller: Controller) {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(controller(req, res, next)).catch((err) => next(err));
  };
}

export default requestHandler;
