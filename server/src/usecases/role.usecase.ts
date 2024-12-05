import { RoleName } from "@prisma/client";
import { IRole } from "../interfaces";
import { RoleRepository } from "../repositories";
import AppError from "../utils/errorHandling";

export class RoleUseCase {
  private roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async listRoles(): Promise<Omit<IRole, "createdAt" | "updatedAt">[]> {
    const roles = await this.roleRepository.listRoles();

    return roles.map((role) => {
      const { ...roleWithoutCreatedAtAndUpdatedAt } = role;

      return roleWithoutCreatedAtAndUpdatedAt;
    });
  }

  async createRole(name: string): Promise<IRole> {
    const roles = await this.listRoles();

    for (const role of roles) {
      if (role.name === name)
        throw new AppError("ROLE_ALREADY_EXISTS", "Role already exists.", 400);
    }

    return await this.roleRepository.createRole(name as RoleName);
  }
}
