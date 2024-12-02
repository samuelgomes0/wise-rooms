// src/routes/rooms.ts
import { Router } from "express";
import { z } from "zod";
import { ApiError } from "../interfaces";
import { RoleRepository } from "../repositories/role.repository";
import { RoleUseCase } from "../usecases";

const router = Router();
const roleRepository = new RoleRepository();
const roleUseCase = new RoleUseCase(roleRepository);

// GET /roles
router.get("/", async (request, reply) => {
  try {
    const roles = await roleUseCase.listRoles();
    return reply.status(200).send(roles);
  } catch (error) {
    const { code, message, statusCode } = error as ApiError;
    return reply.status(statusCode).send({ code, message, statusCode });
  }
});

// POST /roles
router.post("/", async (request, reply) => {
  const createRoleSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
  });

  const { name, description } = createRoleSchema.parse(request.body);

  try {
    await roleUseCase.createRole({ name, description });
    return reply.status(201).send({ success: true });
  } catch (error) {
    const { code, message, statusCode } = error as ApiError;
    return reply.status(statusCode).send({ code, message, statusCode });
  }
});

export default router;
