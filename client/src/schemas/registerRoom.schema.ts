import { z } from "zod";

export const registerRoomSchema = z.object({
  name: z.string().min(1, "É necessário um nome para a sala."),
  capacity: z.number().gt(0, "A capacidade da sala deve ser maior que 0."),

  description: z.string().optional(),
});
