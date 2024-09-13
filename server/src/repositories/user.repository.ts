import { prisma } from "../database/prisma-client";
import {
  IUser,
  IUserCreateDTO,
  IUserRepository,
} from "../interfaces/IUser.interface";

export class UserRepository implements IUserRepository {
  async create({ name, email, password }: IUserCreateDTO): Promise<IUser> {
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

  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });
  }

  async update({ name, email, password }: IUserCreateDTO): Promise<IUser> {
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

  async delete(id: string): Promise<IUser> {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
