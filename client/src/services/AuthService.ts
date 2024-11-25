import apiServiceInstance from "./ApiService";

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

class AuthService {
  async signIn({ email, password }: SignInData) {
    return await apiServiceInstance.post<{ token: string; user: UserData }>(
      "/auth/signin",
      {
        email,
        password,
      }
    );
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
