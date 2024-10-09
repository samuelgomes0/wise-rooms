export type TBookingsTableProps = {
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
