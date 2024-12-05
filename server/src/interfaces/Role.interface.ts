import { RoleName } from "@prisma/client";

export interface IRole {
  id: number;
  name: RoleName;
  users?: {
    id: string;
    email: string;
    name: string;
  }[];
  permissions?: {
    id: number;
    name: string;
  }[];
}

export interface IRoleRepository {
  listRoles(): Promise<IRole[]>;
  createRole(data: RoleName): Promise<IRole>;
}
