import { IBooking } from "./Booking.interface";
import { IResource } from "./Resource.interface";

export interface IRoom {
  id: number;
  name: string;
  location: string;
  capacity: number;
  description?: string;
  resources?: IResource[];
  bookings?: IBooking[];
}
