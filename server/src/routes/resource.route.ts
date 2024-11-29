import { AuditAction, AuditEntity } from "@prisma/client";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { AuditLogRepository, ResourceRepository } from "../repositories";
import { AuditLogUseCase, ResourceUseCase } from "../usecases";

const router = Router();
const resourceRepository = new ResourceRepository();
const resourceUseCase = new ResourceUseCase(resourceRepository);

const auditLogRepository = new AuditLogRepository();
const auditLogUseCase = new AuditLogUseCase(auditLogRepository);

// GET /auditLogs
router.get("/", async (req, res) => {
  try {
    const auditLogs = await resourceUseCase.listResources();

    return res.status(200).json(auditLogs);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// POST /auditLogs
router.post("/", isAuthenticated, async (req: any, res) => {
  const { name, type, quantity, roomId, description } = req.body;

  try {
    const resource = await resourceUseCase.createResource({
      name,
      type,
      quantity,
      roomId,
      description,
    });

    const { id: performedBy } = req.user;

    await auditLogUseCase.createAuditLog({
      userId: performedBy,
      action: AuditAction.CREATE,
      entity: AuditEntity.USER,
      entityId: String(resource.id),
    });

    return res.status(201).json({ message: "Resource created." });
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

export default router;
