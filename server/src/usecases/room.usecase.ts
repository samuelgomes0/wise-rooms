import { IRoom, IRoomCreateDTO } from "../interfaces/Room.interface";
import { RoomRepository } from "../repositories";

export class RoomUseCase {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async getRooms(): Promise<IRoom[]> {
    return await this.roomRepository.listRooms();
  }

  async getRoomById(roomId: number): Promise<IRoom | null> {
    return await this.roomRepository.findRoomById(roomId);
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
