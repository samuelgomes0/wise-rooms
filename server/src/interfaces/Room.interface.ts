import { IBooking } from "./Booking.interface";
import { IResource } from "./Resource.interface";

export interface IRoom {
  id: number;
  name: string;
  capacity: number;
  description?: string | null;
  resources?: IResource[];
  bookings?: IBooking[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoomCreateDTO {
  name: string;
  capacity: number;
  description?: string | null;
}

export interface IRoomRepository {
  listRooms(): Promise<IRoom[]>;
  findRoomById(roomId: number): Promise<IRoom | null>;
  createRoom(room: IRoomCreateDTO): Promise<IRoom>;
  updateRoom(roomId: number, room: IRoomCreateDTO): Promise<IRoom>;
  deleteRoom(roomId: number): Promise<void>;
}
