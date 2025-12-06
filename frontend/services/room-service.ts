import { api } from "@/lib/api";

// ============================================
// TIPOS
// ============================================

export interface RoomType {
  id: number;
  name: string;
  description?: string;
}

export interface Room {
  id: number;
  number: string;
  roomType: RoomType;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "CLEANING";
  floor?: number;
  pricePerNight?: number;
}

export interface CreateRoomDTO {
  number: string;
  roomType: { id: number };
  status?: string;
  floor?: number;
  pricePerNight?: number;
}

export interface UpdateRoomDTO extends Partial<CreateRoomDTO> {}

// ============================================
// SERVIÇOS
// ============================================

export const roomService = {
  // Listar todos os quartos
  async getAll(): Promise<Room[]> {
    const response = await api.get<Room[]>("/api/rooms");
    return response.data;
  },

  // Buscar quarto por ID
  async getById(id: number): Promise<Room> {
    const response = await api.get<Room>(`/api/rooms/${id}`);
    return response.data;
  },

  // Criar novo quarto
  async create(data: CreateRoomDTO): Promise<Room> {
    const response = await api.post<Room>("/api/rooms", data);
    return response.data;
  },

  // Atualizar quarto
  async update(id: number, data: UpdateRoomDTO): Promise<Room> {
    const response = await api.put<Room>(`/api/rooms/${id}`, data);
    return response.data;
  },

  // Excluir quarto
  async delete(id: number): Promise<void> {
    await api.delete(`/api/rooms/${id}`);
  },
};
