/* eslint-disable indent */
import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return (
        <Badge
          variant="outline"
          className="bg-green-200 text-green-800 border-none"
        >
          Confirmado
        </Badge>
      );
    case "ACTIVE":
      return (
        <Badge
          variant="default"
          className="bg-blue-200 text-blue-800 border-none"
        >
          Ativo
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge
          variant="secondary"
          className="bg-gray-200 text-gray-800 border-none"
        >
          Completado
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge
          variant="destructive"
          className="bg-red-200 text-red-800 border-none"
        >
          Cancelado
        </Badge>
      );
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-200 text-yellow-800 border-none"
        >
          Pendente
        </Badge>
      );
  }
};
