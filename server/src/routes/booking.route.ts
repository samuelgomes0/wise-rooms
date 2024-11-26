import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingUseCase } from "../usecases/booking.usecase";

const router = Router();
const bookingRepository = new BookingRepository();
const bookingUseCase = new BookingUseCase(bookingRepository);

// GET /bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await bookingRepository.listBookings();

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// GET /bookings/:bookingId
router.get("/:bookingId", async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await bookingRepository.findBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// GET /bookings/user/:userId
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await bookingRepository.findBookingByUser(userId);

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// POST /bookings
router.post("/", isAuthenticated, async (req, res) => {
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

// PUT /bookings/:bookingId
router.put("/:bookingId", isAuthenticated, async (req, res) => {
  const { bookingId } = req.params;
  const { userId, roomId, date, startTime, endTime } = req.body;

  if (!userId || !roomId || !date || !startTime || !endTime) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const booking = await bookingUseCase.updateBooking(bookingId, {
      userId,
      roomId,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    const response = {
      message: "Booking updated.",
      booking,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// DELETE /bookings/:bookingId
router.delete("/:bookingId", isAuthenticated, async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await bookingUseCase.deleteBooking(bookingId);

    const response = {
      message: "Booking deleted.",
      booking,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

export default router;
