import { BookingData } from "@/types/BookingData.interface";

const randomNames = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Davis",
  "David Wilson",
  "Sophia Brown",
  "James Garcia",
  "Olivia Martinez",
  "Daniel Anderson",
  "Emma Taylor",
  "Lucas Thomas",
  "Liam Jackson",
  "Charlotte White",
  "Ava Harris",
  "Mason Lewis",
  "Isabella Walker",
  "Ethan Robinson",
  "Mia Scott",
  "Henry Young",
  "Amelia King",
  "Noah Wright",
  "Harper Hall",
  "Alexander Lee",
  "Ella Green",
  "Sebastian Clark",
  "Elijah Adams",
  "Aria Baker",
  "Benjamin Campbell",
  "Lily Edwards",
  "Matthew Turner",
  "Hannah Carter",
  "Samuel Perez",
  "Chloe Mitchell",
  "William Moore",
  "Grace Morris",
  "Jacob Stewart",
  "Zoe Rodriguez",
  "Ryan Bennett",
  "Abigail Jenkins",
  "Leo Powell",
  "Victoria Rivera",
  "Nathan Wood",
  "Penelope Brooks",
  "Owen Foster",
  "Scarlett Gray",
];

const roomNames = [
  "Sala de Reunião",
  "Auditório Principal",
  "Sala de Conferência",
  "Laboratório de Informática",
  "Sala de Estudos",
  "Biblioteca Central",
  "Sala de Treinamento",
  "Centro de Inovação",
  "Sala de Aula",
  "Espaço Colaborativo",
  "Sala de Projetos",
  "Coworking",
  "Sala de Videoconferência",
  "Sala de Pesquisa",
  "Sala de Apoio",
  "Centro de Desenvolvimento",
];

export const bookings: BookingData[] = [
  ...Array.from({ length: 90 }, (_, index) => ({
    id: `${Math.floor(Math.random() * 10000)}`,
    guest: randomNames[Math.floor(Math.random() * randomNames.length)],
    room: roomNames[Math.floor(Math.random() * roomNames.length)],
    checkIn: `${Math.floor(Math.random() * 24)
      .toString()
      .padStart(2, "0")}:00`,
    checkOut: `${Math.floor(Math.random() * 24)
      .toString()
      .padStart(2, "0")}:00`,
    date: `${Math.floor(Math.random() * 28) + 1}/09/2024`,
    status: ["Pendente", "Confirmado", "Ativo", "Completado", "Cancelado"][
      Math.floor(Math.random() * 5)
    ],
  })),
];
