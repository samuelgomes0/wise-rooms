import { Event } from "@/hooks/useCalendar";
import React from "react";

interface ViewEventModalProps {
  showViewEventModal: boolean;
  setShowViewEventModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEvent: Event | null;
}

export const ViewEventModal: React.FC<ViewEventModalProps> = ({
  showViewEventModal,
  setShowViewEventModal,
  selectedEvent,
}) => {
  if (!showViewEventModal || !selectedEvent) {
    return null;
  }

  // Close modal when clicking outside
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "modal-background") {
      setShowViewEventModal(false);
    }
  };

  return (
    <div
      id="modal-background"
      className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleBackgroundClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 id="modal-title" className="text-lg font-semibold mb-4">
          Detalhes da Reserva
        </h2>
        <div className="space-y-2">
          <p>
            <strong>Título:</strong> {selectedEvent.title}
          </p>
          <p>
            <strong>Data:</strong>{" "}
            {selectedEvent.date instanceof Date
              ? selectedEvent.date.toLocaleDateString("pt-BR")
              : selectedEvent.date}
          </p>
          <p>
            <strong>Horário:</strong> {selectedEvent.start} -{" "}
            {selectedEvent.end}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
            onClick={() => setShowViewEventModal(false)}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
