import jwt from "jsonwebtoken";
import { IUserRepository } from "../interfaces/User.interface";
import { comparePasswords } from "../utils";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthUseCase {
  private userRepository: IUserRepository;

  constructor(authRepository: IUserRepository) {
    this.userRepository = authRepository;
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    const passwordMatch = await comparePasswords(user.password, password);

    if (!passwordMatch) {
      throw new Error("Invalid password.");
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined.");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token };
  }

  async logout(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    return { message: "User logged out" };
  }
}
