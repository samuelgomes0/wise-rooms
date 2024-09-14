interface RoomReservation {
  id: string;
  room: string;
  startTime: Date;
  endTime: Date;
  status: string;
  capacity: number;
}

export const reservations: RoomReservation[] = [
  {
    id: "1",
    room: "Room 1",
    startTime: new Date("2021-10-01T09:00:00"),
    endTime: new Date("2021-10-01T10:00:00"),
    status: "Booked",
    capacity: 4,
  },
  {
    id: "2",
    room: "Room 2",
    startTime: new Date("2021-10-01T10:00:00"),
    endTime: new Date("2021-10-01T11:00:00"),
    status: "Booked",
    capacity: 4,
  },
  {
    id: "3",
    room: "Room 3",
    startTime: new Date("2021-10-01T11:00:00"),
    endTime: new Date("2021-10-01T12:00:00"),
    status: "Booked",
    capacity: 4,
  },
  {
    id: "4",
    room: "Room 4",
    startTime: new Date("2021-10-01T12:00:00"),
    endTime: new Date("2021-10-01T13:00:00"),
    status: "Booked",
    capacity: 4,
  },
  {
    id: "5",
    room: "Room 5",
    startTime: new Date("2021-10-01T13:00:00"),
    endTime: new Date("2021-10-01T14:00:00"),
    status: "Booked",
    capacity: 4,
  },
  {
    id: "6",
    room: "Room 6",
    startTime: new Date("2021-10-01T14:00:00"),
    endTime: new Date("2021-10-01T15:00:00"),
    status: "Booked",
    capacity: 4,
  },
  {
    id: "7",
    room: "Room 7",
    startTime: new Date("2021-10-01T15:00:00"),
    endTime: new Date("2021-10-01T16:00:00"),
    status: "Booked",
    capacity: 4,
  },
];
