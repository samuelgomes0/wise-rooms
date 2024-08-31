import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 relative">
      <span className="text-2xl font-bold">Astoria</span>
      <Button>
        <Link href="/cadastro">Cadastro</Link>
      </Button>
    </header>
  );
}
