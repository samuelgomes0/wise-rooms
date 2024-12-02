import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_TIME_SLOTS } from "@/constants";
import { IBooking } from "@/types";
import { capitalizeString, getStatusBadge } from "@/utils";
import { ZoomInIcon } from "lucide-react";

interface WeeklyViewProps {
  startDate: Date;
  bookings: IBooking[];
}

export function WeeklyView({ startDate, bookings }: WeeklyViewProps) {
  const adjustedStartDate = new Date(startDate);
  const dayOfWeek = adjustedStartDate.getDay();
  adjustedStartDate.setDate(adjustedStartDate.getDate() - dayOfWeek);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(adjustedStartDate);
    day.setDate(adjustedStartDate.getDate() + i);
    return day;
  });

  const filteredBookings = bookings.filter((booking) =>
    ["CONFIRMED", "ACTIVE", "COMPLETED"].includes(booking.status)
  );

  const isBookingInSlot = (booking: IBooking, day: Date, timeSlot: string) => {
    const bookingDate = new Date(booking.date).toDateString();
    const slotTime = new Date(`${day.toDateString()} ${timeSlot}`);
    return (
      bookingDate === day.toDateString() &&
      new Date(booking.startTime) <= slotTime &&
      new Date(booking.endTime) > slotTime
    );
  };

  return (
    <div className="flex-1 mt-8">
      {/* Header */}
      <div className="grid gap-1 grid-cols-7">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`mb-2 py-2 text-center items-center flex flex-col rounded bg-white shadow-sm ${
              day.toDateString() === new Date().toDateString()
                ? "bg-[#171717] text-white"
                : ""
            }`}
          >
            <div
              className={`font-medium text-sm text-read ${day.toDateString() === new Date().toDateString() ? "text-[#ABABAB]" : ""}`}
            >
              {capitalizeString(
                day.toLocaleDateString("pt-BR", { weekday: "short" })
              )}
            </div>
            <div className="font-semibold text-xl">{day.getDate()}</div>
          </div>
        ))}
      </div>
      {/* Cells */}
      <div
        className="grid gap-1 relative"
        style={{
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: `repeat(${DEFAULT_TIME_SLOTS.length}, minmax(96px, auto))`,
        }}
      >
        {DEFAULT_TIME_SLOTS.map((timeSlot, rowIndex) =>
          weekDays.map((day, colIndex) => {
            const bookingsInSlot = filteredBookings.filter((booking) =>
              isBookingInSlot(booking, day, timeSlot)
            );
            return (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="shadow-sm bg-white rounded relative flex flex-wrap items-start gap-1 p-1"
              >
                {bookingsInSlot.map((booking) => (
                  <Dialog key={booking.id}>
                    <DialogTrigger className="w-full text-left">
                      <div
                        key={booking.id}
                        className="bg-blue-200 text-xs p-1 px-2 rounded shadow-sm flex items-center justify-between"
                        title={`${booking.user.name} - ${booking.room.name}`}
                      >
                        <div>
                          <strong>{booking.room.name}</strong>
                          <div>{booking.user.name}</div>
                        </div>
                        <ZoomInIcon size={16} />
                      </div>
                    </DialogTrigger>
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
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
