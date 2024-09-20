import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astoria - Conectando espaços, criando possibilidades",
  description:
    "Wise Rooms é um sistema intuitivo de agendamento e reserva de espaços institucionais como salas, laboratórios, auditórios, e muito mais. O projeto foi desenvolvido para otimizar a gestão desses espaços, proporcionando uma experiência fluida e prática tanto para administradores quanto para usuários.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex h-screen bg-gray-100`}>
        <AuthProvider>
          <Sidebar />
          <>{children}</>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
