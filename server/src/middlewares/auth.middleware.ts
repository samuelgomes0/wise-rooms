import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const decoded = verifyToken(token);
    req.user.id = decoded;
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
