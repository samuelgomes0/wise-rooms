import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astoria - Conectando espaços, criando possibilidades",
  description:
    "Conectamos espaços e pessoas para criar possibilidades de negócios e experiências únicas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex`}>
        {/* <SidebarLayout /> */}
        <>{children}</>
      </body>
    </html>
  );
}
