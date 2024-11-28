// src/routes/rooms.ts
import { Router } from "express";
import { RoleRepository } from "../repositories/role.repository";
import { RoleUseCase } from "../usecases/role.usecase";

const router = Router();
const roleRepository = new RoleRepository();
const roleUseCase = new RoleUseCase(roleRepository);

// GET /roles
router.get("/", async (req, res) => {
  const rooms = await roleUseCase.listRoles();
  res.json(rooms);
});

// POST /roles
router.post("/", async (req, res) => {
  const data = req.body;
  const room = await roleUseCase.createRole(data);
  res.json(room);
});

export default router;
