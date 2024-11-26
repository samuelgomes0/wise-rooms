export interface IResource {
  id: number;
  name: string;
  type: string;
  quantity: number;
  description?: string;
  roomId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResourceCreateDTO {
  name: string;
  type: string;
  quantity: number;
  description?: string;
  roomId: number;
}

export interface IResourceRepository {
  getResources(): Promise<IResource[]>;
  getResourceById(resourceId: number): Promise<IResource | null>;
  createResource(data: IResourceCreateDTO): Promise<IResource>;
  updateResource(
    resourceId: number,
    data: IResourceCreateDTO
  ): Promise<IResource>;
  deleteResource(resourceId: number): Promise<IResource>;
}
