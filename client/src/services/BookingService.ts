import { IBooking } from "@/types";
import apiServiceInstance from "./ApiService";

interface BookingData {
  userId: string;
  roomId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
}

class BookingService {
  async listBookings(): Promise<IBooking[]> {
    const bookings = await apiServiceInstance.get<IBooking[]>("/bookings");
    return bookings.data;
  }

  async findBookingsByUser(userId: string): Promise<IBooking[]> {
    const bookings = await apiServiceInstance.get<IBooking[]>(
      `/bookings/user/${userId}`
    );
    return bookings.data;
  }

  async createBooking({
    userId,
    roomId,
    date,
    startTime,
    endTime,
  }: BookingData) {
    return await apiServiceInstance.post<void, BookingData>("/bookings", {
      userId,
      roomId,
      date,
      startTime,
      endTime,
    });
  }

  async updateBooking({
    bookingId,
    userId,
    roomId,
    date,
    startTime,
    endTime,
  }: BookingData & { bookingId: number }) {
    return await apiServiceInstance.put<void, BookingData>(
      `/bookings/${bookingId}`,
      {
        userId,
        roomId,
        date,
        startTime,
        endTime,
      }
    );
  }

  async cancelBooking(bookingId: string) {
    return await apiServiceInstance.put(`/bookings/${bookingId}/cancel`);
  }
}

const bookingServiceInstance = new BookingService();
export default bookingServiceInstance;
