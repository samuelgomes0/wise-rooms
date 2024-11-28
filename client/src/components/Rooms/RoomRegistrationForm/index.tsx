"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { registerRoomSchema } from "@/schemas/registerRoom.schema";
import roomServiceInstance from "@/services/RoomService";

export function RoomRegistrationForm() {
  const form = useForm<z.infer<typeof registerRoomSchema>>({
    resolver: zodResolver(registerRoomSchema),
    defaultValues: {
      name: "",
      capacity: 0,
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerRoomSchema>) {
    roomServiceInstance.createRoom(values).then(() => {
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome da sala" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacidade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Capacidade da sala"
                  {...field}
                  onChange={({ target }) => {
                    console.log(target.value);
                    field.onChange(parseInt(target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição da sala (opcional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Cadastrar Sala</Button>
      </form>
    </Form>
  );
}
