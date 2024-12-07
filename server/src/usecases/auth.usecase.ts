import { IUserRepository } from "../interfaces/User.interface";
import { comparePasswords, generateToken } from "../utils";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthUseCase {
  private userRepository: IUserRepository;

  constructor(authRepository: IUserRepository) {
    this.userRepository = authRepository;
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    if (!user.password) {
      throw new Error("Senha não definida.");
    }

    const passwordMatch = await comparePasswords(user.password, password);

    if (!passwordMatch) {
      throw new Error("Senha incorreta.");
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined.");
    }

    const token = generateToken({ id: user.id });

    return { token };
  }

  async logout(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return { message: "Usuário deslogado." };
  }
}
