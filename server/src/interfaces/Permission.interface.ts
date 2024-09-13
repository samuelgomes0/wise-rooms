import { Role } from "@prisma/client";
import { PermissionType, ScopeType } from "./enums";

export interface Permission {
  id: number;
  roleId: number;
  permission: PermissionType;
  scope: ScopeType;
  createdAt: Date;
  updatedAt: Date;
  role?: Role;
}
