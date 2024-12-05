import { PermissionName } from "@prisma/client";
import { prisma } from "../database/prisma-client";
import {
  IPermission,
  IPermissionRepository,
} from "../interfaces/Permission.interface";

class PermissionRepository implements IPermissionRepository {
  async listPermissions(): Promise<IPermission[]> {
    const permissions = await prisma.permission.findMany({
      select: {
        id: true,
        name: true,
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    return permissions;
  }

  async createPermission(name: PermissionName) {
    await prisma.permission.create({
      data: {
        name,
      },
      include: {
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async assignPermissionToRole(permissionId: number, roleId: number) {
    await prisma.permission.update({
      where: {
        id: permissionId,
      },
      data: {
        roles: {
          connect: {
            id: roleId,
          },
        },
      },
    });
  }
}

export default PermissionRepository;
