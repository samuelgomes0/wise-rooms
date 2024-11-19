import apiServiceInstance from "./ApiService";

interface BookingData {
  userId: string;
  roomId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
}

class BookingService {
  async create({ userId, roomId, date, startTime, endTime }: BookingData) {
    return await apiServiceInstance.post<void, BookingData>(
      "/bookings/create",
      {
        userId,
        roomId,
        date,
        startTime,
        endTime,
      }
    );
  }

  async getAll() {
    return await apiServiceInstance.get("/bookings");
  }
}

const bookingServiceInstance = new BookingService();
export default bookingServiceInstance;
