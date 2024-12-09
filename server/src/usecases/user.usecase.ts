import { IUser, IUserCreateDTO } from "../interfaces/User.interface";
import { UserRepository } from "../repositories";
import { AppError, hashPassword } from "../utils";

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
      throw new AppError("USER_NOT_FOUND", "User not found.", 404);
    }

    const { password, ...userWithoutPasswordAndRoleId } = user;

    return userWithoutPasswordAndRoleId;
  }

  async findByEmail(email: string): Promise<Omit<IUser, "password"> | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("USER_NOT_FOUND", "User not found.", 404);
    }

    const { password, ...userWithoutPasswordAndRoleId } = user;

    return userWithoutPasswordAndRoleId;
  }

  async createUser({
    name,
    email,
    password,
    roleId,
  }: IUserCreateDTO): Promise<IUser> {
    const hashedPassword = await hashPassword(password);

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError("USER_ALREADY_EXISTS", "User already exists.", 400);
    }

    return await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      roleId,
    });
  }

  async updateUser({
    name,
    email,
    password,
    roleId,
  }: IUserCreateDTO): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("USER_NOT_FOUND", "User not found.", 404);
    }

    password ? await hashPassword(password) : user.password;

    return await this.userRepository.updateUser({
      ...user,
      name,
      email,
      password,
      roleId,
    });
  }

  async deleteUser(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("USER_NOT_FOUND", "User not found.", 404);
    }

    return await this.userRepository.deleteUser(id);
  }
}
