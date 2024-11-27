// src/routes/rooms.ts
import { AuditAction, AuditEntity } from "@prisma/client";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { AuditLogRepository } from "../repositories/auditLog.repository";
import { RoomRepository } from "../repositories/room.repository";
import { AuditLogUseCase } from "../usecases/auditLog.usecase";
import { RoomUseCase } from "../usecases/room.usecase";

const router = Router();
const roomRepository = new RoomRepository();
const roomUseCase = new RoomUseCase(roomRepository);

const auditLogRepository = new AuditLogRepository();
const auditLogUseCase = new AuditLogUseCase(auditLogRepository);

// GET /rooms
router.get("/", async (req, res) => {
  const rooms = await roomUseCase.getRooms();
  res.json(rooms);
});

// GET /rooms/:roomId
router.get("/:roomId", async (req, res) => {
  const roomId = parseInt(req.params.roomId);
  const room = await roomUseCase.getRoomById(roomId);
  res.json(room);
});

// POST /rooms
router.post("/", isAuthenticated, async (req: any, res) => {
  const { name, location, capacity, description } = req.body;

  if (!name || !location || !capacity) {
    return res
      .status(400)
      .json({ error: "Name, location, and capacity are required" });
  }

  try {
    const room = await roomUseCase.createRoom({
      name,
      location,
      capacity,
      description,
    });

    const response = {
      message: "Room created",
      room,
    };

    const { id: performedBy } = req.user;

    await auditLogUseCase.createAuditLog({
      userId: performedBy,
      action: AuditAction.CREATE,
      entity: AuditEntity.ROOM,
      entityId: String(room.id),
    });

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// PUT /rooms/:roomId
router.put("/:roomId", isAuthenticated, async (req: any, res) => {
  const roomId = parseInt(req.params.roomId);
  const { name, location, capacity, description } = req.body;

  if (!name || !location || !capacity) {
    return res
      .status(400)
      .json({ error: "Name, location, and capacity are required" });
  }

  try {
    const room = await roomUseCase.updateRoom(roomId, {
      name,
      location,
      capacity,
      description,
    });

    const response = {
      message: "Room updated",
      room,
    };

    const { id: performedBy } = req.user;

    await auditLogUseCase.createAuditLog({
      userId: performedBy,
      action: AuditAction.UPDATE,
      entity: AuditEntity.ROOM,
      entityId: String(room.id),
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

// DELETE /rooms/:roomId
router.delete("/:roomId", isAuthenticated, async (req: any, res) => {
  const roomId = parseInt(req.params.roomId);

  try {
    await roomUseCase.deleteRoom(roomId);

    const { id: performedBy } = req.user;

    await auditLogUseCase.createAuditLog({
      userId: performedBy,
      action: AuditAction.DELETE,
      entity: AuditEntity.ROOM,
      entityId: String(roomId),
    });

    return res.status(204).send({ message: "Room deleted." });
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
});

export default router;
