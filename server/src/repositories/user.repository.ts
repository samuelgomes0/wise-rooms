import { prisma } from "../database/prisma-client";
import {
  IUser,
  IUserCreateDTO,
  IUserRepository,
} from "../interfaces/User.interface";

export class UserRepository implements IUserRepository {
  async listUsers(): Promise<IUser[]> {
    return await prisma.user.findMany({
      include: {
        bookings: true,
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

  async createUser({ name, email, password }: IUserCreateDTO): Promise<IUser> {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: {
          connect: {
            name: "VIEWER",
          },
        },
      },
    });
  }

  async updateUser({ name, email, password }: IUserCreateDTO): Promise<IUser> {
    return await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        email,
        password,
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
