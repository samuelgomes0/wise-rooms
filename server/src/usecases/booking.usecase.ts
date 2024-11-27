import { IBooking, IBookingCreateDTO } from "../interfaces/Booking.interface";
import { BookingRepository } from "../repositories/booking.repository";

export class BookingUseCase {
  private bookingRepository: BookingRepository;

  constructor(bookingRepository: BookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async listBookings(): Promise<IBooking[]> {
    return await this.bookingRepository.listBookings();
  }

  async findBookingById(bookingId: string): Promise<IBooking | null> {
    return await this.bookingRepository.findBookingById(bookingId);
  }

  async findBookingByUser(userId: string): Promise<IBooking[]> {
    return await this.bookingRepository.findBookingByUser(userId);
  }

  async createBooking({
    userId,
    roomId,
    date,
    startTime,
    endTime,
    description,
  }: IBookingCreateDTO): Promise<IBooking> {
    const hasConflict = await this.bookingRepository.checkConflict(
      roomId,
      date,
      startTime,
      endTime
    );

    if (hasConflict) {
      throw new Error("Booking conflict detected. Please choose another time.");
    }

    return await this.bookingRepository.createBooking({
      userId,
      roomId,
      date,
      startTime,
      endTime,
      description,
    });
  }

  async updateBooking(
    bookingId: string,
    booking: IBookingCreateDTO
  ): Promise<IBooking> {
    return await this.bookingRepository.updateBooking(bookingId, booking);
  }

  async deleteBooking(bookingId: string): Promise<IBooking> {
    return await this.bookingRepository.deleteBooking(bookingId);
  }
}
