import { IBooking, IBookingCreateDTO } from "../interfaces/Booking.interface";
import { BookingRepository } from "../repositories";

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
      throw new Error(
        "Não foi possível concluir a criação da reserva. Já existe outra reserva para a mesma sala no horário selecionado."
      );
    }

    const booking = await this.bookingRepository.createBooking({
      userId,
      roomId,
      date,
      startTime,
      endTime,
      description,
    });

    this.bookingRepository.updateBookingStatus(booking.id, "CONFIRMED");

    return booking;
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

  async cancelBooking(bookingId: string, userId: string): Promise<IBooking> {
    const booking = await this.bookingRepository.findBookingById(bookingId);

    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (booking.userId !== userId) {
      throw new Error("Unauthorized: You can only cancel your own bookings.");
    }

    if (booking.status === "CANCELLED") {
      throw new Error("Booking is already cancelled.");
    }

    const now = new Date();
    if (booking.date < now) {
      throw new Error("Cannot cancel a booking for a past date.");
    }

    if (booking.status !== "PENDING" && booking.status !== "CONFIRMED") {
      throw new Error("Only pending or confirmed bookings can be cancelled.");
    }

    return await this.bookingRepository.updateBookingStatus(
      bookingId,
      "CANCELLED"
    );
  }
}
