"use client";

import { Header } from "@/components/Header";
import { useState } from "react";

export default function Recursos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const itemsPerPage = 30;

  return (
    <div className="flex h-screen w-full">
      <main className="flex-1 p-8">
        <Header
          userInitials="SG"
          headerTitle="Recursos"
          userRole="Administrador"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      </main>
    </div>
  );
}
