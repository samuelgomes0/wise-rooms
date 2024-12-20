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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Notification, Role } from "@/constants";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useToast } from "@/hooks/use-toast";
import userCreationSchema from "@/schemas/createUser.schema";
import roleServiceInstance from "@/services/RoleService";
import userServiceInstance from "@/services/UserService";
import { IRole } from "@/types";
import { useContext, useEffect, useState } from "react";

export function UserRegistrationForm({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

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
      setIsLoading(true);
      await userServiceInstance.createUser({
        name,
        email,
        password,
        roleId: Number(roleId),
      });

      onCloseModal();
      toast({
        title: Notification.SUCCESS.USER.CREATE_TITLE,
        description: Notification.SUCCESS.USER.CREATE_DESCRIPTION,
      });
    } catch {
      toast({
        title: Notification.ERROR.USER.CREATE_TITLE,
        description: Notification.ERROR.USER.CREATE_DESCRIPTION,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const listRoles = async () => {
    try {
      const data = await roleServiceInstance.listRoles();
      setRoles(data);
    } catch {
      toast({
        title: Notification.ERROR.ROLE.TITLE,
        description: Notification.ERROR.ROLE.DESCRIPTION,
      });
    }
  };

  useEffect(() => {
    listRoles();
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
                      {Role.label[name as keyof typeof Role.label]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner size="small" /> : "Cadastrar Usuário"}
        </Button>
      </form>
    </Form>
  );
}
