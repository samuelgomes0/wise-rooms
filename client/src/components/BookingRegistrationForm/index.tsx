"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import bookingServiceInstance from "@/services/BookingService";
import userServiceInstance from "@/services/UserService";
import { useEffect, useState } from "react";

const formSchema = z.object({
  user: z.string().min(1, "É necessário um responsável pela reserva."),
  room: z.string().min(1, "É necessário uma sala para a reserva."),
  date: z.date({
    required_error: "Selecione uma data para a reserva.",
  }),
  startTime: z.date({
    required_error: "Selecione um horário de início.",
  }),
  endTime: z.date({
    required_error: "Selecione um horário de fim.",
  }),
});

export function BookingRegistrationForm() {
  const [users, setUsers] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      room: "",
      date: undefined,
      startTime: undefined,
      endTime: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dateISO = values.date.toISOString().split("T")[0]; // Captura apenas a parte da data (YYYY-MM-DD)

    // Combina a data com os horários
    const timeStartDate = new Date(`${dateISO}T${values.startTime}:00`);
    const timeEndDate = new Date(`${dateISO}T${values.endTime}:00`);

    console.log({
      userId: "cm3nke2ld0000enx07jihovpd", // Substitua com o ID real
      roomId: 1, // Substitua com o ID real
      date: values.date.toISOString(),
      startTime: timeStartDate.toISOString(),
      endTime: timeEndDate.toISOString(),
    });

    try {
      await bookingServiceInstance.create({
        userId: "cm3nke2ld0000enx07jihovpd", // Substitua com o ID real
        roomId: 1, // Substitua com o ID real
        date: values.date,
        startTime: timeStartDate,
        endTime: timeEndDate,
      });
      alert("Reserva criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
    }
  }

  useEffect(() => {
    userServiceInstance.getAll().then(({ data }) => {
      console.log(data.users);
    });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="guest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsável</FormLabel>
              <FormControl>
                <Input placeholder="Nome do responsável" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sala</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma sala" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sala1">Sala 1</SelectItem>
                  <SelectItem value="sala2">Sala 2</SelectItem>
                  <SelectItem value="sala3">Sala 3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data da Reserva</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date("2100-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Horário de Início</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem
                        key={hour}
                        value={`${hour.toString().padStart(2, "0")}:00`}
                      >
                        {`${hour.toString().padStart(2, "0")}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Horário de Fim</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem
                        key={hour}
                        value={`${hour.toString().padStart(2, "0")}:00`}
                      >
                        {`${hour.toString().padStart(2, "0")}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Criar Reserva</Button>
      </form>
    </Form>
  );
}
