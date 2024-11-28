import apiServiceInstance from "./ApiService";

interface RoomData {
  userId: string;
  roomId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
}

class RoomService {
  async listRooms() {
    return await apiServiceInstance.get("/rooms");
  }

  async createRoom({ userId, roomId, date, startTime, endTime }: RoomData) {
    return await apiServiceInstance.post<void, RoomData>("/rooms", {
      userId,
      roomId,
      date,
      startTime,
      endTime,
    });
  }
}

const roomServiceInstance = new RoomService();
export default roomServiceInstance;
