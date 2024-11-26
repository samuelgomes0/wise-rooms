import { IRoom, IRoomCreateDTO } from "../interfaces/Room.interface";
import { RoomRepository } from "../repositories/room.repository";

export class RoomUseCase {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async getRooms(): Promise<IRoom[]> {
    return await this.roomRepository.getRooms();
  }

  async getRoomById(roomId: number): Promise<IRoom | null> {
    return await this.roomRepository.getRoomById(roomId);
  }

  async createRoom(room: IRoomCreateDTO): Promise<IRoom> {
    return await this.roomRepository.createRoom(room);
  }

  async updateRoom(roomId: number, room: IRoomCreateDTO): Promise<IRoom> {
    return await this.roomRepository.updateRoom(roomId, room);
  }

  async deleteRoom(roomId: number): Promise<void> {
    return await this.roomRepository.deleteRoom(roomId);
  }
}
