import { Item, Space } from "@prisma/client";

export interface SpaceItem {
  id: number;
  spaceId: number;
  itemId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  space?: Space;
  item?: Item;
}
