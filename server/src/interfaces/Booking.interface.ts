export interface IBooking {
  id: string;
  userId: string;
  roomId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: TBookingStatus;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookingCreateDTO {
  userId: string;
  roomId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  description: string | null;
}

export type TBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";

export interface IBookingRepository {
  listBookings(): Promise<IBooking[]>;
  findBookingById(bookingId: string): Promise<IBooking | null>;
  findBookingByUser(userId: string): Promise<IBooking[]>;
  createBooking(booking: IBookingCreateDTO): Promise<IBooking>;
  updateBooking(
    bookingId: string,
    booking: IBookingCreateDTO
  ): Promise<IBooking>;
  deleteBooking(bookingId: string): Promise<IBooking>;
}
