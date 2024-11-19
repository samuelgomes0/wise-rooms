import { Router } from "express";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingUseCase } from "../usecases/booking.usecase";

const router = Router();
const bookingRepository = new BookingRepository();
const bookingUseCase = new BookingUseCase(bookingRepository);

router.post("/create", async (req, res) => {
  const { userId, roomId, date, startTime, endTime } = req.body;

  if (!userId || !roomId || !date || !startTime || !endTime) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const booking = await bookingUseCase.createBooking({
      userId,
      roomId,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    const response = {
      message: "Booking created.",
      booking,
    };

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await bookingRepository.getAll();

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

export default router;
