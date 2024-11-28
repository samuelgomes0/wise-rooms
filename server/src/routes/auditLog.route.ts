import { Router } from "express";
import { AuditLogRepository } from "../repositories/auditLog.repository";
import { AuditLogUseCase } from "../usecases";

const router = Router();
const auditLogRepository = new AuditLogRepository();
const auditLogUseCase = new AuditLogUseCase(auditLogRepository);

// GET /auditLogs
router.get("/", async (req, res) => {
  try {
    const auditLogs = await auditLogUseCase.listAuditLogs();

    return res.status(200).json(auditLogs);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// POST /auditLogs
router.post("/", async (req, res) => {
  const { userId, action, entity, entityId } = req.body;

  if (!userId || !action || !entity || !entityId) {
    return res.status(400).json({
      error: "userId, action, entity, and entityId are required.",
    });
  }

  try {
    const auditLog = await auditLogUseCase.createAuditLog({
      userId,
      action,
      entity,
      entityId,
    });

    return res.status(201).json(auditLog);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

export default router;
