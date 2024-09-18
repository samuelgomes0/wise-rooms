"use client";

import { bookings } from "@/api/bookings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterBookings } from "@/utils";
import { Search } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "../BookingModal";
import { BookingsTable } from "../BookingsTable";
import { TablePageNavigation } from "../TablePageNavigation";

export default function Dashboard() {
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
    <div className="flex h-screen w-full bg-gray-100">
      <main className="flex-1 p-8 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="/placeholder.svg?height=50&width=50"
                  alt="Avatar"
                />
                <AvatarFallback>SG</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">Reservas</h1>
                <p className="text-gray-500">Admin</p>
              </div>
            </div>
            <BookingModal />
          </header>
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                className="pl-10"
                placeholder="Buscar por reserva, responsável ou sala"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Confirmado">Confirmado</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="max-w-xs"
            />
          </div>
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
