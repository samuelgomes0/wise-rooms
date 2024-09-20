import apiServiceInstance from "./ApiService";

interface UserData {
  name: string;
  email: string;
  password: string;
}

class UserService {
  async create({ name, email, password }: UserData) {
    return await apiServiceInstance.post<void, UserData>("/users/create", {
      name,
      email,
      password,
    });
  }
}

const userServiceInstance = new UserService();
export default userServiceInstance;
