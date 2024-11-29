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

  async createResource(resource: IResourceDTO): Promise<IResource> {
    return this.resourceRepository.createResource(resource);
  }
}
