import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface RequestWithUserId extends Request {
  userId?: string;
}

interface JwtPayload {
  userId?: string;
}

export function verifyToken(
  req: RequestWithUserId,
  res: Response,
  next: NextFunction,
) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = verify(token, "your-secret-key") as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
