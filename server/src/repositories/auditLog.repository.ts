import { prisma } from "../database/prisma-client";
import { IAuditLogRepository, IAuditLog, IAuditLogDTO } from "../interfaces";

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
