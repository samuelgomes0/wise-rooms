import { BookingRegistrationForm } from "@/components/Bookings/BookingRegistrationForm";
import GenericModal from "@/components/GenericModal";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import { capitalizeString } from "@/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext, useState } from "react";

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
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

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    if (newDate >= oneMonthAgo) setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);

    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(oneMonthAhead.getMonth() + 1);

    if (newDate <= oneMonthAhead) setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getMonthRange = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startMonth = capitalizeString(
      startOfWeek.toLocaleString("pt-BR", { month: "long" })
    );
    const endMonth = capitalizeString(
      endOfWeek.toLocaleString("pt-BR", { month: "long" })
    );

    const year = currentDate.toLocaleString("pt-BR", { year: "numeric" });

    return startMonth === endMonth
      ? `${startMonth}, ${year}`
      : `${startMonth} / ${endMonth}, ${year}`;
  };

  return (
    <div className="bg-white m-auto rounded py-4 px-8 shadow-sm flex justify-between items-center">
      <h2 className="text-xl font-semibold">{getMonthRange()}</h2>
      <div className="flex gap-4">
        <Button size="icon" variant="outline" onClick={handlePreviousWeek}>
          <ChevronLeftIcon size={16} />
        </Button>
        <Button size="default" variant="default" onClick={handleToday}>
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
