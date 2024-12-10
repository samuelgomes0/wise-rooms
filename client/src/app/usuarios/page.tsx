"use client";

import Footer from "@/components/Footer";
import { UserRegistrationForm } from "@/components/Forms/UserRegistrationForm";
import GenericTable from "@/components/GenericTable";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Notification, Role } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useToast } from "@/hooks/use-toast";
import roleServiceInstance from "@/services/RoleService";
import userServiceInstance from "@/services/UserService";
import { ApiError, IRole, IUser } from "@/types";
import { errorHandler, Filter } from "@/utils";
import { MoreHorizontalIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Usuarios() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    listUsers();
  };

  const [statusFilter, setStatusFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { user, isAuthenticated } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);

  const { filteredUsers, paginatedUsers, totalPages } = Filter.users({
    users,
    searchTerm,
    roleFilter: statusFilter,
    currentPage,
    itemsPerPage,
  });

  const listUsers = async () => {
    setIsLoading(true);
    const users = await userServiceInstance.listUsers();
    setUsers(users);
    setIsLoading(false);
  };

  const listRoles = async () => {
    const roles = await roleServiceInstance.listRoles();
    setRoles(roles);
  };

  const { toast } = useToast();

  const handleDeleteUser = async (id: string) => {
    try {
      await userServiceInstance.deleteUser(id);
      await listUsers();
      toast({
        title: Notification.SUCCESS.USER.DELETE_TITLE,
        description: Notification.SUCCESS.USER.DELETE_DESCRIPTION,
      });
    } catch (error) {
      const { title, description } = errorHandler(error as ApiError);
      toast({ variant: "destructive", title, description });
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return router.push("/");
    listUsers();
    listRoles();
  }, []);

  return (
    <div className="pt-8 w-4/5 mx-auto overflow-hidden flex flex-col justify-between h-screen">
      <main className="flex-1">
        <header className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Usuários</h1>
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
            <Button>
              <Modal
                title="Adicionar Novo Usuário"
                triggerText="+ Novo Usuário"
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
              >
                <UserRegistrationForm onCloseModal={handleModalClose} />
              </Modal>
            </Button>
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
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.name}>
                    {Role.label[role.name as keyof typeof Role.label]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </header>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <GenericTable
            columns={[
              { header: "Nome", accessor: "name" },
              { header: "E-mail", accessor: "email" },
              { header: "Cargo", accessor: "role" },
              { header: "Opções", accessor: "options" },
            ]}
            data={paginatedUsers.map((user) => ({
              ...user,
              role: Role.label[user.role.name as keyof typeof Role.label],
              options: (
                <Dialog>
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
                      <DropdownMenuItem>
                        <DialogTrigger asChild>
                          <span>Ver detalhes</span>
                        </DialogTrigger>
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        Editar usuário (em breve)
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Deletar usuário
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Detalhes do Usuário
                      </DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <DialogDescription className="text-back grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <strong>Código:</strong> {user.id}
                        </div>
                        <div className="flex flex-col">
                          <strong>Nome:</strong> {user.name}
                        </div>
                        <div className="flex flex-col">
                          <strong>E-mail:</strong> {user.email}
                        </div>
                        <div className="flex flex-col">
                          <strong>Cargo:</strong> {user.role.name}
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
            Exibindo {paginatedUsers.length} de {filteredUsers.length} usuários
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
