"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "João Silva", email: "joao@example.com" },
    { id: 2, name: "Maria Santos", email: "maria@example.com" },
  ]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const handleCreateUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: "", email: "" });
    }
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
      setEditingUser(null);
    }
  };

  const handleDeleteUser = () => {
    if (deleteUserId) {
      setUsers(users.filter((user) => user.id !== deleteUserId));
      setDeleteUserId(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Usuários</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          {editingUser ? "Editar Usuário" : "Criar Novo Usuário"}
        </h2>
        <div className="flex gap-2">
          <Input
            placeholder="Nome"
            value={editingUser ? editingUser.name : newUser.name}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, name: e.target.value })
                : setNewUser({ ...newUser, name: e.target.value })
            }
          />
          <Input
            placeholder="Email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, email: e.target.value })
                : setNewUser({ ...newUser, email: e.target.value })
            }
          />
          <Button onClick={editingUser ? handleUpdateUser : handleCreateUser}>
            {editingUser ? "Atualizar" : "Criar"}
          </Button>
          {editingUser && (
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancelar
            </Button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditingUser(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDeleteUserId(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmar exclusão</DialogTitle>
                        <DialogDescription>
                          Tem certeza que deseja excluir o usuário {user.name}?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setDeleteUserId(null)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteUser}
                        >
                          Excluir
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
