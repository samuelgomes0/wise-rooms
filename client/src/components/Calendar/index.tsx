// components/HourlyCalendar.tsx
import { Reservation } from "@/types/Reservation";
import {
  addDays,
  addMinutes,
  eachDayOfInterval,
  format,
  isEqual,
  parseISO,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";

interface CalendarProps {
  reservations: Reservation[];
}

function Calendar({ reservations }: CalendarProps) {
  const startTime = new Date();
  startTime.setHours(7, 45, 0, 0);

  const endTime = new Date();
  endTime.setHours(22, 20, 0, 0);

  const times = [];
  let time = startTime;

  while (time <= endTime) {
    times.push(new Date(time));
    time = addMinutes(time, 50);
  }

  const days = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 0 }), // Starts on Sunday
    end: addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), 6), // Ends on Saturday
  });

  const renderHeader = () => {
    return (
      <div className="grid grid-cols-7 gap-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 p-2 rounded-t-lg shadow-inner">
        {days.map((day, index) => (
          <div key={index} className="font-semibold text-gray-700 text-sm">
            <div className="capitalize">
              {format(day, "EEEE", { locale: ptBR })}
            </div>
            <div>{format(day, "dd/MM")}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderHours = () => {
    return times.map((time) => (
      <div
        key={time.toISOString()}
        className="border-t border-gray-300 text-sm"
      >
        <div className="flex">
          <div className="w-20 font-medium text-gray-600 flex justify-center items-center">
            {format(time, "HH:mm")}
          </div>
          <div className="flex-1 grid grid-cols-7 gap-2">
            {days.map((day, index) => renderReservations(day, time))}
          </div>
        </div>
      </div>
    ));
  };

  const renderReservations = (day: Date, time: Date) => {
    const dayString = format(day, "yyyy-MM-dd");
    const timeString = format(time, "HH:mm");

    const filteredReservations = reservations.filter((reservation) => {
      const reservationDateTime = parseISO(
        `${reservation.date}T${reservation.startTime}`,
      );
      return (
        isEqual(day, new Date(reservation.date)) &&
        format(reservationDateTime, "HH:mm") === timeString
      );
    });

    return (
      <div key={time.toISOString()} className="relative h-16">
        {filteredReservations.map((reservation, index) => (
          <div
            key={index}
            className="absolute inset-1 bg-blue-500 text-white text-center text-xs p-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out"
            style={{ height: "100%" }}
          >
            {reservation.description}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg">
      {renderHeader()}
      {renderHours()}
    </div>
  );
}

export default Calendar;
