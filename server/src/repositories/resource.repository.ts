import { prisma } from "../database/prisma-client";
import { IResource, IResourceDTO, IResourceRepository } from "../interfaces";

export class ResourceRepository implements IResourceRepository {
  public async listResources(): Promise<IResource[]> {
    return await prisma.resource.findMany({
      include: {
        room: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async findResourceById(resourceId: number): Promise<any> {
    return null;
  }

  public async createResource({
    name,
    type,
    quantity,
    roomId,
    description,
  }: IResourceDTO): Promise<IResource> {
    return await prisma.resource.create({
      data: {
        name,
        type,
        quantity,
        roomId,
        description,
      },
    });
  }

  public async updateResource(
    resourceId: number,
    data: any
  ): Promise<IResource> {
    return data;
  }

  public async deleteResource(id: number): Promise<IResource> {
    return await prisma.resource.delete({
      where: {
        id,
      },
    });
  }
}
