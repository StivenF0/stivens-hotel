import { useQuery } from "@tanstack/react-query";
import { guestService } from "@/services/guest-service";

// Query Keys centralizadas
export const guestKeys = {
  all: ["guests"] as const,
  detail: (id: number) => ["guests", id] as const,
};

// Hook para listar todos os hóspedes
export function useGuests() {
  return useQuery({
    queryKey: guestKeys.all,
    queryFn: () => guestService.getAll(),
  });
}

// Hook para buscar hóspede por ID
export function useGuest(id: number) {
  return useQuery({
    queryKey: guestKeys.detail(id),
    queryFn: () => guestService.getById(id),
    enabled: !!id,
  });
}
