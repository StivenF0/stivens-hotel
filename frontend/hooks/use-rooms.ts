import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  roomService,
  CreateRoomDTO,
  UpdateRoomDTO,
} from "@/services/room-service";

// Query Keys centralizadas
export const roomKeys = {
  all: ["rooms"] as const,
  detail: (id: number) => ["rooms", id] as const,
};

// ============================================
// QUERIES (Leitura)
// ============================================

// Hook para listar todos os quartos
export function useRooms() {
  return useQuery({
    queryKey: roomKeys.all,
    queryFn: roomService.getAll,
  });
}

// Hook para buscar quarto por ID
export function useRoom(id: number) {
  return useQuery({
    queryKey: roomKeys.detail(id),
    queryFn: () => roomService.getById(id),
    enabled: !!id, // Só executa se id existir
  });
}

// ============================================
// MUTATIONS (Escrita)
// ============================================

// Hook para criar quarto
export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoomDTO) => roomService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
      toast.success("Quarto criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar quarto");
    },
  });
}

// Hook para atualizar quarto
export function useUpdateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoomDTO }) =>
      roomService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
      queryClient.invalidateQueries({
        queryKey: roomKeys.detail(variables.id),
      });
      toast.success("Quarto atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar quarto");
    },
  });
}

// Hook para excluir quarto
export function useDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => roomService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
      toast.success("Quarto excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir quarto");
    },
  });
}
