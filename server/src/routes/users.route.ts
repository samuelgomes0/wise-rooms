import { Router } from "express";
import { UsersUseCase } from "../usecases/users.usecase";

const router = Router();
const usersUseCase = new UsersUseCase();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "E-mail is required" });
  }

  try {
    const user = await usersUseCase.create({
      name,
      email,
      password,
    });

    return res.status(201).json(user);
  } catch (error: any) {
    if (error.message === "USER_ALREADY_EXISTS") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await usersUseCase.delete(email);

    return res.status(200).json(user);
  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await usersUseCase.findUserByEmail(email);

    return res.status(200).json(user);
  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await usersUseCase.getAllUsers();

    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
