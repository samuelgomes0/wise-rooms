import { BookingRegistrationForm } from "@/components/Bookings/BookingRegistrationForm";
import GenericModal from "@/components/GenericModal";
import { Button } from "@/components/ui/button";
import { capitalizeString } from "@/utils";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useState } from "react";

export default function CalendarHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const getMonthAndYear = {
    month: new Date().toLocaleString("pt-BR", { month: "long" }),
    year: new Date().getFullYear(),
  };

  return (
    <div className="bg-white m-auto rounded py-4 px-8 shadow-sm flex justify-between items-center">
      <h2 className="text-xl font-semibold">{`${capitalizeString(getMonthAndYear.month)}, ${getMonthAndYear.year}`}</h2>
      <div className="flex gap-2">
        <Button size="icon" variant="outline">
          <ChevronLeftIcon size={16} />
        </Button>
        <Button size="default" variant="outline">
          Hoje
        </Button>
        <Button size="icon" variant="outline">
          <ChevronRightIcon size={16} />
        </Button>
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
  );
}
