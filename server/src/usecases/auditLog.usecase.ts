import { IAuditLog, IAuditLogDTO } from "../interfaces/AuditLog.interface";
import { AuditLogRepository } from "../repositories/auditLog.repository";

export class AuditLogUseCase {
  private auditLogRepository: AuditLogRepository;

  constructor(auditLogRepository: AuditLogRepository) {
    this.auditLogRepository = auditLogRepository;
  }

  async listAuditLogs(): Promise<IAuditLog[]> {
    return await this.auditLogRepository.listAuditLogs();
  }

  async createAuditLog({
    userId,
    action,
    entity,
  }: IAuditLogDTO): Promise<IAuditLog> {
    if (!userId || !action || !entity) {
      throw new Error("Missing required fields.");
    }

    return await this.auditLogRepository.createAuditLog({
      userId,
      action,
      entity,
    });
  }
}
