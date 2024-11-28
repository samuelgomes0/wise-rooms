import { IUser } from "./User.interface";

export interface IRole {
  id: number;
  name: string;
  description?: string | null;
  users?: IUser[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoleDTO {
  name: string;
  description?: string;
}

export interface IRoleRepository {
  listRoles(): Promise<IRole[]>;
  findRoleById(id: number): Promise<IRole | null>;
  createRole(data: IRoleDTO): Promise<IRole>;
}
