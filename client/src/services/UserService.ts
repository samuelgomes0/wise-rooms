import { IUser } from "@/types";
import apiServiceInstance from "./ApiService";

interface UserData {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

class UserService {
  async listUsers(): Promise<IUser[]> {
    const users = await apiServiceInstance.get<IUser[]>("/users");
    return users.data;
  }

  async findById(id: string) {
    return await apiServiceInstance.get(`/users/${id}`);
  }

  async findByEmail(email: string) {
    return await apiServiceInstance.get(`/users/email/${email}`);
  }

  async createUser({ name, email, password, roleId }: UserData) {
    return await apiServiceInstance.post<void, UserData>("/users", {
      name,
      email,
      password,
      roleId,
    });
  }

  async deleteUser(id: string) {
    return await apiServiceInstance.delete(`/users/${id}`);
  }
}

const userServiceInstance = new UserService();
export default userServiceInstance;
