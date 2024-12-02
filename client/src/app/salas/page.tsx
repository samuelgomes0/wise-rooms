"use client";

import GenericModal from "@/components/GenericModal";
import GenericTable from "@/components/GenericTable";
import Pagination from "@/components/Pagination";
import { RoomRegistrationForm } from "@/components/Rooms/RoomRegistrationForm";
import SearchFilter from "@/components/SearchFilter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/contexts/AuthContext";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useToast } from "@/hooks/use-toast";
import roomServiceInstance from "@/services/RoomService";
import { ApiError } from "@/types";
import { IRoom } from "@/types/Room.interface";
import { errorHandler, Filter } from "@/utils";
import { MoreHorizontalIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Salas() {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    listRooms();
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { user, isAuthenticated } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);

  const { toast } = useToast();

  const { filteredRooms, paginatedRooms, totalPages } = Filter.rooms({
    rooms,
    searchTerm,
    currentPage,
    itemsPerPage,
  });

  const handleDeleteRoom = async (roomId: number) => {
    try {
      await roomServiceInstance.deleteRoom(roomId);
      setRooms(rooms.filter((room) => room.id !== roomId));
    } catch (error) {
      const { title, description } = errorHandler(error as ApiError);
      toast({ variant: "destructive", title, description });
    }
  };

  const listRooms = async () => {
    setIsLoading(true);
    const rooms = await roomServiceInstance.listRooms();
    setRooms(rooms);
    setIsLoading(false);
  };

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return router.push("/");
    listRooms();
  }, []);

  return (
    <div className="py-8 w-4/5 mx-auto overflow-hidden">
      <main className="flex-1">
        <header className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Salas</h1>
                <p className="text-sm text-read">{user?.role.name}</p>
              </div>
            </div>
            <GenericModal
              title="Adicionar Nova Sala"
              triggerText="+ Nova Sala"
              isOpen={isModalOpen}
              onOpenChange={setIsModalOpen}
            >
              <RoomRegistrationForm onCloseModal={handleModalClose} />
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
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                <Dialog>
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
                      <DropdownMenuItem>
                        <DialogTrigger asChild>
                          <span>Ver detalhes</span>
                        </DialogTrigger>
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>Editar sala</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        Deletar sala
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Detalhes da Sala
                      </DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <DialogDescription className="text-back grid grid-cols-1 grid-row-3 gap-4">
                      <div className="grid grid-cols-3 items-center justify-between">
                        <div className="flex flex-col">
                          <strong>ID</strong> {room.id}
                        </div>
                        <div className="flex flex-col">
                          <strong>Nome</strong> {room.name}
                        </div>
                        <div className="flex flex-col">
                          <strong>Capacidade</strong> {room.capacity}
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col break-words">
                          <strong>Descrição</strong>{" "}
                          {room.description || "Sem descrição"}
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
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
