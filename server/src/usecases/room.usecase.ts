import { IRoom, IRoomCreateDTO } from "../interfaces/Room.interface";
import { RoomRepository } from "../repositories";
import { AppError } from "../utils";

export class RoomUseCase {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async getRooms(): Promise<IRoom[]> {
    const rooms = await this.roomRepository.listRooms();

    return rooms;
  }

  async getRoomById(roomId: number): Promise<IRoom | null> {
    const room = await this.roomRepository.findRoomById(roomId);

    if (!room) {
      throw new AppError("ROOM_NOT_FOUND", "Room not found.", 404);
    }

    return room;
  }

  async createRoom(room: IRoomCreateDTO): Promise<IRoom> {
    return await this.roomRepository.createRoom(room);
  }

  async updateRoom(roomId: number, room: IRoomCreateDTO): Promise<IRoom> {
    const roomExists = await this.roomRepository.findRoomById(roomId);

    if (!roomExists) {
      throw new AppError("ROOM_NOT_FOUND", "Room not found.", 404);
    }

    return await this.roomRepository.updateRoom(roomId, room);
  }

  async deleteRoom(roomId: number): Promise<void> {
    const room = await this.roomRepository.findRoomById(roomId);

    if (!room) {
      throw new AppError("ROOM_NOT_FOUND", "Room not found.", 404);
    }

    await this.roomRepository.deleteRoom(roomId);
  }
}
