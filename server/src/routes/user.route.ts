import { Router } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserUseCase } from "../usecases/user.usecase";

const router = Router();
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

// GET /users
router.get("/", async (req, res) => {
  try {
    const users = await userUseCase.getAll();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// GET /users/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userUseCase.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// GET /users/email/:email
router.get("/email/:email", async (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({
      error: "The e-mail parameter is required.",
    });
  }

  try {
    const user = await userUseCase.findByEmail(email);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// POST /users/create
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
