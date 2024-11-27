import { prisma } from "../database/prisma-client";
import {
  IBooking,
  IBookingCreateDTO,
  IBookingRepository,
} from "../interfaces/Booking.interface";

export class BookingRepository implements IBookingRepository {
  async listBookings(): Promise<IBooking[]> {
    return await prisma.booking.findMany();
  }

  async findBookingById(bookingId: string): Promise<IBooking | null> {
    return await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });
  }

  async findBookingByUser(userId: string): Promise<IBooking[]> {
    return await prisma.booking.findMany({
      where: {
        userId,
      },
    });
  }

  async createBooking({
    userId,
    roomId,
    date,
    startTime,
    endTime,
    description,
  }: IBookingCreateDTO): Promise<IBooking> {
    return await prisma.booking.create({
      data: {
        userId,
        roomId,
        date,
        startTime,
        endTime,
        description,
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

  async updateBooking(
    bookingId: string,
    { userId, roomId, date, startTime, endTime, description }: IBookingCreateDTO
  ): Promise<IBooking> {
    return await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        userId,
        roomId,
        date,
        startTime,
        endTime,
        description,
      },
    });
  }

  async deleteBooking(bookingId: string): Promise<IBooking> {
    return await prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });
  }
}
