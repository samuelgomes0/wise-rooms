"use client";

import { bookings } from "@/api/bookings";
import GenericForm from "@/components/GenericForm";
import GenericModal from "@/components/GenericModal";
import GenericTable from "@/components/GenericTable";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reservationSchema } from "@/schemas";
import { IBooking } from "@/types/IBooking";
import { getStatusBadge } from "@/utils";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, MoreHorizontal, SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Reservas() {
  const [reservations, setReservations] = useState(bookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAddReservation = (data: IBooking) => {
    const { id } = data;
    setReservations([...reservations, { ...data, id: id.toString() }]);
  };

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.id.toString().includes(searchTerm) ||
      reservation.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.room.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      !dateFilter || reservation.date === format(dateFilter, "dd/MM/yyyy");

    const matchesStatus =
      statusFilter === "Todos" || reservation.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  return (
    <div className="flex p-8 w-full">
      <main className="flex-1">
        <header className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/51432896?v=4"
                  alt="Avatar"
                />
                <AvatarFallback>SG</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Reservas</h1>
                <p className="text-sm text-gray-500">Administrador</p>
              </div>
            </div>
            <GenericModal
              title="Adicionar Nova Reserva"
              triggerText="+ Nova Reserva"
            >
              <GenericForm
                schema={reservationSchema}
                fields={[
                  { name: "responsible", label: "Responsável", type: "text" },
                  { name: "room", label: "Sala", type: "text" },
                  { name: "start", label: "Início", type: "time" },
                  { name: "end", label: "Fim", type: "time" },
                  { name: "date", label: "Data", type: "date" },
                  { name: "status", label: "Status", type: "text" },
                ]}
                defaultValues={{
                  responsible: "",
                  room: "",
                  start: "",
                  end: "",
                  date: "",
                  status: "Pendente",
                }}
                onSubmit={handleAddReservation}
              />
            </GenericModal>
          </div>
          <div className="flex gap-4 relative">
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Buscar por reserva, responsável ou sala"
            />
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    {dateFilter ? (
                      format(dateFilter, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFilter}
                    onSelect={setDateFilter}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Confirmado">Confirmado</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <GenericTable
            columns={[
              { header: "ID", accessor: "id" },
              { header: "Responsável", accessor: "guest" },
              { header: "Sala", accessor: "room" },
              { header: "Início", accessor: "checkIn" },
              { header: "Fim", accessor: "checkOut" },
              { header: "Data", accessor: "date" },
              { header: "Status", accessor: "status" },
              { header: "Opções", accessor: "options" },
            ]}
            data={paginatedReservations.map((reservation) => ({
              ...reservation,
              date: format(
                parse(reservation.date, "dd/MM/yyyy", new Date()),
                "dd/MM/yyyy"
              ),
              status: getStatusBadge(reservation.status),
              options: (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="w-12 h-full"
                      variant="ghost"
                      aria-label="Ações da reserva"
                    >
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Editar reserva</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Cancelar reserva
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            }))}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Exibindo {paginatedReservations.length} de{" "}
            {filteredReservations.length} reservas
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
