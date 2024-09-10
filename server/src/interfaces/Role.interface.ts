import { Permission, User } from "@prisma/client";
import { RoleType } from "./enums"; // Import the RoleType enum if needed

export interface Role {
  id: number;
  name: RoleType;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  permissions?: Permission[];
  users?: User[];
}
