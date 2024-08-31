import { EyeIcon, EyeOffIcon, Link } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="flex flex-col gap-4">
      <div className="w-full">
        <Label htmlFor="name">Nome</Label>
        <Input type="name" id="name" placeholder="John Doe" />
      </div>
      <div className="w-full">
        <Label htmlFor="email">E-mail</Label>
        <Input type="email" id="email" placeholder="email@exemplo.com" />
      </div>
      <div className="w-full relative">
        <Label htmlFor="password">Senha</Label>
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Sua senha"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-9 text-neutral-400"
        >
          {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
        </button>
      </div>
      <Button type="submit" className="mt-2">
        Criar conta
      </Button>
      <Label className="text-sm text-center">
        Já tem uma conta?{" "}
        <Link href="/entrar" className="font-bold">
          Entre agora
        </Link>
      </Label>
    </form>
  );
}
