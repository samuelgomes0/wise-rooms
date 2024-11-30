"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarNav } from "../SidebarNav";
import { UserDropdown } from "../UserDropdown";

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathName = usePathname();

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sticky top-0 z-50 w-72 h-screen bg-white shadow transition-transform duration-300 ease-in-out lg:translate-x-0 ${pathName === "/entrar" ? "hidden" : "block"}`}
      role="navigation"
    >
      <div className="flex items-center justify-between p-4">
        <span className="text-2xl font-bold">wise.rooms</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
          aria-label="Close Sidebar"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <SidebarNav />
      <div className="absolute bottom-0 w-full p-4 border-t">
        <UserDropdown />
      </div>
    </aside>
  );
}
