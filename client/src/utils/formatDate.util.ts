import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date | string, formatString: string) =>
  format(parseISO(date.toString()), formatString, { locale: ptBR });
