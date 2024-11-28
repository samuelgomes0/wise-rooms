import apiServiceInstance from "./ApiService";

interface UserData {
  name: string;
  email: string;
  password: string;
}

class UserService {
  async listUsers() {
    return await apiServiceInstance.get("/users");
  }

  async findById(id: string) {
    return await apiServiceInstance.get(`/users/${id}`);
  }

  async findByEmail(email: string) {
    return await apiServiceInstance.get(`/users/email/${email}`);
  }

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
