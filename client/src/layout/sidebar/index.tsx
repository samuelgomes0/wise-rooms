import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMain,
  SidebarNav,
  SidebarNavList,
  SidebarNavListLink,
} from "@/components/Sidebar/sidebar";
import { ClipboardListIcon, SettingsIcon } from "lucide-react";

export function SidebarLayout() {
  return (
    <Sidebar>
      <SidebarHeader>Header</SidebarHeader>
      <SidebarMain>
        <SidebarNav>
          <SidebarNavList>
            <SidebarNavListLink href="/reservas">
              <ClipboardListIcon size={20} /> Reservas
            </SidebarNavListLink>
            <SidebarNavListLink href="/configuracoes">
              <SettingsIcon size={20} /> Configurações
            </SidebarNavListLink>
          </SidebarNavList>
        </SidebarNav>
      </SidebarMain>
      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>
  );
}
