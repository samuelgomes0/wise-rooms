import { IAuditLog } from "./AuditLog.interface";
import { IBooking } from "./Booking.interface";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  roleId: number;
  bookings?: IBooking[];
  auditLog?: IAuditLog[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreateDTO {
  name: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  listUsers(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  createUser(user: IUserCreateDTO): Promise<IUser>;
  updateUser(user: IUserCreateDTO): Promise<IUser>;
  deleteUser(id: string): Promise<IUser>;
}
