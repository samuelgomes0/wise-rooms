export type BookingsTableProps = {
  bookings: {
    id: string;
    room: string;
    guest: string;
    date: string;
    checkIn: string;
    checkOut: string;
    status: string;
  }[];
};
