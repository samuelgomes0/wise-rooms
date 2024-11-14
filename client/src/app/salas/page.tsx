"use client";

import GenericModal from "@/components/GenericModal";
import GenericTable from "@/components/GenericTable";
import Pagination from "@/components/Pagination";
import { RoomRegistrationForm } from "@/components/RoomRegistrationForm";
import SearchFilter from "@/components/SearchFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Salas() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRooms = rooms.filter(
    (room) =>
      room.id.toString().includes(searchTerm) ||
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  return (
    <div className="flex p-4 w-full">
      <main className="flex-1">
        <header className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/51432896?v=4"
                  alt="Avatar"
                />
                <AvatarFallback>SG</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Salas</h1>
                <p className="text-sm text-gray-500">Administrador</p>
              </div>
            </div>
            <GenericModal title="Adicionar Nova Sala" triggerText="+ Nova Sala">
              <RoomRegistrationForm />
            </GenericModal>
          </div>
          <div className="flex gap-4 relative">
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Buscar por código, nome ou descrição"
            />
          </div>
        </header>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <GenericTable
            columns={[
              { header: "Código", accessor: "id" },
              { header: "Nome", accessor: "name" },
              { header: "Descrição", accessor: "description" },
              { header: "Capacidade", accessor: "capacity" },
              { header: "Opções", accessor: "options" },
            ]}
            data={paginatedRooms.map((room) => ({
              ...room,
              options: (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="w-12 h-full"
                      variant="ghost"
                      aria-label="Ações da sala"
                    >
                      <MoreHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Editar sala</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Deletar sala
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            }))}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Exibindo {paginatedRooms.length} de {filteredRooms.length} salas
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
