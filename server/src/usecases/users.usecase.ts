import { prisma } from "../database/prisma-client";
import { CreateUserDTO, UsersRepository } from "../interfaces/User.interface";
import { UsersRepositoryPrisma } from "../repositories/users.repository";
import { hashPassword } from "../utils";

export class UsersUseCase {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepositoryPrisma();
  }

  async create({ name, email, password }: CreateUserDTO) {
    const verifyIfUserExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (verifyIfUserExists) {
      throw new Error("USER_ALREADY_EXISTS");
    }

    password = await hashPassword(password);

    const user = await this.userRepository.createUser({
      name,
      email,
      password,
    });

    return user;
  }

  async delete(email: string) {
    const verifyIfUserExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!verifyIfUserExists) {
      throw new Error("USER_NOT_FOUND");
    }

    const deletedUser = await this.userRepository.deleteUser(email);

    return deletedUser;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();

    return users;
  }
}
