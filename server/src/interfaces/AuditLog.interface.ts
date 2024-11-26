import { AuditAction, AuditEntity } from "@prisma/client";

export interface IAuditLog {
  id: number;
  userId: number;
  action: AuditAction;
  entity: AuditEntity;
  entityId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuditLogDTO {
  userId: number;
  action: AuditAction;
  entity: AuditEntity;
  entityId: number;
}

export interface IAuditRepository {
  listAuditLogs(): Promise<IAuditLog[]>;
  createAuditLog(data: IAuditLogDTO): Promise<IAuditLog>;
}
