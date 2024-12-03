import { IResource } from "@/types/Resource.interface";
import apiServiceInstance from "./ApiService";

interface ResourceData {
  name: string;
  quantity: number;
  roomId: number;
  description?: string;
}

class ResourceService {
  async listResources() {
    const { data } = await apiServiceInstance.get<IResource[]>("/resources");
    return data;
  }

  async createResource({ name, quantity, roomId, description }: ResourceData) {
    return await apiServiceInstance.post("/resources", {
      name,
      quantity,
      roomId,
      description,
    });
  }

  async deleteResource(resourceId: number) {
    return await apiServiceInstance.delete(`/resources/${resourceId}`);
  }
}

const resourceServiceInstance = new ResourceService();
export default resourceServiceInstance;
