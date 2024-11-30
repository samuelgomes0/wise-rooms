import { DEFAULT_TIME_SLOTS } from "@/constants";
import { Appointment } from "@/types/Appointment.interface";
import { capitalizeString } from "@/utils";

interface WeeklyViewProps {
  startDate: Date;
  appointments: Appointment[];
}

export function WeeklyView({ startDate, appointments }: WeeklyViewProps) {
  const adjustedStartDate = new Date(startDate);
  const dayOfWeek = adjustedStartDate.getDay();
  adjustedStartDate.setDate(adjustedStartDate.getDate() - dayOfWeek);
  const today = new Date().getDay();

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(adjustedStartDate);
    day.setDate(adjustedStartDate.getDate() + i);
    return day;
  });

  return (
    <div className="flex">
      <div className="flex flex-col mr-6">
        <div className="h-[64px] mb-2 py-2"></div>
        <div className="flex flex-col gap-1">
          {DEFAULT_TIME_SLOTS.map((timeSlot, index) => (
            <div
              key={index}
              className="flex items-center justify-start text-sm font-medium text-read h-[96px]"
            >
              {timeSlot}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="grid gap-1 grid-cols-7">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`mb-2 py-2 text-center items-center flex flex-col rounded ${today === index ? "bg-white shadow-sm" : ""}`}
            >
              <div className="font-medium text-sm text-read">
                {capitalizeString(
                  day.toLocaleDateString("pt-BR", { weekday: "short" })
                )}
              </div>
              <div className="font-semibold text-xl">{day.getDate()}</div>
            </div>
          ))}
        </div>
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: `repeat(${DEFAULT_TIME_SLOTS.length}, 1fr)`,
          }}
        >
          {DEFAULT_TIME_SLOTS.map((_, rowIndex) =>
            weekDays.map((day, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-24 shadow-sm bg-white rounded"
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
