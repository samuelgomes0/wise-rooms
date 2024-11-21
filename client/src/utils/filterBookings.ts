import { IBooking } from "@/types";
import { parseISO } from "date-fns";

interface FilterBookingsParams {
  bookings: IBooking[];
  searchTerm: string;
  statusFilter: string;
  dateFilter?: Date;
  currentPage: number;
  itemsPerPage: number;
}

export function filterBookings({
  bookings,
  searchTerm,
  statusFilter,
  dateFilter,
  currentPage,
  itemsPerPage,
}: FilterBookingsParams) {
  const lowerSearchTerm = searchTerm.toLowerCase();

  // Filtra as reservas com base nos critérios fornecidos
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toString().toLowerCase().includes(lowerSearchTerm) ||
      booking.user.name.toLowerCase().includes(lowerSearchTerm) ||
      booking.room.name.toLowerCase().includes(lowerSearchTerm);

    const matchesDate =
      !dateFilter ||
      parseISO(booking.date.toString()).toDateString() ===
        dateFilter.toDateString();

    const matchesStatus =
      statusFilter === "Todos" || booking.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  // Pagina os resultados filtrados
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return { filteredBookings, paginatedBookings, totalPages };
}
