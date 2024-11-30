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
import { registerBookingSchema } from "@/schemas";
import bookingServiceInstance from "@/services/BookingService";
import roomServiceInstance from "@/services/RoomService";
import userServiceInstance from "@/services/UserService";
import { IUser } from "@/types";
import { IRoom } from "@/types/Room.interface";
import { useEffect, useState } from "react";

export function BookingRegistrationForm({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const form = useForm<z.infer<typeof registerBookingSchema>>({
    resolver: zodResolver(registerBookingSchema),
    defaultValues: {
      user: "",
      room: "",
      date: undefined,
      startTime: undefined,
      endTime: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof registerBookingSchema>) {
    const dateISO = values.date.toISOString().split("T")[0];
    const timeStartDate = new Date(`${dateISO}T${values.startTime}:00`);
    const timeEndDate = new Date(`${dateISO}T${values.endTime}:00`);

    try {
      await bookingServiceInstance.createBooking({
        userId: values.user,
        roomId: Number(values.room),
        date: values.date,
        startTime: timeStartDate,
        endTime: timeEndDate,
      });

      form.reset();
      onCloseModal();
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
    }
  }

  useEffect(() => {
    roomServiceInstance.listRooms().then((data) => {
      setRooms(data);
    });

    userServiceInstance.listUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => {
            onSubmit(data);
          },
          (errors) => {
            console.log("Erros de validação:", errors);
          }
        )}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsável</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma sala" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
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
                    locale={ptBR}
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
