"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/schemas/login.schema";
import { findUserByEmail } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = () => {
    console.log("Teste!");
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <Link href={"/"} className="absolute top-8 left-8">
        <ArrowLeft size={24} />
      </Link>
      <Card className="max-w-sm">
        <CardHeader className="flex gap-2 flex-col text-center">
          <CardTitle className="text-2xl font-bold">
            Entrar na sua conta
          </CardTitle>
          <CardDescription className="text-neutral-500 text-sm">
            Preencha os campos para acessar sua conta e começar a reservar
            espaços.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="email" className="font-semibold">
                  E-mail
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="w-full relative flex flex-col gap-2">
                <Label htmlFor="password" className="font-semibold">
                  Senha
                </Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-8 text-neutral-400"
                >
                  {showPassword ? (
                    <EyeIcon size={20} />
                  ) : (
                    <EyeOffIcon size={20} />
                  )}
                </button>
              </div>
              <Button
                type="submit"
                className="mt-2"
                onClick={() => findUserByEmail("samuel_gomes26@hotmail.com")}
              >
                Entrar
              </Button>
              <Label className="text-sm text-center">
                Não possui uma conta? {""}
                <Link href="/cadastrar" className="font-bold">
                  Cadastre-se
                </Link>
              </Label>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
