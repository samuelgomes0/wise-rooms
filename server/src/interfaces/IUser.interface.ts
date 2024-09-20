import { IAuditLog } from "./IAuditLog.interface";
import { IBooking } from "./IBooking.interface";

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
  create(user: IUserCreateDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  update(user: IUserCreateDTO): Promise<IUser>;
  delete(id: string): Promise<IUser>;
}
