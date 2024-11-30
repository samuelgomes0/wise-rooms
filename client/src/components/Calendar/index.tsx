import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const appointments = [
  { time: "09:00", title: "Meeting with John", duration: 2 },
  { time: "14:00", title: "Dentist Appointment", duration: 1 },
  { time: "16:00", title: "Team Sync", duration: 1 },
];

export default function Calendar() {
  const currentDate = new Date();
  const dayNumber = currentDate.getDate();
  const weekday = currentDate.toLocaleDateString("pt-BR", { weekday: "long" });

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-center">
          <span className="text-3xl">{dayNumber}</span>
          <br />
          <span className="capitalize">{weekday}</span>
        </h2>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex">
        <div className="flex-grow">
          <div className="grid grid-cols-1 gap-1">
            {timeSlots.map((slot) => (
              <div
                key={slot}
                className="h-16 border-b border-gray-200 relative"
              >
                {appointments.map((appointment, index) => {
                  if (appointment.time === slot) {
                    return (
                      <div
                        key={index}
                        className="absolute left-0 right-0 bg-blue-200 rounded p-2 text-sm"
                        style={{
                          top: "0",
                          height: `${appointment.duration * 64}px`,
                          zIndex: 10,
                        }}
                      >
                        {appointment.title}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="w-20 border-l border-gray-200">
          {timeSlots.map((slot) => (
            <div
              key={slot}
              className="h-16 flex items-center justify-center text-sm text-gray-500"
            >
              {slot}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
