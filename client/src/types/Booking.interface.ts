import { IRoom } from "./Room.interface";
import { IUser } from "./User.interface";

export interface IBooking {
  id: string;
  user: IUser;
  room: IRoom;
  status: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
