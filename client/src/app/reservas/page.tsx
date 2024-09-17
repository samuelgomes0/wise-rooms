import {
  ReservationsHeader,
  ReservationsMain,
  ReservationsPage,
} from "./components";

export default function ReservationsLayout() {
  return (
    <ReservationsPage>
      <ReservationsHeader>
        <h1>Título</h1>
      </ReservationsHeader>
      <ReservationsMain>opa</ReservationsMain>
    </ReservationsPage>
  );
}
