import { api } from "@/lib/api";

// ============================================
// TIPOS
// ============================================

export interface RoomType {
  id: number;
  name: string;
  description?: string;
  dailyPrice: number;
}

export interface CreateRoomTypeDTO {
  name: string;
  description?: string;
  dailyPrice: number;
}

export interface UpdateRoomTypeDTO {
  name?: string;
  description?: string;
  dailyPrice?: number;
}

// ============================================
// SERVIÇOS
// ============================================

export const roomTypeService = {
  async getAll(): Promise<RoomType[]> {
    const response = await api.get<RoomType[]>("/room-types");
    return response.data;
  },

  async getById(id: number): Promise<RoomType> {
    const response = await api.get<RoomType>(`/room-types/${id}`);
    return response.data;
  },

  async create(data: CreateRoomTypeDTO): Promise<RoomType> {
    const response = await api.post<RoomType>("/room-types", data);
    return response.data;
  },

  async update(id: number, data: UpdateRoomTypeDTO): Promise<RoomType> {
    const response = await api.put<RoomType>(`/room-types/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/room-types/${id}`);
  },
};
