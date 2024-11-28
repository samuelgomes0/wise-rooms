import { IResourceRepository } from "../interfaces";

export class ResourceRepository implements IResourceRepository {
  public async listResources(): Promise<any> {
    return [];
  }

  public async findResourceById(resourceId: number): Promise<any> {
    return null;
  }

  public async createResource(data: any): Promise<any> {
    return data;
  }

  public async updateResource(resourceId: number, data: any): Promise<any> {
    return data;
  }

  public async deleteResource(resourceId: number): Promise<any> {
    return null;
  }
}
