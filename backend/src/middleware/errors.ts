import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler: ErrorRequestHandler = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res
    .status(500)
    .send({ error: [{ message: `${error}, Something went wrong` }] });
};
