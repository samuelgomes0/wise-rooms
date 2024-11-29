import { Express } from "express";
import auditLogRoutes from "./auditLog.route";
import authRoutes from "./auth.route";
import bookingRoutes from "./booking.route";
import resourceRoutes from "./resource.route";
import roleRoutes from "./role.route";
import roomRoutes from "./room.route";
import userRoutes from "./user.route";

export default (server: Express) => {
  server.use("/auditlogs", auditLogRoutes);
  server.use("/auth", authRoutes);
  server.use("/bookings", bookingRoutes);
  server.use("/resources", resourceRoutes);
  server.use("/roles", roleRoutes);
  server.use("/rooms", roomRoutes);
  server.use("/users", userRoutes);
};
