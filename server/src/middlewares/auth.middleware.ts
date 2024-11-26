import { NextFunction, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  const userRepository = new UserRepository();

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const decoded = verifyToken(token);

    const user = await userRepository.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
