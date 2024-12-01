import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AuthContext } from "@/contexts/AuthContext";
import {
  CalendarIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  HammerIcon,
  HouseIcon,
  MapPinCheckIcon,
  UserCog2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export function SidebarNav() {
  const { user, isAuthenticated } = useContext(AuthContext);

  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const mainNavItems = [
    { label: "Calendário", icon: CalendarIcon, path: "/" },
    {
      label: "Minhas reservas",
      icon: ClipboardCheckIcon,
      path: "/minhas-reservas",
    },
  ];

  const managementNavItems = [
    { label: "Reservas", icon: MapPinCheckIcon, path: "/reservas" },
    { label: "Salas", icon: HouseIcon, path: "/salas" },
    { label: "Recursos", icon: HammerIcon, path: "/recursos" },
    { label: "Usuários", icon: UserCog2Icon, path: "/usuarios" },
    { label: "Auditoria", icon: ClipboardListIcon, path: "/auditoria" },
  ];

  return (
    <nav className="p-4">
      <ul className="space-y-2">
        {mainNavItems.map(({ label, icon: Icon, path }) => (
          <li key={label}>
            {label === "Minhas reservas" && !isAuthenticated ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="!pointer-events-auto">
                    <Button
                      disabled={label === "Minhas reservas" && !isAuthenticated}
                      variant="ghost"
                      className={`w-full justify-start ${isActive(path) ? "bg-gray-100" : ""}`}
                      aria-current={isActive(path) ? "page" : undefined}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="text-sm">
                    Faça login para acessar
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Link href={path} aria-hidden>
                <Button
                  disabled={label === "Minhas reservas" && !isAuthenticated}
                  variant="ghost"
                  className={`w-full justify-start ${isActive(path) ? "bg-gray-100" : ""}`}
                  aria-current={isActive(path) ? "page" : undefined}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </Button>
              </Link>
            )}
          </li>
        ))}
        {isAuthenticated && user?.roleId === 1 && (
          <>
            <h3 className="font-bold text-sm py-2">Gerenciamento</h3>
            {managementNavItems.map(({ label, icon: Icon, path }) => (
              <li key={label}>
                <Link href={label === "Auditoria" ? "#" : path} aria-hidden>
                  <Button
                    disabled={label === "Auditoria"}
                    variant="ghost"
                    className={`w-full justify-start ${isActive(path) ? "bg-gray-100" : ""}`}
                    aria-current={isActive(path) ? "page" : undefined}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Button>
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </nav>
  );
}
