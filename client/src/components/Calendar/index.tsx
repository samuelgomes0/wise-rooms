"use client";

import { LoadingContext } from "@/contexts/LoadingContext";
import { useToast } from "@/hooks/use-toast";
import bookingServiceInstance from "@/services/BookingService";
import { ApiError, IBooking } from "@/types";
import { errorHandler } from "@/utils";
import { useContext, useEffect, useState } from "react";
import CalendarHeader from "./Header";
import { WeeklyView } from "./WeeklyView";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const { setIsLoading } = useContext(LoadingContext);

  const { toast } = useToast();

  const listBookings = async () => {
    try {
      setIsLoading(true);
      const data = await bookingServiceInstance.listBookings();
      setBookings(data);
    } catch (error) {
      const { title, description } = errorHandler(error as ApiError);
      toast({ variant: "destructive", title, description });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingCreated = async () => {
    listBookings();
  };

  useEffect(() => {
    listBookings();
  }, []);

  return (
    <div className="relative">
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        onBookingCreated={handleBookingCreated}
      />
      <WeeklyView startDate={currentDate} bookings={bookings} />
    </div>
  );
}
