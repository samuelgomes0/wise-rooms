import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function GenericModal({
  title,
  triggerText,
  children,
}: {
  title: string;
  triggerText: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para continuar.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default GenericModal;
