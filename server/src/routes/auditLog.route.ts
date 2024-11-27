import { Router } from "express";
import { AuditLogRepository } from "../repositories/auditLog.repository";
import { AuditLogUseCase } from "../usecases/auditLog.usecase";

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
  try {
    const { userId, action, entity } = req.body;

    const auditLog = await auditLogUseCase.createAuditLog({
      userId,
      action,
      entity,
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
