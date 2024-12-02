import { IRole } from "@/types";
import apiServiceInstance from "./ApiService";

class RoleService {
  async listRoles(): Promise<IRole[]> {
    const roles = await apiServiceInstance.get<IRole[]>("/roles");
    return roles.data;
  }
}

const roleServiceInstance = new RoleService();
export default roleServiceInstance;
