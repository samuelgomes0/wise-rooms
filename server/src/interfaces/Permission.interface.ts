import { RoleName } from "@prisma/client";

interface IPermission {
  id: number;
  name: string;
  roles: {
    name: RoleName;
  }[];
}

interface IPermissionRepository {
  listPermissions(): Promise<IPermission[]>;
  createPermission(name: string): void;
  assignPermissionToRole(permissionId: number, roleId: number): void;
}

export { IPermission, IPermissionRepository };
