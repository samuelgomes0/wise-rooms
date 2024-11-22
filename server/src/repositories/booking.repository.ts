import { prisma } from "../database/prisma-client";
import {
  IBooking,
  IBookingCreateDTO,
  IBookingRepository,
} from "../interfaces/Booking.interface";

export class BookingRepository implements IBookingRepository {
  async createBooking({
    userId,
    roomId,
    date,
    startTime,
    endTime,
  }: IBookingCreateDTO): Promise<IBooking> {
    return await prisma.booking.create({
      data: {
        userId,
        roomId,
        date,
        startTime,
        endTime,
      },
    });
  }

  async checkConflict(
    roomId: number,
    date: Date,
    startTime: Date,
    endTime: Date
  ): Promise<boolean> {
    const conflict = await prisma.booking.findFirst({
      where: {
        roomId,
        date,
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

  async getAll(): Promise<IBooking[]> {
    return await prisma.booking.findMany({
      include: {
        user: true,
        room: true,
      },
    });
  }
}
