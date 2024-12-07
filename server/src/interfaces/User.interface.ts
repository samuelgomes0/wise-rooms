import { IAuditLog } from "./AuditLog.interface";

export interface IUser {
  id: string;
  name: string;
  password?: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
  bookings: {
    id: string;
    room: {
      id: number;
      name: string;
    };
    date: Date;
    startTime: Date;
    endTime: Date;
    status: string;
    description: string | null;
  }[];
  auditLog?: IAuditLog[];
}

export interface IUserCreateDTO {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export interface IUserRepository {
  listUsers(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  createUser(user: IUserCreateDTO): Promise<IUser>;
  updateUser(user: IUserCreateDTO): Promise<IUser>;
  deleteUser(id: string): Promise<IUser>;
}
