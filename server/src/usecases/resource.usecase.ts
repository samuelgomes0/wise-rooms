import { IResource } from "../interfaces/Resource.interface";
import { ResourceRepository } from "../repositories/resource.repository";

export class ResourceUsecase {
  private resourceRepository: ResourceRepository;

  constructor(resourceRepository: ResourceRepository) {
    this.resourceRepository = resourceRepository;
  }

  async createResource(resource: IResource) {
    return this.resourceRepository.createResource(resource);
  }

  async getResources() {
    return this.resourceRepository.getResources();
  }
}
