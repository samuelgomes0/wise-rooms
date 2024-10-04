import { z } from "zod";

export const reservationSchema = z.object({
  responsible: z.string().min(1, "Nome do responsável é obrigatório"),
  room: z.string().min(1, "Nome da sala é obrigatório"),
  start: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido"),
  end: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido"),
  date: z.string().min(1, "Data é obrigatória"),
  status: z.enum([
    "Pendente",
    "Confirmado",
    "Ativo",
    "Completado",
    "Cancelado",
  ]),
});
