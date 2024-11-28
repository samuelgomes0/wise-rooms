// src/routes/rooms.ts
import { Router } from "express";
import { z } from "zod";
import { RoleRepository } from "../repositories/role.repository";
import { RoleUseCase } from "../usecases/role.usecase";

const router = Router();
const roleRepository = new RoleRepository();
const roleUseCase = new RoleUseCase(roleRepository);

// GET /roles
router.get("/", async (request, reply) => {
  const roles = await roleUseCase.listRoles();
  return reply.status(200).send(roles);
});

// POST /roles
router.post("/", async (request, reply) => {
  const createRoleSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
  });

  const { name, description } = createRoleSchema.parse(request.body);

  await roleUseCase.createRole({ name, description });

  return reply.status(201).send({ message: "Role created." });
});

export default router;
