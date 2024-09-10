import { prisma } from "../database/prisma-client";
import {
  CreateUserDTO,
  User,
  UsersRepository,
} from "../interfaces/User.interface";

export class UsersRepositoryPrisma implements UsersRepository {
  async createUser(data: CreateUserDTO): Promise<User> {
    const viewerRole = await prisma.role.findUnique({
      where: {
        name: "VIEWER_USER",
      },
    });

    if (!viewerRole) {
      throw new Error("Viewer role not found.");
    }

    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        roleId: viewerRole.id,
      },
    });
  }

  async deleteUser(email: string): Promise<User | null> {
    return await prisma.user.delete({
      where: {
        email,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }
}
