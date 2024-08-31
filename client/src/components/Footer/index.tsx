import Link from "next/link";

export function Footer() {
  return (
    <footer className="container mx-auto">
      <p className="text-center">
        2024 - Desenvolvido por{" "}
        <Link href="https://github.com/samuelgomes0" className="font-bold">
          Samuel Gomes Rosa
        </Link>
      </p>
    </footer>
  );
}
