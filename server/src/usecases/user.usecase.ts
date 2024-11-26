import { prisma } from "../database/prisma-client";
import { IUser, IUserCreateDTO } from "../interfaces/User.interface";
import { UserRepository } from "../repositories/user.repository";
import { hashPassword } from "../utils";

export class UserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async listUsers(): Promise<Omit<IUser, "password">[]> {
    const users = await this.userRepository.listUsers();

    return users.map((user) => {
      const { password, ...userWithoutPasswordAndRoleId } = user;

      return userWithoutPasswordAndRoleId;
    });
  }

  async findById(id: string): Promise<Omit<IUser, "password"> | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    const { password, ...userWithoutPasswordAndRoleId } = user;

    return userWithoutPasswordAndRoleId;
  }

  async findByEmail(email: string): Promise<Omit<IUser, "password"> | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    const { password, ...userWithoutPasswordAndRoleId } = user;

    return userWithoutPasswordAndRoleId;
  }

  async createUser({ name, email, password }: IUserCreateDTO): Promise<IUser> {
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

    return await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
  }

  async updateUser({ name, email, password }: IUserCreateDTO): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    password ? await hashPassword(password) : user.password;

    return await this.userRepository.updateUser({
      ...user,
      name,
      email,
      password,
    });
  }

  async deleteUser(id: string): Promise<IUser> {
    return await this.userRepository.deleteUser(id);
  }
}
