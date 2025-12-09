import { useQuery } from "@tanstack/react-query";
import { roomTypeService } from "@/services/room-type-service";

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
