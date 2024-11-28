import cors from "cors";
import express from "express";
import auditLogRoutes from "./routes/auditLog.route";
import authRoutes from "./routes/auth.route";
import bookingRoutes from "./routes/booking.route";
import roleRoutes from "./routes/role.route";
import roomRoutes from "./routes/room.route";
import userRoutes from "./routes/user.route";

const server = express();

server.use(cors());

server.use(express.json());

server.use("/users", userRoutes);
server.use("/bookings", bookingRoutes);
server.use("/rooms", roomRoutes);
server.use("/auth", authRoutes);
server.use("/auditlogs", auditLogRoutes);
server.use("/roles", roleRoutes);

export default server;
