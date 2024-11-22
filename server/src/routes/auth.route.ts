import { Router } from "express";
import { UserRepository } from "../repositories/user.repository";
import { comparePasswords } from "../utils";
import { generateToken } from "../utils/jwt";

const router = Router();
const userRepository = new UserRepository();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await comparePasswords(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = generateToken({ id: user.id, role: user.roleId });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600 * 1000, // 1 hora
    });

    return res.status(200).json({ message: "Login successful." });
  } catch (error) {
    return res.status(500).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  return res.status(200).json({ message: "Logout successful." });
});

export default router;
