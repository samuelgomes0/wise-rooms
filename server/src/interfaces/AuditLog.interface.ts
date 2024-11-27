export interface IAuditLog {
  id: number;
  userId: string;
  action: AuditLogAction;
  entity: AuditLogEntity;
  entityId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuditLogDTO {
  userId: string;
  action: AuditLogAction;
  entity: AuditLogEntity;
  entityId: string;
}

export type AuditLogAction = "CREATE" | "UPDATE" | "DELETE";
export type AuditLogEntity = "USER" | "ROOM" | "BOOKING" | "RESOURCE";

export interface IAuditLogRepository {
  listAuditLogs(): Promise<IAuditLog[]>;
  createAuditLog(data: IAuditLogDTO): Promise<IAuditLog>;
}
