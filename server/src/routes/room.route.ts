// src/routes/rooms.ts
import { Router } from "express";
import { RoomRepository } from "../repositories/room.repository";
import { RoomUseCase } from "../usecases/room.usecase";

const router = Router();
const roomRepository = new RoomRepository();
const roomUsecase = new RoomUseCase(roomRepository);

router.post("/create", async (req, res) => {
  const { name, location, capacity, description } = req.body;

  try {
    const room = await roomUsecase.createRoom({
      name,
      location,
      capacity,
      description,
    });

    const response = {
      message: "Room created.",
      room,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

export default router;
