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

  async getAll() {
    return await apiServiceInstance.get("/users");
  }

  async findByEmail(email: string) {
    return await apiServiceInstance.get(`/users/email?email=${email}`);
  }
}

const userServiceInstance = new UserService();
export default userServiceInstance;
