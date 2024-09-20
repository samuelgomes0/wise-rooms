// src/usecases/ResourceUsecase.ts
import { IResource } from "../interfaces/IResource";
import { ResourceRepository } from "../repositories/ResourceRepository";

export class ResourceUsecase {
  private resourceRepository: ResourceRepository;

  constructor(resourceRepository: ResourceRepository) {
    this.resourceRepository = resourceRepository;
  }

  // Create a new resource
  async createResource(
    data: Omit<IResource, "id" | "createdAt" | "updatedAt">
  ): Promise<IResource> {
    return this.resourceRepository.create(data);
  }

  // Get all resources
  async getAllResources(): Promise<IResource[]> {
    return this.resourceRepository.findAll();
  }

  // Delete a resource
  async deleteResource(id: number): Promise<void> {
    await this.resourceRepository.delete(id);
  }
}
