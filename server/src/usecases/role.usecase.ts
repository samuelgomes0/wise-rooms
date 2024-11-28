import { IRoleDTO } from "../interfaces/Role.interface";
import { RoleRepository } from "../repositories/role.repository";

export class RoleUseCase {
  private roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async listRoles() {
    return this.roleRepository.listRoles();
  }

  async createRole({ name, description }: IRoleDTO) {
    return this.roleRepository.createRole({ name, description });
  }
}
