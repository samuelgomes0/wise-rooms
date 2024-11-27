import { prisma } from "../database/prisma-client";
import {
  IAuditLog,
  IAuditLogDTO,
  IAuditLogRepository,
} from "../interfaces/AuditLog.interface";

export class AuditLogRepository implements IAuditLogRepository {
  async listAuditLogs(): Promise<IAuditLog[]> {
    return await prisma.auditLog.findMany();
  }

  async createAuditLog({
    userId,
    action,
    entity,
    entityId,
  }: IAuditLogDTO): Promise<IAuditLog> {
    return await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
      },
    });
  }
}
