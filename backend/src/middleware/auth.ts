import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Get the JWT secret from environment variables or use a fallback for development
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Extend Request type to include userId
export interface RequestWithUserId extends Request {
  userId?: string;
}

interface JwtPayload {
  userId?: string;
}

export function verifyToken(
  req: RequestWithUserId,
  res: Response,
  next: NextFunction,
): void {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    
    if (!token) {
      res.status(401).json({ error: "Access denied. Please login." });
      return;
    }
    
    // Verify the token
    const decoded = verify(token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // Don't log the full error details in production
    console.error("Token verification error");
    res.status(401).json({ error: "Invalid or expired token. Please login again." });
  }
}
