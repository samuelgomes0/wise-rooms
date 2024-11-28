import { IResourceRepository } from "../interfaces/Resource.interface";

export class ResourceRepository implements IResourceRepository {
  public async getResources(): Promise<any> {
    return [];
  }

  public async getResourceById(resourceId: number): Promise<any> {
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
