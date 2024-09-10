import { SpaceItem } from "@prisma/client";

export interface Item {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  spaceItems?: SpaceItem[];
}
