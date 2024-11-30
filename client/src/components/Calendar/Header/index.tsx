import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function CalendarHeader() {
  return (
    <div className="bg-white m-auto rounded py-4 px-8 shadow-sm flex justify-between items-center">
      <h2 className="text-xl font-semibold">Novembro, 2024</h2>
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
      <Button>+ Nova Reserva</Button>
    </div>
  );
}
