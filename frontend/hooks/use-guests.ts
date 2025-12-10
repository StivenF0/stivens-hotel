import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { guestService } from "@/services/guest-service";
import { Guest } from "@/utils/types"; // Ou "@/utils/types" dependendo de onde você definiu

// --- 1. A parte boa do seu colega (Chaves Centralizadas) ---
export const guestKeys = {
  all: ["guests"] as const,
  detail: (id: number) => ["guests", id] as const,
};

export function useGuests() {
  const queryClient = useQueryClient();

  // --- 2. Nossa implementação de Listagem usando as chaves dele ---
  const guestsQuery = useQuery({
    queryKey: guestKeys.all, // Usando a constante dele
    queryFn: guestService.getAll,
  });

  // --- 3. Nossas Mutações (CRUD) que faltavam no código dele ---
  
  // Criar
  const createGuestMutation = useMutation({
    mutationFn: guestService.create,
    onSuccess: () => {
      // Invalida a lista para recarregar automaticamente
      queryClient.invalidateQueries({ queryKey: guestKeys.all });
    },
  });

  // Atualizar
  const updateGuestMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Guest> }) =>
      guestService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guestKeys.all });
    },
  });

  // Deletar
  const deleteGuestMutation = useMutation({
    mutationFn: guestService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guestKeys.all });
    },
  });

  return {
    // Dados e Estados
    guests: guestsQuery.data || [],
    isLoading: guestsQuery.isLoading,
    isError: guestsQuery.isError,
    
    // Ações
    createGuest: createGuestMutation.mutateAsync,
    updateGuest: updateGuestMutation.mutateAsync,
    deleteGuest: deleteGuestMutation.mutateAsync,
  };
}

// Hook extra para detalhe (opcional, mantive caso precisem no futuro)
export function useGuest(id: number) {
  return useQuery({
    queryKey: guestKeys.detail(id),
    queryFn: () => guestService.getById(id),
    enabled: !!id,
  });
}