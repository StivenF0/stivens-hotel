import { api } from "@/lib/api";

// ============================================
// TIPOS
// ============================================

export interface RoomType {
  id: number;
  name: string;
  description?: string;
  dailyPrice?: number;
}

// ============================================
// SERVIÇOS
// ============================================

export const roomTypeService = {
  // Listar todos os tipos de quarto
  async getAll(): Promise<RoomType[]> {
    const response = await api.get<RoomType[]>("/room-types");
    return response.data;
  },

  // Buscar tipo de quarto por ID
  async getById(id: number): Promise<RoomType> {
    const response = await api.get<RoomType>(`/room-types/${id}`);
    return response.data;
  },
};
