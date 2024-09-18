import { BookingData } from "@/types";

export function filterBookings(
  bookings: BookingData[],
  searchTerm: string,
  statusFilter: string,
  dateFilter: string,
  currentPage: number,
  itemsPerPage: number
) {
  const lowerSearchTerm = searchTerm.toLowerCase();
  const startSlice = (currentPage - 1) * itemsPerPage;
  const endSlice = currentPage * itemsPerPage;

  const filteredBookings = bookings
    .filter((booking) => {
      const idString = booking.id.toString().toLowerCase();
      const roomString = booking.room.toString().toLowerCase();
      const guestString = booking.guest.toLowerCase();

      const matchesSearchTerm =
        idString.startsWith(lowerSearchTerm) ||
        guestString.includes(lowerSearchTerm) ||
        roomString.includes(lowerSearchTerm);

      const statusMatch =
        statusFilter === "all" || booking.status === statusFilter;

      const bookingDate = new Date(booking.date.split("/").reverse().join("-"));
      const dateMatch =
        dateFilter === "" ||
        new Date(dateFilter).toDateString() === bookingDate.toDateString();

      return matchesSearchTerm && statusMatch && dateMatch;
    })
    .map((booking) => ({
      ...booking,
      id: booking.id.toString(),
    }))
    .slice(startSlice, endSlice);

  const totalPages = Math.ceil(
    bookings.filter((booking) => {
      const guestMatch = booking.guest
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const roomMatch = booking.room
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const statusMatch =
        statusFilter === "all" || booking.status === statusFilter;
      const dateMatch =
        dateFilter === "" ||
        new Date(dateFilter).toDateString() ===
          new Date(booking.date.split("/").reverse().join("-")).toDateString();

      return guestMatch || (roomMatch && statusMatch && dateMatch);
    }).length / itemsPerPage
  );

  return { filteredBookings, totalPages };
}
