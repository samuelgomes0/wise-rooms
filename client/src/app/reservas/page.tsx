import { NotificationsDropdown } from "@/components/NotificationsDropdown";
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
          <h2>Reservas</h2>
        </ReservationsMainHeader>
        <ReservationsMainContent>Conteúdo</ReservationsMainContent>
      </ReservationsMain>
    </ReservationsPage>
  );
}
