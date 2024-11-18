import { IBooking, IBookingCreateDTO } from "../interfaces/IBooking.interface";
import { BookingRepository } from "../repositories/booking.repository";

export class BookingUseCase {
  private bookingRepository: BookingRepository;

  constructor(bookingRepository: BookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async createBooking({
    userId,
    roomId,
    bookingDate,
    startTime,
    endTime,
  }: IBookingCreateDTO): Promise<IBooking> {
    const hasConflict = await this.bookingRepository.checkConflict(
      roomId,
      bookingDate,
      startTime,
      endTime
    );

    if (hasConflict) {
      throw new Error("Booking conflict detected. Please choose another time.");
    }

    return await this.bookingRepository.createBooking({
      userId,
      roomId,
      bookingDate,
      startTime,
      endTime,
    });
  }
}
