"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ROOMS } from "../lib/constants";

interface Reservation {
  title: string;
  room: string;
  startTime: string;
  endTime: string;
}

interface RoomOccupancyProps {
  reservations: Record<string, Record<string, Reservation>>;
}

export default function Dashboard() {
  const [selectedRoom, setSelectedRoom] = useState("all");

  const reservations = {
    "2022-01-01": {
      "1": {
        title: "Reunião de Planejamento",
        room: "Sala 1",
        startTime: "09:00",
        endTime: "11:00",
      },
      "2": {
        title: "Reunião de Planejamento",
        room: "Sala 2",
        startTime: "09:00",
        endTime: "11:00",
      },
      "3": {
        title: "Reunião de Planejamento",
        room: "Sala 3",
        startTime: "09:00",
        endTime: "11:00",
      },
    },
    "2022-01-02": {
      "1": {
        title: "Reunião de Planejamento",
        room: "Sala 1",
        startTime: "09:00",
        endTime: "11:00",
      },
      "2": {
        title: "Reunião de Planejamento",
        room: "Sala 2",
        startTime: "09:00",
        endTime: "11:00",
      },
      "3": {
        title: "Reunião de Planejamento",
        room: "Sala 3",
        startTime: "09:00",
        endTime: "11:00",
      },
    },
    "2022-01-03": {
      "1": {
        title: "Reunião de Planejamento",
        room: "Sala 1",
        startTime: "09:00",
        endTime: "11:00",
      },
      "2": {
        title: "Reunião de Planejamento",
        room: "Sala 2",
        startTime: "09:00",
        endTime: "11:00",
      },
      "3": {
        title: "Reunião de Planejamento",
        room: "Sala 3",
        startTime: "09:00",
        endTime: "11:00",
      },
    },
  };

  const calculateOccupancy = () => {
    const occupancy = ROOMS.map((room) => ({ name: room.name, occupancy: 0 }));

    Object.values(reservations).forEach((dayReservations) => {
      Object.values(dayReservations).forEach((reservation: Reservation) => {
        const roomIndex = occupancy.findIndex(
          (r) => r.name === reservation.room
        );
        if (roomIndex !== -1) {
          occupancy[roomIndex].occupancy += 1;
        }
      });
    });

    return occupancy;
  };

  const occupancyData = calculateOccupancy();

  const filteredReservations = Object.entries(reservations).flatMap(
    ([dateKey, dayReservations]) =>
      Object.values(dayReservations)
        .filter(
          (r: Reservation) => selectedRoom === "all" || r.room === selectedRoom
        )
        .map((reservation: Reservation) => ({
          date: new Date(dateKey).toLocaleDateString("pt-BR", {
            weekday: "short",
            day: "numeric",
            month: "short",
          }),
          ...reservation,
        }))
  );

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        Relatório de Ocupação das Salas
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Gráfico de Ocupação</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={occupancyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="occupancy" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Lista de Reservas</h3>
        <Select value={selectedRoom} onValueChange={setSelectedRoom}>
          <SelectTrigger className="w-[200px] mb-4">
            <SelectValue placeholder="Selecione uma sala" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as salas</SelectItem>
            {ROOMS.map((room) => (
              <SelectItem key={room.name} value={room.name}>
                {room.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Data</th>
                <th className="py-2 px-4 border-b text-left">Sala</th>
                <th className="py-2 px-4 border-b text-left">Título</th>
                <th className="py-2 px-4 border-b text-left">Horário</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{reservation.date}</td>
                  <td className="py-2 px-4 border-b">{reservation.room}</td>
                  <td className="py-2 px-4 border-b">{reservation.title}</td>
                  <td className="py-2 px-4 border-b">
                    {reservation.startTime} - {reservation.endTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
