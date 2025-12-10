export type Role = "ADMIN" | "RECEPCIONIST";

export interface User {
    id: number;
    name: string;
    role: Role;
}

export interface Guest {
  id: number;
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
}

export interface CreateUserPayload {
    name: string;
    password?: string;
    role: Role;
}