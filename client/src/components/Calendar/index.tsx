import { DAYS_OF_WEEK, HOURS } from "@/constants/calendar";
import { Event, useCalendar } from "@/hooks/useCalendar";
import React, { useState } from "react";
import { CreateBookingModal } from "../Bookings/CreateBookingModal";
import { CalendarHeader } from "../CalendarHeader";
import { ViewEventModal } from "../ViewEventModal";

export const Calendar: React.FC = () => {
  const {
    nextWeek,
    previousWeek,
    getWeekDates,
    formatHeaderDateRange,
    currentMonthYear,
  } = useCalendar();

  const [view, setView] = useState<string>("week");
  const [filter, setFilter] = useState<string>("all");
  const [showNewEventModal, setShowNewEventModal] = useState<boolean>(false);
  const [showViewEventModal, setShowViewEventModal] = useState<boolean>(false);

  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    start: "",
    end: "",
    date: null,
    color: "bg-indigo-200",
  });

  const [events, setEvents] = useState<Event[]>([
    {
      date: new Date(),
      start: "8:00",
      end: "9:00",
      title: "Preparação da Apresentação do Cliente",
      color: "bg-purple-200",
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleNewEvent = () => {
    if (!newEvent.date || !newEvent.start || !newEvent.end || !newEvent.title) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const eventDate =
      newEvent.date instanceof Date
        ? newEvent.date
        : new Date(newEvent.date as string);

    const hasConflict = events.some(
      (event) =>
        event.date.toDateString() === eventDate.toDateString() &&
        ((newEvent.start! >= event.start && newEvent.start! < event.end) ||
          (newEvent.end! > event.start && newEvent.end! <= event.end))
    );

    if (hasConflict) {
      alert("Conflito de horário! Escolha outro horário.");
      return;
    }

    const newEventWithDate = { ...newEvent, date: eventDate } as Event;
    setEvents([...events, newEventWithDate]);
    setShowNewEventModal(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      date: null,
      color: "bg-indigo-200",
    });
  };

  const handleSlotClick = (date: Date, hour: string) => {
    const eventExists = events.some(
      (event) =>
        event.date.toDateString() === date.toDateString() &&
        event.start === hour
    );
    if (!eventExists) {
      setNewEvent({ ...newEvent, date, start: hour });
      setShowNewEventModal(true);
    }
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowViewEventModal(true);
  };

  const weekDates = getWeekDates();

  return (
    <div className="flex  w-full">
      <main className="flex-1 overflow-y-auto p-4">
        <CalendarHeader
          filter={filter}
          setFilter={setFilter}
          view={view}
          setView={setView}
          previousWeek={previousWeek}
          nextWeek={nextWeek}
          currentMonthYear={currentMonthYear}
          formatHeaderDateRange={formatHeaderDateRange}
        />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div
            className="grid grid-cols-[100px_repeat(7,_1fr)] gap-px bg-gray-200"
            role="table"
          >
            <div
              className="bg-gray-50 text-center p-2 font-semibold"
              role="columnheader"
            >
              Horários
            </div>
            {weekDates.map((date, index) => (
              <div
                key={index}
                className="bg-gray-50 p-2 text-center font-medium"
                role="columnheader"
              >
                {DAYS_OF_WEEK[date.getDay()]} <br />
                <span className="text-sm text-gray-500">
                  {date.toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            ))}

            {HOURS.map((hour, hourIndex) => (
              <div key={`hour-${hourIndex}`}>
                <div
                  className="bg-white p-4 text-center text-sm text-gray-500"
                  role="rowheader"
                >
                  {hour}
                </div>
                {weekDates.map((date, dayIndex) => (
                  <div
                    key={`${hourIndex}-${dayIndex}`}
                    className="bg-white p-2 relative cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSlotClick(date, hour)}
                    role="gridcell"
                    aria-label={`Horário ${hour} em ${date.toLocaleDateString(
                      "pt-BR"
                    )}`}
                  >
                    {events
                      .filter(
                        (event) =>
                          event.date.toDateString() === date.toDateString() &&
                          event.start === hour
                      )
                      .map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`absolute top-0 left-0 right-0 p-2 m-1 rounded ${event.color} text-xs cursor-pointer`}
                          style={{
                            height: `${
                              (parseInt(event.end) - parseInt(event.start)) * 40
                            }px`,
                          }}
                          onClick={(e) => handleEventClick(event, e)}
                          role="button"
                          aria-label={`Evento: ${event.title}`}
                        >
                          {event.title}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>

      <CreateBookingModal />

      <ViewEventModal
        showViewEventModal={showViewEventModal}
        setShowViewEventModal={setShowViewEventModal}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};
