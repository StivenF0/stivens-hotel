import { api } from "@/lib/api";
import { User, CreateUserPayload } from "@/utils/types";

export const userService = {
  getAll: async () => {
    // Retorna lista de UserResponseDTO
    const { data } = await api.get<User[]>("/users");
    return data;
  },

  getById: async (id: number) => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  // Payload inclui senha, retorno é o UserResponseDTO (sem senha)
  create: async (userData: CreateUserPayload) => {
    const { data } = await api.post<User>("/users", userData);
    return data;
  },

  update: async (id: number, userData: Partial<CreateUserPayload>) => {
    const { data } = await api.put<User>(`/users/${id}`, userData);
    return data;
  },

  delete: async (id: number) => {
    await api.delete(`/users/${id}`);
  },
};