import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2Icon } from "lucide-react";

export function CleanNotificationTooltip({ children }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Trash2Icon size={16} />
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
