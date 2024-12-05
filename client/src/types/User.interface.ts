import { IBooking } from "./Booking.interface";

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: {
    id: string;
    name: string;
  };
  bookings?: IBooking[];
  auditLog?: {
    id: string;
    userId: string;
    action: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
