import { prisma } from "../database/prisma-client";
import {
  IRoom,
  IRoomCreateDTO,
  IRoomRepository,
} from "../interfaces/Room.interface";

export class RoomRepository implements IRoomRepository {
  async create({
    name,
    location,
    capacity,
    description,
  }: IRoomCreateDTO): Promise<IRoom> {
    return await prisma.room.create({
      data: {
        name,
        location,
        capacity,
        description,
      },
    });
  }
}
