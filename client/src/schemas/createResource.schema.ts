import { z } from "zod";

const createResourceSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do recurso deve ter pelo menos 2 caracteres.",
  }),
  type: z.string().min(1, {
    message: "Selecione o tipo do recurso.",
  }),
  quantity: z
    .number({ invalid_type_error: "Informe a quantidade como um número." })
    .min(1, { message: "A quantidade deve ser pelo menos 1." }),
  description: z.string().optional(),
  allocatedRoom: z.string().min(1, {
    message: "Selecione uma sala para alocar o recurso.",
  }),
});

export default createResourceSchema;
