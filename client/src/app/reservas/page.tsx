"use client";

import { BookingRegistrationForm } from "@/components/Bookings/BookingRegistrationForm";
import GenericModal from "@/components/GenericModal";
import GenericTable from "@/components/GenericTable";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Separator } from "@/components/ui/separator";
import { Notification } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useToast } from "@/hooks/use-toast";
import bookingServiceInstance from "@/services/BookingService";
import { IBooking } from "@/types";
import { ERoles } from "@/types/Roles.enum";
import { getStatusBadge } from "@/utils";
import { filterBookings } from "@/utils/filterBookings";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, MoreHorizontalIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Reservas() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    listBookings();
  };

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { toast } = useToast();

  const { user, isAuthenticated } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);

  const { filteredBookings, paginatedBookings, totalPages } = filterBookings({
    bookings,
    searchTerm,
    statusFilter,
    dateFilter,
    currentPage,
    itemsPerPage,
  });

  const listBookings = async () => {
    setIsLoading(true);

    try {
      const data = await bookingServiceInstance.listBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error listing bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    await bookingServiceInstance.cancelBooking(bookingId);
    await listBookings();
    toast({
      title: Notification.SUCCESS.BOOKING.CANCEL_TITLE,
      description: Notification.SUCCESS.BOOKING.CANCEL_DESCRIPTION,
    });
  };

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return router.push("/");
    listBookings();
  }, []);

  return (
    <div className="py-8 w-4/5 mx-auto overflow-hidden">
      <main className="flex-1">
        <header className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Reservas</h1>
                <p className="text-sm text-read">
                  {ERoles[user?.roleId as unknown as keyof typeof ERoles]}
                </p>
              </div>
            </div>
            <GenericModal
              title="Adicionar Nova Reserva"
              triggerText="+ Nova Reserva"
              isOpen={isModalOpen}
              onOpenChange={setIsModalOpen}
            >
              <BookingRegistrationForm onCloseModal={handleModalClose} />
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
              placeholder="Buscar por código, responsável ou sala"
            />
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-start text-left font-normal"
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
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os status</SelectItem>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="CONFIRMED">Confirmado</SelectItem>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="COMPLETED">Completado</SelectItem>
                <SelectItem value="CANCELLED">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <GenericTable
            columns={[
              { header: "Código", accessor: "id" },
              { header: "Responsável", accessor: "user" },
              { header: "Sala", accessor: "room" },
              { header: "Início", accessor: "startTime" },
              { header: "Fim", accessor: "endTime" },
              { header: "Data", accessor: "date" },
              { header: "Status", accessor: "status" },
              { header: "Opções", accessor: "options" },
            ]}
            data={paginatedBookings.map((booking: IBooking) => ({
              ...booking,
              user: booking.user.name,
              room: booking.room.name,
              date: format(booking.date, "dd/MM/yyyy"),
              startTime: format(
                parseISO(booking.startTime.toString()),
                "HH:mm"
              ),
              endTime: format(parseISO(booking.endTime.toString()), "HH:mm"),
              status: getStatusBadge(booking.status),
              options: (
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="w-12 h-full"
                        variant="ghost"
                        aria-label="Ações da reserva"
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <DialogTrigger>Ver detalhes</DialogTrigger>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar reserva</DropdownMenuItem>
                      {booking.status !== "CANCELLED" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancelar reserva
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Detalhes do Agendamento
                      </DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <DialogDescription className="text-back grid grid-cols-1 grid-row-3 gap-4">
                      <div className="grid grid-cols-3 items-center justify-between">
                        <div className="flex flex-col">
                          <strong>Usuário</strong> {booking.user.name}
                        </div>
                        <div className="flex flex-col">
                          <strong>Sala</strong> {booking.room.name}
                        </div>
                        <div className="flex flex-col">
                          <strong>Data</strong>{" "}
                          {new Date(booking.date).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                      <div className="grid grid-cols-3">
                        <div className="flex flex-col">
                          <strong>Horário</strong>{" "}
                          {new Date(booking.startTime).toLocaleTimeString(
                            "pt-BR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}{" "}
                          -{" "}
                          {new Date(booking.endTime).toLocaleTimeString(
                            "pt-BR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                        <div className="grid gap-1 w-2/4">
                          <strong>Status</strong>{" "}
                          {getStatusBadge(booking.status)}
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col break-words">
                          <strong>Descrição</strong>{" "}
                          {booking.description || "Sem descrição"}
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              ),
            }))}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Exibindo {paginatedBookings.length} de {filteredBookings.length}{" "}
            reservas
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
