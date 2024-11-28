"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingsTableProps } from "@/types";
import { getStatusBadge } from "@/utils";
import { MoreHorizontal } from "lucide-react";

export function BookingsTable({ bookings }: BookingsTableProps) {
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    alert(`ID ${id} copiado para a área de transferência`);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden flex-1">
      <div className="h-[100%] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reserva</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Sala</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Fim</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map(
              ({ id, room, guest, date, checkIn, checkOut, status }) => (
                <TableRow key={id}>
                  <TableCell
                    className="max-w-[150px] truncate cursor-pointer font-semibold"
                    onClick={() => handleCopyId(id)}
                  >
                    {id}
                  </TableCell>
                  <TableCell>{guest}</TableCell>
                  <TableCell>{room}</TableCell>
                  <TableCell>{checkIn}</TableCell>
                  <TableCell>{checkOut}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{getStatusBadge(status)}</TableCell>
                  <TableCell className="text-right py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Ações</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar Reserva</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Cancelar Reserva
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
