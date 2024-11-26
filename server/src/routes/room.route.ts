// src/routes/rooms.ts
import { Router } from "express";
import { RoomRepository } from "../repositories/room.repository";
import { RoomUseCase } from "../usecases/room.usecase";

const router = Router();
const roomRepository = new RoomRepository();
const roomUsecase = new RoomUseCase(roomRepository);

// GET /rooms
router.get("/", async (req, res) => {
  const rooms = await roomUsecase.getRooms();
  res.json(rooms);
});

// GET /rooms/:roomId
router.get("/:roomId", async (req, res) => {
  const roomId = parseInt(req.params.roomId);
  const room = await roomUsecase.getRoomById(roomId);
  res.json(room);
});

// POST /rooms
router.post("/", async (req, res) => {
  const room = req.body;
  const newRoom = await roomUsecase.createRoom(room);
  res.json(newRoom);
});

// PUT /rooms/:roomId
router.put("/:roomId", async (req, res) => {
  const roomId = parseInt(req.params.roomId);
  const room = req.body;
  const updatedRoom = await roomUsecase.updateRoom(roomId, room);
  res.json(updatedRoom);
});

// DELETE /rooms/:roomId
router.delete("/:roomId", async (req, res) => {
  const roomId = parseInt(req.params.roomId);
  await roomUsecase.deleteRoom(roomId);
  res.json({ message: "Room deleted" });
});

export default router;
