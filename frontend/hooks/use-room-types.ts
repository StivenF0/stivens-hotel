import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  roomTypeService,
  CreateRoomTypeDTO,
  UpdateRoomTypeDTO,
} from "@/services/room-type-service";

// Query Keys centralizadas
export const roomTypeKeys = {
  all: ["room-types"] as const,
  detail: (id: number) => ["room-types", id] as const,
};

// Hook para listar todos os tipos de quarto
export function useRoomTypes() {
  return useQuery({
    queryKey: roomTypeKeys.all,
    queryFn: () => roomTypeService.getAll(),
  });
}

// Hook para buscar tipo de quarto por ID
export function useRoomType(id: number) {
  return useQuery({
    queryKey: roomTypeKeys.detail(id),
    queryFn: () => roomTypeService.getById(id),
    enabled: !!id,
  });
}

// Hook para criar tipo de quarto
export function useCreateRoomType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoomTypeDTO) => roomTypeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomTypeKeys.all });
      toast.success("Tipo de quarto criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar tipo de quarto");
    },
  });
}

// Hook para atualizar tipo de quarto
export function useUpdateRoomType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoomTypeDTO }) =>
      roomTypeService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomTypeKeys.all });
      toast.success("Tipo de quarto atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar tipo de quarto");
    },
  });
}

// Hook para deletar tipo de quarto
export function useDeleteRoomType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => roomTypeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomTypeKeys.all });
      toast.success("Tipo de quarto excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir tipo de quarto");
    },
  });
}
