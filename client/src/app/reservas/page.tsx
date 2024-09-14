import { AddReservationDialog } from "@/components/AddReservationDialog";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { ReservationsTable } from "@/components/ReservationsTable";
import { UserDropdown } from "@/components/UserDropdown";
import {
  ReservationsHeader,
  ReservationsHeaderOptions,
  ReservationsMain,
  ReservationsMainContent,
  ReservationsMainHeader,
  ReservationsPage,
} from "./components";

export default function ReservationsLayout() {
  return (
    <ReservationsPage>
      <ReservationsHeader>
        <h1>Título</h1>
        <ReservationsHeaderOptions>
          <NotificationsDropdown />
          <UserDropdown />
        </ReservationsHeaderOptions>
      </ReservationsHeader>
      <ReservationsMain>
        <ReservationsMainHeader>
          <h2 className="text-2xl font-semibold">Reservas</h2>
          <AddReservationDialog />
        </ReservationsMainHeader>
        <ReservationsMainContent>
          <ReservationsTable />
        </ReservationsMainContent>
      </ReservationsMain>
    </ReservationsPage>
  );
}
