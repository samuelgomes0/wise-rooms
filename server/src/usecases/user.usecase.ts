import { prisma } from "../database/prisma-client";
import { IUser, IUserCreateDTO } from "../interfaces/IUser.interface";
import { UserRepository } from "../repositories/user.repository";
import { hashPassword } from "../utils";

export class UserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create({ name, email, password }: IUserCreateDTO): Promise<IUser> {
    const hashedPassword = await hashPassword(password);

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error("User already exists.");
    }

    const viewerRole = await prisma.role.findUnique({
      where: {
        name: "VIEWER",
      },
    });

    if (!viewerRole) {
      throw new Error("Role not found.");
    }

    return await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async findByEmail(
    email: string
  ): Promise<Omit<IUser, "password" | "roleId"> | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    const { password, roleId, ...userWithoutPasswordAndRoleId } = user;

    return userWithoutPasswordAndRoleId;
  }

  async findByName(
    name: string
  ): Promise<Omit<IUser, "password" | "roleId"> | null> {
    const user = await this.userRepository.findByName(name);

    if (!user) {
      throw new Error("User not found.");
    }

    const { password, roleId, ...userWithoutPasswordAndRoleId } = user;

    return userWithoutPasswordAndRoleId;
  }

  async getAll(): Promise<Omit<IUser, "password" | "roleId">[]> {
    const users = await this.userRepository.getAll();

    return users.map((user) => {
      const { password, roleId, ...userWithoutPasswordAndRoleId } = user;

      return userWithoutPasswordAndRoleId;
    });
  }

  async update({ name, email, password }: IUserCreateDTO): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    password ? await hashPassword(password) : user.password;

    return await this.userRepository.update({
      ...user,
      name,
      email,
      password,
    });
  }

  async delete(id: string): Promise<IUser> {
    return await this.userRepository.delete(id);
  }
}
