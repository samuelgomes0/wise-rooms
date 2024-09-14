import { reservations } from "@/api/reservations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ReservationsTable() {
  return (
    <div className="rounded-sm border mt-5">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>ID da Reserva</TableHead>
            <TableHead>Nome da Sala</TableHead>
            <TableHead>Data de Início</TableHead>
            <TableHead>Data de Término</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Capacidade</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.id}</TableCell>
              <TableCell>{reservation.room}</TableCell>
              <TableCell>{reservation.startTime.toLocaleString()}</TableCell>
              <TableCell>{reservation.endTime.toLocaleString()}</TableCell>
              <TableCell>{reservation.status}</TableCell>
              <TableCell>{reservation.capacity}</TableCell>
              <TableCell>
                <button className="btn-edit">Editar</button>
                <button className="btn-cancel">Cancelar</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
