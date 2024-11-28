import { IRole, IRoleDTO } from "../interfaces";
import { RoleRepository } from "../repositories";

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
    const role = await this.roleRepository.createRole({ name, description });

    return role;
  }
}
