import { User } from "@prisma/client";
import { AuditAction } from "./enums"; // Import enum if needed

export interface AuditLog {
  id: number;
  userId: number;
  action: AuditAction;
  timestamp: Date;
  details?: string;
  user?: User;
}
