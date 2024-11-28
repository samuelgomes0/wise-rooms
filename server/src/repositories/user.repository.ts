import { prisma } from "../database/prisma-client";
import { IUser, IUserCreateDTO, IUserRepository } from "../interfaces";

export class UserRepository implements IUserRepository {
  async listUsers(): Promise<IUser[]> {
    return await prisma.user.findMany({
      include: {
        bookings: true,
        role: true,
      },
    });
  }

  async findById(id: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
        bookings: true,
      },
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        bookings: true,
      },
    });
  }

  async createUser({
    name,
    email,
    password,
    roleId,
  }: IUserCreateDTO): Promise<IUser> {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
        roleId,
      },
    });
  }

  async updateUser({
    name,
    email,
    password,
    roleId,
  }: IUserCreateDTO): Promise<IUser> {
    return await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        email,
        password,
        roleId,
      },
    });
  }

  async deleteUser(id: string): Promise<IUser> {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
