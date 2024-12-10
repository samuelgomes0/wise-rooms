import { IRoom } from "./Room.interface";
import IUser from "./User.interface";

export interface IBooking {
  id: string;
  userId: string;
  roomId: number;
  date: Date;
  startTime: Date | string;
  endTime: Date | string;
  status: TBookingStatus;
  description?: string;
  user: IUser;
  room: IRoom;
}

export type TBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";
