import { Reservation, SpaceItem } from "@prisma/client";
import { SpaceAvailability } from "./enums"; // Import enum if needed

export interface Space {
  id: number;
  name: string;
  description?: string;
  location?: string;
  capacity?: number;
  available: SpaceAvailability;
  createdAt: Date;
  updatedAt: Date;
  reservations?: Reservation[];
  spaceItems?: SpaceItem[];
}
