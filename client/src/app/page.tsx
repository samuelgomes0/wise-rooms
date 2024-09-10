"use client";

import { reservations } from "@/api/reservations";
import Calendar from "@/components/Calendar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Header />
      <Separator />
      <main className="my-4">
        <section>
          <h1 className="text-2xl font-bold">
            Conectando espaços, criando possibilidades
          </h1>
          <p className="text-neutral-500">
            Astoria é uma aplicação que conecta pessoas a espaços, permitindo a
            reserva de salas de reunião, auditórios e outros ambientes.
          </p>
        </section>
        <Calendar reservations={reservations} />
      </main>
      <Footer />
    </div>
  );
}
