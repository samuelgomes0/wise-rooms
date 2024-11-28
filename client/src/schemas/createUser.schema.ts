import { z } from "zod";

const userCreationSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Informe um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  roleId: z.string().min(1, {
    message: "Selecione um cargo.",
  }),
});

export default userCreationSchema;
