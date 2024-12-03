"use client";

import GenericModal from "@/components/GenericModal";
import GenericTable from "@/components/GenericTable";
import Pagination from "@/components/Pagination";
import { ResourceRegistrationForm } from "@/components/Resources/ResourceRegistrationForm";
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
import { Notification } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useToast } from "@/hooks/use-toast";
import resourceServiceInstance from "@/services/ResourceService";
import { ApiError } from "@/types";
import { IResource } from "@/types/Resource.interface";
import { resourceTypes } from "@/types/resourceTypes.enum";
import { errorHandler } from "@/utils";
import { MoreHorizontalIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Recursos() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = async () => {
    setIsModalOpen(false);
    await listResources();
  };

  const [resources, setResources] = useState<IResource[]>([]);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { user, isAuthenticated } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);

  const filteredResources = resources.filter(
    (resource) =>
      resource.id.toString().includes(searchTerm) ||
      resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  const listResources = async () => {
    setIsLoading(true);

    try {
      const resources = await resourceServiceInstance.listResources();

      setResources(resources);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { toast } = useToast();

  const handleDeleteResource = async (id: number) => {
    setIsLoading(true);

    try {
      await resourceServiceInstance.deleteResource(id);
      await listResources();
      toast({
        title: Notification.SUCCESS.RESOURCE.DELETE_TITLE,
        description: Notification.SUCCESS.RESOURCE.DELETE_DESCRIPTION,
      });
    } catch (error) {
      const { title, description } = errorHandler(error as ApiError);
      toast({ variant: "destructive", title, description });
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return router.push("/");
    listResources();
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
                <h1 className="text-2xl font-bold">Recursos</h1>
                <div className="text-sm text-read">
                  {user?.role.name ? (
                    <span>{user?.role.name}</span>
                  ) : (
                    <Skeleton className="w-24 h-3" />
                  )}
                </div>
              </div>
            </div>
            <GenericModal
              title="Adicionar Novo Recurso"
              triggerText="+ Novo Recurso"
              isOpen={isModalOpen}
              onOpenChange={setIsModalOpen}
            >
              <ResourceRegistrationForm onCloseModal={handleModalClose} />
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
                placeholder="Buscar por código ou nome"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os tipos</SelectItem>
                {resourceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </header>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <GenericTable
            columns={[
              { header: "Código", accessor: "id" },
              { header: "Nome", accessor: "name" },
              { header: "Quantidade", accessor: "quantity" },
              { header: "Opções", accessor: "options" },
            ]}
            data={paginatedResources.map((resource) => ({
              ...resource,
              options: (
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="w-12 h-full"
                        variant="ghost"
                        aria-label="Ações do recurso"
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
                        Editar recurso (em breve)
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteResource(resource.id)}
                      >
                        Deletar recurso
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Detalhes do Recurso
                      </DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <DialogDescription className="text-back grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col">
                          <strong>Código:</strong> {resource.id}
                        </div>
                        <div className="flex flex-col">
                          <strong>Nome:</strong> {resource.name}
                        </div>
                      </div>
                      <div className="flex flex-col break-words">
                        <strong>Descrição:</strong>{" "}
                        {resource.description || "Sem descrição"}
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
            Exibindo {paginatedResources.length} de {filteredResources.length}{" "}
            recursos
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
