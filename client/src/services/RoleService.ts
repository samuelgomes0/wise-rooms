import apiServiceInstance from "./ApiService";

class RoleService {
  async listRoles() {
    return await apiServiceInstance.get("/roles");
  }
}

const roleServiceInstance = new RoleService();
export default roleServiceInstance;
