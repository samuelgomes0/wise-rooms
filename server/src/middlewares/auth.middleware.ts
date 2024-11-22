import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Adicione as informações do usuário ao objeto de requisição
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
