import { api } from "@/lib/api";

// ============================================
// TIPOS
// ============================================

export interface Guest {
  id: number;
  fullName: string;
  cpf: string;
  phone?: string;
  email?: string;
}

// ============================================
// SERVIÇOS
// ============================================

export const guestService = {
  // Listar todos os hóspedes
  async getAll(): Promise<Guest[]> {
    const response = await api.get<Guest[]>("/guests");
    return response.data;
  },

  // Buscar hóspede por ID
  async getById(id: number): Promise<Guest> {
    const response = await api.get<Guest>(`/guests/${id}`);
    return response.data;
  },
};
