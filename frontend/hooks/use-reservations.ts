import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
      toast.success("Reserva criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar reserva");
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
      toast.success("Reserva atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar reserva");
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
      toast.success("Reserva excluída com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir reserva");
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
      toast.success("Check-in realizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao realizar check-in");
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
      toast.success("Check-out realizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao realizar check-out");
    },
  });
}
