import { Express } from "express";
import errorHandler from "../middlewares/errorHandler.middleware";
import auditLogRoutes from "./auditLog.route";
import authRoutes from "./auth.route";
import bookingRoutes from "./booking.route";
import permissionRoutes from "./permission.route";
import resourceRoutes from "./resource.route";
import roleRoutes from "./role.route";
import roomRoutes from "./room.route";
import userRoutes from "./user.route";

export default (server: Express) => {
  server.use("/api/auditlogs", auditLogRoutes);
  server.use("/api/auth", authRoutes);
  server.use("/api/bookings", bookingRoutes);
  server.use("/api/resources", resourceRoutes);
  server.use("/api/roles", roleRoutes);
  server.use("/api/rooms", roomRoutes);
  server.use("/api/users", userRoutes);
  server.use("/api/permissions", permissionRoutes);

  server.use(errorHandler);
};
