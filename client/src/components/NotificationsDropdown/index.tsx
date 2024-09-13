"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellDotIcon, BellIcon } from "lucide-react";
import { useState } from "react";
import { CleanNotificationTooltip } from "../CleanNotificationsTooltip";
import { Button } from "../ui/button";

interface Notification {
  id: string;
  title: string;
  description: string;
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const cleanNotifications = () => {
    setNotifications([]);

    console.log("Notificações limpas");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        {notifications.length ? (
          <BellDotIcon size={20} />
        ) : (
          <BellIcon size={20} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-sm">
        <DropdownMenuGroup className="flex justify-between items-center">
          <DropdownMenuLabel>Notificações</DropdownMenuLabel>
          <Button variant="ghost" size="icon" onClick={cleanNotifications}>
            <CleanNotificationTooltip>
              Limpar notificações
            </CleanNotificationTooltip>
          </Button>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        {notifications.length ? (
          notifications.map((notification) => (
            <DropdownMenuItem
              className="flex flex-col items-start"
              key={notification.id}
            >
              <strong>{notification.title}</strong>
              <p>{notification.description}</p>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>Nenhuma notificação</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
