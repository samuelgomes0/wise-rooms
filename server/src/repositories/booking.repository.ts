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

  async checkConflict(
    roomId: number,
    bookingDate: Date,
    startTime: Date,
    endTime: Date
  ): Promise<boolean> {
    const conflict = await prisma.booking.findFirst({
      where: {
        roomId,
        bookingDate,
        OR: [
          {
            startTime: {
              lt: endTime,
            },
            endTime: {
              gt: startTime,
            },
          },
        ],
      },
    });

    return !!conflict; // Retorna `true` se houver conflito
  }
}
