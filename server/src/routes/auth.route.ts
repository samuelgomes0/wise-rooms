import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { UserRepository } from "../repositories/user.repository";
import { AuthUseCase } from "../usecases";

const router = Router();
const userRepository = new UserRepository();
const authUseCase = new AuthUseCase(userRepository);

// POST /auth/signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token } = await authUseCase.signIn(email, password);
    res.status(200).json({ message: "Usuário autenticado.", token });
  } catch (error: any) {
    res.status(401).json({ error: error.message || "Erro de autenticação." });
  }
});

router.post("/logout", async (req, res) => {
  const { email } = req.body;

  try {
    await authUseCase.logout(email);
    res.status(200).json({ message: "Usuário deslogado." });
  } catch (error: any) {
    res.status(401).json({ error: error.message || "Erro de autenticação." });
  }
});

router.get("/profile", isAuthenticated, async (req: any, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error: any) {
    res.status(401).json({ error: error.message || "Erro de autenticação." });
  }
});

export default router;
