import { IBooking } from "./Booking.interface";
import IRole from "./Role.interface";

export interface IUser {
  id: string;
  name: string;
  email: string;
  roleId: number;
  role: IRole;
  bookings?: IBooking[];
}
