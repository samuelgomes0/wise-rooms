import { IAuditLog, IBooking, IRoom, IUser } from "@/types";
import { IResource } from "@/types/Resource.interface";
import { parseISO } from "date-fns";

interface FilterBookingsParams {
  bookings: IBooking[];
  searchTerm: string;
  statusFilter: string;
  dateFilter?: Date;
  currentPage: number;
  itemsPerPage: number;
}

function bookings({
  bookings,
  searchTerm,
  statusFilter,
  dateFilter,
  currentPage,
  itemsPerPage,
}: FilterBookingsParams) {
  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toString().toLowerCase().includes(lowerSearchTerm) ||
      booking.user?.name.toLowerCase().includes(lowerSearchTerm) ||
      booking.room?.name.toLowerCase().includes(lowerSearchTerm);

    const matchesDate =
      !dateFilter ||
      parseISO(booking.date.toString()).toDateString() ===
        dateFilter.toDateString();

    const matchesStatus =
      statusFilter === "Todos" || booking.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return { filteredBookings, paginatedBookings, totalPages };
}

interface FilterRoomsParams {
  rooms: IRoom[];
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
}

function rooms({
  rooms,
  searchTerm,
  currentPage,
  itemsPerPage,
}: FilterRoomsParams) {
  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredRooms = rooms.filter(
    (room) =>
      room.id.toString().includes(lowerSearchTerm) ||
      room.name.toLowerCase().includes(lowerSearchTerm) ||
      room.description?.toLowerCase().includes(lowerSearchTerm)
  );

  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  return { filteredRooms, paginatedRooms, totalPages };
}

interface FilterUsersParams {
  users: IUser[];
  searchTerm: string;
  roleFilter: string;
  currentPage: number;
  itemsPerPage: number;
}

function users({
  users,
  searchTerm,
  roleFilter,
  currentPage,
  itemsPerPage,
}: FilterUsersParams) {
  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.id.toString().includes(lowerSearchTerm) ||
      user.name.toLowerCase().includes(lowerSearchTerm) ||
      user.email.toLowerCase().includes(lowerSearchTerm);

    const matchesRole = roleFilter === "Todos" || user.role.name === roleFilter;

    return matchesSearch && matchesRole;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return { filteredUsers, paginatedUsers, totalPages };
}

interface FilterResourcesParams {
  resources: IResource[];
  searchTerm: string;
  roomFilter: string;
  currentPage: number;
  itemsPerPage: number;
}

function resources({
  resources,
  searchTerm,
  roomFilter,
  currentPage,
  itemsPerPage,
}: FilterResourcesParams) {
  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.id.toString().includes(lowerSearchTerm) ||
      resource.name.toLowerCase().includes(lowerSearchTerm);

    const matchesRoom =
      roomFilter === "Todos" || resource.room.name === roomFilter;

    return matchesSearch && matchesRoom;
  });

  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  return { filteredResources, paginatedResources, totalPages };
}

interface AuditProps {
  audits: IAuditLog[];
  dateFilter: Date;
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
}

function audit({
  audits,
  dateFilter,
  searchTerm,
  currentPage,
  itemsPerPage,
}: AuditProps) {
  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredAudits = audits.filter((audit) => {
    const matchesSearch = audit.user.name
      .toLowerCase()
      .includes(lowerSearchTerm);

    const matchesDate =
      !dateFilter ||
      parseISO(audit.createdAt.toString()).toDateString() ===
        dateFilter.toDateString();

    return matchesSearch && matchesDate;
  });

  const paginatedAudits = filteredAudits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredAudits.length / itemsPerPage);

  return { filteredAudits, paginatedAudits, totalPages };
}

const Filter = {
  bookings,
  rooms,
  users,
  resources,
  audit,
};

export default Filter;
