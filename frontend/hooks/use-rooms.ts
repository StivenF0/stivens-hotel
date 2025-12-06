import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
      // Invalida o cache para recarregar a lista
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
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
      // Invalida a lista e o detalhe específico
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
      queryClient.invalidateQueries({
        queryKey: roomKeys.detail(variables.id),
      });
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
    },
  });
}
