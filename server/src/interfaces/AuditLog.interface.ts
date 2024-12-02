import { AuditAction, AuditEntity } from "@prisma/client";

export interface IAuditLog {
  id: number;
  userId: string;
  action: AuditAction;
  entity: AuditEntity;
  entityId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuditLogDTO {
  userId: string;
  action: AuditAction;
  entity: AuditEntity;
  entityId: string;
}

export interface IAuditLogRepository {
  listAuditLogs(): Promise<IAuditLog[]>;
  createAuditLog(data: IAuditLogDTO): Promise<IAuditLog>;
}
