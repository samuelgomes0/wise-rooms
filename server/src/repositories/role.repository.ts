import { RoleName } from "@prisma/client";
import { prisma } from "../database/prisma-client";
import { IRole, IRoleRepository } from "../interfaces";

export class RoleRepository implements IRoleRepository {
  async listRoles(): Promise<IRole[]> {
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        users: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        permissions: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return roles;
  }

  async createRole(name: RoleName): Promise<IRole> {
    const role = await prisma.role.create({
      data: {
        name,
      },
    });

    return role;
  }
}
