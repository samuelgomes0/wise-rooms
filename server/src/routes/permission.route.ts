import { Router } from "express";
import PermissionRepository from "../repositories/permission.repository";

const router = Router();

const permissionRepository = new PermissionRepository();

// GET /permissions
router.get("/", async (req, res) => {
  const permissions = await permissionRepository.listPermissions();

  res.json(permissions);
});

export default router;
