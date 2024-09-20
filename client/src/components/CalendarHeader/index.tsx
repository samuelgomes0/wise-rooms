// /src/components/Calendar/CalendarHeader.tsx

import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";

interface CalendarHeaderProps {
  filter: string;
  setFilter: (filter: string) => void;
  view: string;
  setView: (view: string) => void;
  previousWeek: () => void;
  nextWeek: () => void;
  currentMonthYear: () => string;
  formatHeaderDateRange: () => string;
}

export function CalendarHeader({
  filter,
  setFilter,
  view,
  setView,
  previousWeek,
  nextWeek,
  currentMonthYear,
  formatHeaderDateRange,
}: CalendarHeaderProps) {
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 ${
              filter === "all"
                ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                : "text-gray-700"
            }`}
            onClick={() => setFilter("all")}
          >
            Todos Agendados
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 ${
              filter === "events"
                ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                : "text-gray-700"
            }`}
            onClick={() => setFilter("events")}
          >
            Eventos
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 ${
              filter === "meetings"
                ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                : "text-gray-700"
            }`}
            onClick={() => setFilter("meetings")}
          >
            Reuniões
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 ${
              filter === "reminders"
                ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                : "text-gray-700"
            }`}
            onClick={() => setFilter("reminders")}
          >
            Lembretes de Tarefas
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={previousWeek}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={nextWeek}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">{currentMonthYear()}</h2>
        </div>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              view === "day" ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
            onClick={() => setView("day")}
          >
            Dia
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              view === "week" ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
            onClick={() => setView("week")}
          >
            Semana
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              view === "month" ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
            onClick={() => setView("month")}
          >
            Mês
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{formatHeaderDateRange()}</span>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              className="w-5 h-5 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ícone de calendário */}
              <path
                d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 2V6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 2V6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 10H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
