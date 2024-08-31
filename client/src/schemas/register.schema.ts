import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "O nome deve ter no mínimo 3 caracteres.",
    })
    .max(255, {
      message: "O nome deve ter no máximo 255 caracteres.",
    }),
  email: z.string().email({ message: "O e-mail deve ser um formato válido." }),
  password: z.string().min(8, {
    message: "A senha deve ter no mínimo 8 caracteres.",
  }),
});
