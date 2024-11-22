import { EResourceType } from "./enums/EResourceType.enum";

export interface IResource {
  id: number;
  name: string;
  type: EResourceType;
  quantity: number;
  description?: string;
  roomId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResourceCreateDTO {
  name: string;
  type: EResourceType;
  quantity: number;
  description?: string;
  roomId: number;
}

export interface IResourceRepository {
  create(data: IResourceCreateDTO): Promise<IResource>;
}
