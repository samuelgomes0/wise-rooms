import { CreateBookingModal } from "@/components/CreateBookingModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

type HeaderProps = {
  userInitials: string;
  headerTitle: string;
  userRole: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
};

export function Header({
  userInitials,
  headerTitle,
  userRole,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}: HeaderProps) {
  return (
    <header className="flex justify-between flex-col mb-4 bg-white p-4 shadow rounded gap-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-white border rounded-full">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{headerTitle}</h1>
            <p className="text-gray-500">{userRole}</p>
          </div>
        </div>
        <CreateBookingModal isPage={headerTitle} />
      </div>
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            className="pl-10"
            placeholder="Buscar por reserva, responsável ou sala"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Pendente">Pendente</SelectItem>
            <SelectItem value="Confirmado">Confirmado</SelectItem>
            <SelectItem value="Ativo">Ativo</SelectItem>
            <SelectItem value="Completado">Completado</SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="max-w-xs"
        />
      </div>
    </header>
  );
}
