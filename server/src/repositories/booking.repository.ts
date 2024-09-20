import { prisma } from "../database/prisma-client";
import {
  IBooking,
  IBookingCreateDTO,
  IBookingRepository,
} from "../interfaces/IBooking.interface";

export class BookingRepository implements IBookingRepository {
  async createBooking({
    userId,
    roomId,
    bookingDate,
    startTime,
    endTime,
  }: IBookingCreateDTO): Promise<IBooking> {
    return await prisma.booking.create({
      data: {
        userId,
        roomId,
        bookingDate,
        startTime,
        endTime,
      },
    });
  }

  async findBookingByRoomAndDate(
    roomId: number,
    bookingDate: Date,
    startTime: Date,
    endTime: Date
  ): Promise<IBooking[]> {
    return await prisma.booking.findMany({
      where: {
        roomId,
        bookingDate,
        startTime,
        endTime,
      },
    });
  }
}
