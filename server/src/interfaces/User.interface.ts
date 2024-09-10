import { AuditLog, Reservation } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  reservations?: Reservation[];
  auditLogs?: AuditLog[];
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UsersRepository {
  createUser(data: CreateUserDTO): Promise<User>;
  deleteUser(email: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
}
