import { BookingRegistrationForm } from "@/components/Bookings/BookingRegistrationForm";
import GenericModal from "@/components/GenericModal";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import { capitalizeString } from "@/utils";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useContext, useState } from "react";

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export default function CalendarHeader({
  currentDate,
  setCurrentDate,
}: CalendarHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { isAuthenticated } = useContext(AuthContext);

  const getMonthAndYear = {
    month: new Date().toLocaleString("pt-BR", { month: "long" }),
    year: new Date().getFullYear(),
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="bg-white m-auto rounded py-4 px-8 shadow-sm flex justify-between items-center">
      <h2 className="text-xl font-semibold">{`${capitalizeString(getMonthAndYear.month)}, ${getMonthAndYear.year}`}</h2>
      <div className="flex gap-2">
        <Button size="icon" variant="outline" onClick={handlePreviousWeek}>
          <ChevronLeftIcon size={16} />
        </Button>
        <Button size="default" variant="outline" onClick={handleToday}>
          Hoje
        </Button>
        <Button size="icon" variant="outline" onClick={handleNextWeek}>
          <ChevronRightIcon size={16} />
        </Button>
      </div>
      {isAuthenticated ? (
        <GenericModal
          title="Adicionar Nova Reserva"
          triggerText="+ Nova Reserva"
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        >
          <BookingRegistrationForm onCloseModal={handleModalClose} />
        </GenericModal>
      ) : null}
    </div>
  );
}
