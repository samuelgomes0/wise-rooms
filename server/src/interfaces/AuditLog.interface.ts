export interface IAuditLog {
  id: number;
  userId: string;
  entityName: string;
  entityId: string;
  action: EAuditAction;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuditLogCreateDTO {
  userId: string;
  entityName: string;
  entityId: string;
  action: EAuditAction;
}
