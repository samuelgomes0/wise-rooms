import { z } from "zod";

export const registerBookingSchema = z.object({
  user: z.string().min(1, "É necessário um responsável pela reserva."),
  room: z.string().min(1, "É necessário uma sala para a reserva."),
  date: z.date({
    required_error: "Selecione uma data para a reserva.",
  }),
  startTime: z
    .string({
      required_error: "Selecione o horário de início.",
    })
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Formato de horário inválido (HH:mm)."
    )
    .or(z.date()),
  endTime: z
    .string({
      required_error: "Selecione o horário de fim.",
    })
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Formato de horário inválido (HH:mm)."
    )
    .or(z.date()),
  description: z.string().optional(),
});
