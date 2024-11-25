import { IUser } from "./User.interface";

export interface IAuthData {
  email: string;
  password: string;
}

export interface IAuthRepository {
  findUserByEmail(email: string): Promise<IUser>;
  login(data: IAuthData): Promise<string>;
  logout(): Promise<void>;
}
