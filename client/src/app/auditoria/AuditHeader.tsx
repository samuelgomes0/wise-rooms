import SearchFilter from "@/components/SearchFilter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Role } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { IAuditLog } from "@/types";
import { Filter } from "@/utils";
import { ptBR } from "date-fns/locale";
import { Calendar, CalendarIcon, SearchIcon } from "lucide-react";
import { format } from "path";
import { useContext, useState } from "react";
import { Button } from "react-day-picker";

function AuditHeader() {
  const [auditLogs, setAuditLogs] = useState<IAuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("Todas");
  const [dateFilter, setDateFilter] = useState<Date | undefined>();

  const { filteredAuditLogs, paginatedAuditLogs, totalPages } =
    Filter.auditLogs({
      auditLogs,
      searchTerm,
      dateFilter,
      currentPage,
      itemsPerPage,
    });

  const { user } = useContext(AuthContext);

  return (
    <header>
      <header className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{user?.name[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Auditoria</h1>
              <div className="text-sm text-read">
                {user?.role.name ? (
                  <span>
                    {Role.label[user.role.name as keyof typeof Role.label]}
                  </span>
                ) : (
                  <Skeleton className="w-24 h-3" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 relative">
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Buscar por usuário"
          />
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-start text-left font-normal"
                >
                  {dateFilter ? (
                    format(dateFilter, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todas">Todas</SelectItem>
              <SelectItem value="Criar">Criar</SelectItem>
              <SelectItem value="Atualizar">Atualizar</SelectItem>
              <SelectItem value="Deletar">Deletar</SelectItem>
            </SelectContent>
          </Select>
          <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todas">Todas</SelectItem>
              <SelectItem value="Criar">Criar</SelectItem>
              <SelectItem value="Atualizar">Atualizar</SelectItem>
              <SelectItem value="Deletar">Deletar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
    </header>
  );
}

export default AuditHeader;
