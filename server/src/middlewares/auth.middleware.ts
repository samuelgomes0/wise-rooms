import { NextFunction, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = async (
  request: any,
  reply: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];
  const userRepository = new UserRepository();

  if (!token) {
    return reply.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const decoded = verifyToken(token);

    const user = await userRepository.findById(decoded.id);

    if (!user) {
      return reply.status(401).json({ error: "Usuário não encontrado." });
    }

    const { password, ...userWithoutPassword } = user;

    request.user = userWithoutPassword;

    next();
  } catch (error) {
    return reply.status(401).json({ error: "Token inválido" });
  }
};
