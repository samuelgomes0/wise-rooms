import { Button } from "@/components/ui/button";
import { CalendarIcon, ClipboardIcon, Home, UserCog2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const mainNavItems = [
    { label: "Dashboard", icon: Home, path: "/" },
    { label: "Calendário", icon: CalendarIcon, path: "/calendario" },
  ];

  const managementNavItems = [
    { label: "Reservas", icon: ClipboardIcon, path: "/reservas" },
    { label: "Usuários", icon: UserCog2, path: "/usuarios" },
  ];

  return (
    <nav className="p-4">
      <ul className="space-y-2">
        {mainNavItems.map(({ label, icon: Icon, path }) => (
          <li key={label}>
            <Link href={path}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${isActive(path) ? "bg-gray-200 font-semibold" : ""}`}
                aria-current={isActive(path) ? "page" : undefined}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            </Link>
          </li>
        ))}
        <h3 className="font-bold text-sm py-2">Gerenciamento</h3>
        {managementNavItems.map(({ label, icon: Icon, path }) => (
          <li key={label}>
            <Link href={path}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${isActive(path) ? "bg-gray-200" : ""}`}
                aria-current={isActive(path) ? "page" : undefined}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}