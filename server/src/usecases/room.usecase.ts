import { IRoom, IRoomCreateDTO } from "../interfaces/IRoom.interface";
import { RoomRepository } from "../repositories/room.repository";

export class RoomUseCase {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async createRoom({
    name,
    location,
    capacity,
    description,
  }: IRoomCreateDTO): Promise<IRoom> {
    return await this.roomRepository.create({
      name,
      location,
      capacity,
      description,
    });
  }
}
