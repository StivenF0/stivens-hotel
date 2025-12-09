import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  reservationService,
  CreateReservationDTO,
  UpdateReservationDTO,
} from "@/services/reservation-service";
import { roomKeys } from "./use-rooms";

// Query Keys centralizadas
export const reservationKeys = {
  all: ["reservations"] as const,
  detail: (id: number) => ["reservations", id] as const,
};

// ============================================
// QUERIES (Leitura)
// ============================================

// Hook para listar todas as reservas
export function useReservations() {
  return useQuery({
    queryKey: reservationKeys.all,
    queryFn: () => reservationService.getAll(),
  });
}

// Hook para buscar reserva por ID
export function useReservation(id: number) {
  return useQuery({
    queryKey: reservationKeys.detail(id),
    queryFn: () => reservationService.getById(id),
    enabled: !!id,
  });
}

// ============================================
// MUTATIONS (Escrita)
// ============================================

// Hook para criar reserva
export function useCreateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationDTO) => reservationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.all });
      // Também invalida quartos (status pode mudar)
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
    },
  });
}

// Hook para atualizar reserva
export function useUpdateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateReservationDTO }) =>
      reservationService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.all });
      queryClient.invalidateQueries({
        queryKey: reservationKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
    },
  });
}

// Hook para excluir reserva
export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reservationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.all });
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
    },
  });
}

// Hook para check-in
export function useCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reservationService.checkIn(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.all });
      queryClient.invalidateQueries({ queryKey: reservationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
    },
  });
}

// Hook para check-out
export function useCheckOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reservationService.checkOut(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.all });
      queryClient.invalidateQueries({ queryKey: reservationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
    },
  });
}
