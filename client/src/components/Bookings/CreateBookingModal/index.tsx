"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CreateBookingModalProps = {
  pageType: string;
};

type FormRowProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
};

function FormRow({ label, htmlFor, children }: FormRowProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={htmlFor} className="text-right">
        {label}
      </Label>
      {children}
    </div>
  );
}

export function CreateBookingModal({ pageType }: CreateBookingModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          + {pageType === "Reservas" ? "Nova Reserva" : "Novo Recurso"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {pageType === "Reservas" ? "Nova Reserva" : "Novo Recurso"}
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para fazer uma nova{" "}
            {pageType === "Reservas" ? "reserva" : "adicionar recurso"}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormRow label="Sala" htmlFor="sala">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma sala" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Salas Disponíveis</SelectLabel>
                  <SelectItem value="sala1">Sala 1</SelectItem>
                  <SelectItem value="sala2">Sala 2</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormRow>
          <FormRow label="Responsável" htmlFor="responsavel">
            <Input id="responsavel" className="col-span-3" />
          </FormRow>
          <FormRow label="Data" htmlFor="data">
            <Input id="data" type="date" className="col-span-3" />
          </FormRow>
          <FormRow label="Início" htmlFor="inicio">
            <Input id="inicio" type="time" className="col-span-3" />
          </FormRow>
          <FormRow label="Fim" htmlFor="fim">
            <Input id="fim" type="time" className="col-span-3" />
          </FormRow>
        </div>
        <Button>
          Confirmar {pageType === "Reservas" ? "Reserva" : "Recurso"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
