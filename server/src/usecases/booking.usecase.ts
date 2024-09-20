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
    const bookingOnSameTime =
      await this.bookingRepository.findBookingByRoomAndDate(
        roomId,
        bookingDate,
        startTime,
        endTime
      );

    if (bookingOnSameTime) {
      throw new Error("Booking already exists");
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
