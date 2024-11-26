import { Router } from "express";
import { UserRepository } from "../repositories/user.repository";
import { AuthUseCase } from "../usecases/auth.usecase";

const router = Router();
const userRepository = new UserRepository();
const authUseCase = new AuthUseCase(userRepository);

// POST /auth/signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token } = await authUseCase.signIn(email, password);
    res.status(200).json({ message: "User authenticated", token });
  } catch (error: any) {
    res.status(401).json({ error: error.message || "Erro de autenticação." });
  }
});

router.post("/logout", async (req, res) => {
  const { email } = req.body;

  try {
    await authUseCase.logout(email);
    res.status(200).json({ message: "User logged out" });
  } catch (error: any) {
    res.status(401).json({ error: error.message || "Erro de autenticação." });
  }
});

export default router;
