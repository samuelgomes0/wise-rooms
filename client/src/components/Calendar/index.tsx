"use client";

import bookingServiceInstance from "@/services/BookingService";
import { IBooking } from "@/types";
import { useEffect, useState } from "react";
import CalendarHeader from "./Header";
import { WeeklyView } from "./WeeklyView";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const listBookings = async () => {
    const data = await bookingServiceInstance.listBookings();
    setBookings(data);
  };

  const handleBookingCreated = async () => {
    listBookings();
  };

  useEffect(() => {
    listBookings();
  }, [currentDate]);

  return (
    <>
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        onBookingCreated={handleBookingCreated}
      />
      <WeeklyView startDate={currentDate} bookings={bookings} />
    </>
  );
}
