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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Notification } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import userCreationSchema from "@/schemas/createUser.schema";
import roleServiceInstance from "@/services/RoleService";
import userServiceInstance from "@/services/UserService";
import { IRole } from "@/types";
import { useEffect, useState } from "react";

export function UserRegistrationForm({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  const [roles, setRoles] = useState<IRole[]>([]);

  const form = useForm<z.infer<typeof userCreationSchema>>({
    resolver: zodResolver(userCreationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleId: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async ({
    name,
    email,
    password,
    roleId,
  }: z.infer<typeof userCreationSchema>) => {
    try {
      await userServiceInstance.createUser({
        name,
        email,
        password,
        roleId: Number(roleId),
      });

      onCloseModal();
      toast({
        title: Notification.SUCCESS.USER.TITLE,
        description: Notification.SUCCESS.USER.DESCRIPTION,
      });
    } catch {
      toast({
        title: Notification.ERROR.USER.TITLE,
        description: Notification.ERROR.USER.DESCRIPTION,
      });
    }
  };

  useEffect(() => {
    roleServiceInstance.listRoles().then(({ data }) => {
      setRoles(data);
    });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
        })}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cargo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map(({ id, name }) => (
                    <SelectItem key={id} value={id.toString()}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Cadastrar Usuário</Button>
      </form>
    </Form>
  );
}
