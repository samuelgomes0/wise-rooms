import { IResource, IResourceDTO } from "../interfaces";
import { ResourceRepository } from "../repositories";

export class ResourceUseCase {
  private resourceRepository: ResourceRepository;

  constructor(resourceRepository: ResourceRepository) {
    this.resourceRepository = resourceRepository;
  }

  async listResources(): Promise<IResource[]> {
    return this.resourceRepository.listResources();
  }

  async createResource({
    name,
    quantity,
    roomId,
    description,
  }: IResourceDTO): Promise<IResource> {
    return await this.resourceRepository.createResource({
      name,
      quantity,
      roomId,
      description,
    });
  }

  async deleteResource(id: number) {
    return await this.resourceRepository.deleteResource(id);
  }
}
