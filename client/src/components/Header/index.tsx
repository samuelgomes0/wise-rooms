import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Header() {
  const isLogged = false;

  return (
    <header className="flex items-center justify-between py-4 relative">
      <span className="text-2xl font-bold">Astoria</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {isLogged ? (
            <DropdownMenuGroup>
              <Link href="/dashboard">
                <DropdownMenuItem className="cursor-pointer">
                  Reservar sala
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard">
                <DropdownMenuItem className="cursor-pointer">
                  Minhas reservas
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Sair
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : (
            <DropdownMenuGroup>
              <Link href="/cadastrar">
                <DropdownMenuItem className="cursor-pointer">
                  Cadastrar-se
                </DropdownMenuItem>
              </Link>
              <Link href="/entrar">
                <DropdownMenuItem className="cursor-pointer">
                  Entrar
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
