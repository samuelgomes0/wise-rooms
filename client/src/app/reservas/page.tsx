"use client";

import { bookings } from "@/api/bookings";
import { BookingsTable } from "@/components/BookingsTable";
import { Header } from "@/components/Header";
import { TablePageNavigation } from "@/components/TablePageNavigation";
import { filterBookings } from "@/utils";
import { useState } from "react";

export default function Reservas() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const itemsPerPage = 30;

  const { filteredBookings, totalPages } = filterBookings(
    bookings,
    searchTerm,
    statusFilter,
    dateFilter,
    currentPage,
    itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex h-screen w-full">
      <main className="flex-1 p-8 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <Header
            userInitials="SG"
            headerTitle="Reservas"
            userRole="Administrador"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />

          <BookingsTable bookings={filteredBookings} />
          <TablePageNavigation
            indexOfFirstItem={(currentPage - 1) * itemsPerPage}
            indexOfLastItem={currentPage * itemsPerPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </main>
    </div>
  );
}
