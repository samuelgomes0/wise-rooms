import { Router } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserUseCase } from "../usecases/user.usecase";

const router = Router();
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

// POST /user/create
router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userUseCase.create({ name, email, password });

    const response = {
      message: "User created.",
      user,
    };

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

router.get("/", async (req, res) => {
  const { name } = req.query as { name: string };

  if (name) {
    try {
      const user = await userUseCase.findByName(name);

      const response = {
        message: "User found.",
        user,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  }

  try {
    const users = await userUseCase.getAll();

    const response = {
      message: "Users found.",
      users,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

router.put("/update", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userUseCase.update({ name, email, password });

    const response = {
      message: "User updated.",
      user,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

export default router;
