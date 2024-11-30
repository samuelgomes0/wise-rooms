"use client";

import { Appointment } from "@/types/Appointment.interface";
import { useState } from "react";
import CalendarHeader from "./Header";
import { WeeklyView } from "./WeeklyView";

const sampleAppointments: Appointment[] = [
  { date: new Date(), time: "09:00", title: "Reunião com João", duration: 2 },
  { date: new Date(), time: "14:00", title: "Consulta Dentista", duration: 1 },
  { date: new Date(), time: "16:00", title: "Sync da Equipe", duration: 1 },
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <>
      <CalendarHeader />
      <div className=" mt-8">
        <WeeklyView startDate={currentDate} appointments={sampleAppointments} />
      </div>
    </>
  );
}
