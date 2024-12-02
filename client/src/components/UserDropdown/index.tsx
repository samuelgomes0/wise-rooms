"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notification } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ChevronDownIcon, LogOutIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export function UserDropdown() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  const { toast } = useToast();

  const handleLogout = () => {
    signOut();
    toast({
      title: Notification.SUCCESS.LOGOUT.TITLE,
      description: Notification.SUCCESS.LOGOUT.DESCRIPTION,
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between truncate"
              aria-label="Menu do usuário"
            >
              <User2Icon className="mr-2 flex-shrink-0" size={20} />
              <span className="truncate mr-2">{user?.name}</span>
              <ChevronDownIcon size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Perfil (em breve)</DropdownMenuItem>
            <DropdownMenuItem disabled>
              Configurações (em breve)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
              <LogOutIcon className="mr-2" size={16} />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/entrar">
          <Button variant="outline" className="w-full">
            Entrar
          </Button>
        </Link>
      )}
    </>
  );
}
