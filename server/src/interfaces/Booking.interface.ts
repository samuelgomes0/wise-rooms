export interface IBooking {
  id: string;
  userId: string;
  roomId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookingCreateDTO {
  userId: string;
  roomId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
}

export interface IBookingRepository {
  createBooking(booking: IBookingCreateDTO): Promise<IBooking>;
  getAll(): Promise<IBooking[]>;
}
