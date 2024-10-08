import { Router } from "express";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingUseCase } from "../usecases/booking.usecase";

const router = Router();
const bookingRepository = new BookingRepository();
const bookingUseCase = new BookingUseCase(bookingRepository);

router.post("/create", async (req, res) => {
  const { userId, roomId, bookingDate, startTime, endTime } = req.body;

  try {
    const booking = await bookingUseCase.createBooking({
      userId,
      roomId,
      bookingDate,
      startTime,
      endTime,
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

export default router;
