"use client";

import { Appointment } from "@/types/Appointment.interface";
import { useState } from "react";
import CalendarHeader from "../Header";
import { WeeklyView } from "../WeeklyView";

const sampleAppointments: Appointment[] = [
  { date: new Date(), time: "09:00", title: "Reunião com João", duration: 2 },
  { date: new Date(), time: "14:00", title: "Consulta Dentista", duration: 1 },
  { date: new Date(), time: "16:00", title: "Sync da Equipe", duration: 1 },
];

export function MultiViewCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="w-4/5 mx-auto rounded-lg overflow-hidden">
      <CalendarHeader />
      <div className=" mt-8">
        <WeeklyView startDate={currentDate} appointments={sampleAppointments} />
      </div>
    </div>
  );
}
