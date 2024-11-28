import { AuditAction, AuditEntity } from "@prisma/client";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { AuditLogRepository } from "../repositories/auditLog.repository";
import { UserRepository } from "../repositories/user.repository";
import { AuditLogUseCase, UserUseCase } from "../usecases";

const router = Router();
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

const auditLogRepository = new AuditLogRepository();
const auditLogUseCase = new AuditLogUseCase(auditLogRepository);

// GET /users
router.get("/", async (req, res) => {
  try {
    const users = await userUseCase.listUsers();

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

// POST /users
router.post("/", isAuthenticated, async (req: any, res) => {
  const { name, email, password, roleId } = req.body;

  try {
    const user = await userUseCase.createUser({
      name,
      email,
      password,
      roleId,
    });

    const { id: performedBy } = req.user;

    await auditLogUseCase.createAuditLog({
      userId: performedBy,
      action: AuditAction.CREATE,
      entity: AuditEntity.USER,
      entityId: user.id,
    });

    return res.status(201).json({ message: "User created." });
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// PUT /users/:id
router.put("/:id", isAuthenticated, async (req: any, res) => {
  const { name, email, password, roleId } = req.body;

  try {
    const user = await userUseCase.updateUser({
      name,
      email,
      password,
      roleId,
    });

    const response = {
      message: "User updated.",
      user,
    };

    const { id: performedBy } = req.user;

    await auditLogUseCase.createAuditLog({
      userId: performedBy,
      action: AuditAction.UPDATE,
      entity: AuditEntity.USER,
      entityId: user.id,
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// DELETE /users/:id
router.delete("/:id", isAuthenticated, async (req: any, res) => {
  const id = req.params.id;

  try {
    await userUseCase.deleteUser(id);

    const { id: performedBy } = req.user;

    await auditLogUseCase.createAuditLog({
      userId: performedBy,
      action: AuditAction.DELETE,
      entity: AuditEntity.USER,
      entityId: id,
    });

    return res.status(200).json({
      message: "User deleted.",
    });
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

export default router;
