// frontend/services/guest-service.ts
import { api } from "@/lib/api";
import { Guest } from "@/utils/types"; // Ajuste o import conforme onde criou os tipos

export const guestService = {
  getAll: async () => {
    const { data } = await api.get<Guest[]>("/guests");
    return data;
  },

  getById: async (id: number) => {
    const { data } = await api.get<Guest>(`/guests/${id}`);
    return data;
  },

  create: async (guestData: Omit<Guest, "id">) => {
    const { data } = await api.post<Guest>("/guests", guestData);
    return data;
  },

  update: async (id: number, guestData: Partial<Guest>) => {
    const { data } = await api.put<Guest>(`/guests/${id}`, guestData);
    return data;
  },

  delete: async (id: number) => {
    await api.delete(`/guests/${id}`);
  },
};