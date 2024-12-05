"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Spinner from "@/components/Spinner";
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
import { Notification } from "@/constants";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useToast } from "@/hooks/use-toast";
import { registerRoomSchema } from "@/schemas/registerRoom.schema";
import roomServiceInstance from "@/services/RoomService";
import { ApiError } from "@/types";
import { errorHandler } from "@/utils";
import { useContext } from "react";

export function RoomRegistrationForm({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  const form = useForm<z.infer<typeof registerRoomSchema>>({
    resolver: zodResolver(registerRoomSchema),
    defaultValues: {
      name: "",
      capacity: 0,
      description: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof registerRoomSchema>) {
    try {
      setIsLoading(true);
      await roomServiceInstance.createRoom(values);
      onCloseModal();
      toast({
        title: Notification.SUCCESS.ROOM.CREATE_TITLE,
        description: Notification.SUCCESS.ROOM.CREATE_DESCRIPTION,
      });
    } catch (error) {
      const { title, description } = errorHandler(error as ApiError);

      toast({
        variant: "destructive",
        title,
        description,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const { isLoading, setIsLoading } = useContext(LoadingContext);

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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner size="small" /> : "Criar Reserva"}
        </Button>
      </form>
    </Form>
  );
}
