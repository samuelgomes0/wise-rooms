"use client";

import GenericModal from "@/components/GenericModal";
import GenericTable from "@/components/GenericTable";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRegistrationForm } from "@/components/Users/UserRegistrationForm";
import { AuthContext } from "@/contexts/AuthContext";
import userServiceInstance from "@/services/UserService";
import { IUser } from "@/types";
import { ERoles } from "@/types/Roles.enum";
import { MoreHorizontalIcon, SearchIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export default function Usuarios() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    listUsers();
  };

  const [statusFilter, setStatusFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { user } = useContext(AuthContext);

  const filteredUsers = users.filter(
    (user) =>
      user.id.toString().includes(searchTerm) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const listUsers = () => {
    userServiceInstance.listUsers().then(({ data }) => {
      setUsers(data);
    });
  };

  const handleDeleteUser = (id: string) => {
    userServiceInstance.deleteUser(id).then(() => {
      listUsers();
    });
  };

  useEffect(() => {
    userServiceInstance.listUsers().then(({ data }) => {
      setUsers(data);
    });
  }, []);

  return (
    <div className="flex p-4 w-full">
      <main className="flex-1">
        <header className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Usuários</h1>
                <p className="text-sm text-gray-500">
                  {ERoles[user?.roleId as unknown as keyof typeof ERoles]}
                </p>
              </div>
            </div>
            <GenericModal
              title="Adicionar Novo Usuário"
              triggerText="+ Novo Usuário"
              isOpen={isModalOpen}
              onOpenChange={setIsModalOpen}
            >
              <UserRegistrationForm onCloseModal={handleModalClose} />
            </GenericModal>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-4 relative flex-1">
              <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <SearchFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Buscar por código, nome ou e-mail"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os cargos</SelectItem>
                <SelectItem value="viewer">Visualizador</SelectItem>
                <SelectItem value="operator">Operador</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <GenericTable
            columns={[
              { header: "Código", accessor: "id" },
              { header: "Nome", accessor: "name" },
              { header: "E-mail", accessor: "email" },
              { header: "Cargo", accessor: "role" },
              { header: "Opções", accessor: "options" },
            ]}
            data={paginatedUsers.map((user) => ({
              ...user,
              role: ERoles[user.roleId],
              options: (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="w-12 h-full"
                      variant="ghost"
                      aria-label="Ações do usuário"
                    >
                      <MoreHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Editar usuário</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Deletar usuário
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            }))}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Exibindo {paginatedUsers.length} de {filteredUsers.length} usuários
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
