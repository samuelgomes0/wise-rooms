import { IRole, IRoleDTO } from "../interfaces";
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
      const { createdAt, updatedAt, ...roleWithoutCreatedAtAndUpdatedAt } =
        role;

      return roleWithoutCreatedAtAndUpdatedAt;
    });
  }

  async createRole({ name, description }: IRoleDTO): Promise<IRole> {
    const roles = await this.listRoles();

    for (const role of roles) {
      if (role.name === name)
        throw new AppError("ROLE_ALREADY_EXISTS", "Role already exists.", 400);
    }

    const role = await this.roleRepository.createRole({ name, description });

    return role;
  }
}
