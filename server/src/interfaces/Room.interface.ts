import { IBooking } from "./Booking.interface";
import { IResource } from "./Resource.interface";

export interface IRoom {
  id: number;
  name: string;
  location: string;
  capacity: number;
  description?: string | null;
  resources?: IResource[];
  bookings?: IBooking[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoomCreateDTO {
  name: string;
  location: string;
  capacity: number;
  description?: string | null;
}

export interface IRoomRepository {
  create(room: IRoomCreateDTO): Promise<IRoom>;
}
