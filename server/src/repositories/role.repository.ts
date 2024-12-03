import { prisma } from "../database/prisma-client";
import { IRole, IRoleDTO, IRoleRepository } from "../interfaces";

export class RoleRepository implements IRoleRepository {
  async listRoles(): Promise<IRole[]> {
    return await prisma.role.findMany();
  }

  async findRoleById(id: number): Promise<IRole | null> {
    return await prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  async createRole({ name }: IRoleDTO): Promise<IRole> {
    return await prisma.role.create({
      data: {
        name,
      },
    });
  }
}
