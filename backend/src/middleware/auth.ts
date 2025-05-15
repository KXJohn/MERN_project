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
) {
  try {
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
    
    // Extract the token from the Bearer format
    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.slice(7) 
      : authHeader;
    
    if (!token) {
      return res.status(401).json({ error: "Access denied. Invalid token format." });
    }
    
    // Verify the token
    const decoded = verify(token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid or expired token. Please login again." });
  }
}
