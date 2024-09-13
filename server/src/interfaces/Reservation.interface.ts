import { Space, User } from "@prisma/client";
import { ReservationStatus } from "./enums";

export interface Reservation {
  id: number;
  userId: number;
  spaceId: number;
  startTime: Date;
  endTime: Date;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  space?: Space;
}
