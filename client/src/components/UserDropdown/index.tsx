import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle2Icon } from "lucide-react";
import Link from "next/link";

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <UserCircle2Icon size={20} />
        Samuel Gomes
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link className="hover:no-underline" href="/perfil">
          <DropdownMenuItem>Perfil</DropdownMenuItem>
        </Link>
        <Link className="hover:no-underline" href="/reservas">
          <DropdownMenuItem>Reservas</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
