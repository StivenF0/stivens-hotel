import { api } from "@/lib/api";

// ============================================
// TIPOS
// ============================================

export interface RoomType {
  id: number;
  name: string;
  description?: string;
  dailyPrice?: number; // BigDecimal no backend
}

export interface Room {
  id: number;
  number: string;
  floor: number;
  status: RoomStatus;
  roomType: RoomType;
}

// Enum alinhado com backend: AVAILABLE, OCCUPIED, CLEANING, MAINTANCE (typo do backend)
export type RoomStatus = "AVAILABLE" | "OCCUPIED" | "CLEANING" | "MAINTANCE";

// DTO para criar/atualizar quarto (alinhado com RoomRequestDTO)
export interface CreateRoomDTO {
  number: string;
  floor: number;
  roomTypeId: number;
  status: RoomStatus;
}

export interface UpdateRoomDTO extends Partial<CreateRoomDTO> {}

// ============================================
// SERVIÇOS
// ============================================

export const roomService = {
  // Listar todos os quartos
  async getAll(): Promise<Room[]> {
    const response = await api.get<Room[]>("/rooms");
    return response.data;
  },

  // Buscar quarto por ID
  async getById(id: number): Promise<Room> {
    const response = await api.get<Room>(`/rooms/${id}`);
    return response.data;
  },

  // Criar novo quarto
  async create(data: CreateRoomDTO): Promise<Room> {
    const response = await api.post<Room>("/rooms", data);
    return response.data;
  },

  // Atualizar quarto
  async update(id: number, data: UpdateRoomDTO): Promise<Room> {
    const response = await api.put<Room>(`/rooms/${id}`, data);
    return response.data;
  },

  // Excluir quarto
  async delete(id: number): Promise<void> {
    await api.delete(`/rooms/${id}`);
  },
};
