"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { useGuests } from "@/hooks/use-guests";
import { useRooms } from "@/hooks/use-rooms";
import {
  useCreateReservation,
  useUpdateReservation,
  useDeleteReservation,
} from "@/hooks/use-reservations";
import { Reservation } from "@/services/reservation-service";
import { TrashIcon } from "@/components/ui/trash-icon";

// Schema de validação - form inputs como strings
const reservationSchema = z.object({
  guestId: z.string().min(1, "Hóspede é obrigatório"),
  roomId: z.string().min(1, "Quarto é obrigatório"),
  checkInDate: z.string().min(1, "Data de início é obrigatória"),
  checkOutDate: z.string().min(1, "Data de fim é obrigatória"),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation?: Reservation | null;
}

export function ReservationModal({
  isOpen,
  onClose,
  reservation,
}: ReservationModalProps) {
  const { data: guests, isLoading: loadingGuests } = useGuests();
  const { data: rooms, isLoading: loadingRooms } = useRooms();
  const createReservation = useCreateReservation();
  const updateReservation = useUpdateReservation();
  const deleteReservation = useDeleteReservation();
  const isEditing = !!reservation;

  // Filtra quartos disponíveis ou o quarto atual da reserva (para edição)
  const availableRooms = rooms?.filter(
    (room) =>
      room.status === "AVAILABLE" ||
      (reservation && room.id === reservation.room.id)
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  // Preenche form quando editando
  useEffect(() => {
    if (reservation) {
      reset({
        guestId: String(reservation.guest.id),
        roomId: String(reservation.room.id),
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate,
      });
    } else {
      reset({ guestId: "", roomId: "", checkInDate: "", checkOutDate: "" });
    }
  }, [reservation, reset]);

  async function onSubmit(data: ReservationFormData) {
    try {
      const payload = {
        guestId: Number(data.guestId),
        roomId: Number(data.roomId),
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
      };

      if (isEditing && reservation) {
        await updateReservation.mutateAsync({
          id: reservation.id,
          data: payload,
        });
      } else {
        await createReservation.mutateAsync(payload);
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar reserva:", error);
    }
  }

  function handleClose() {
    reset({ guestId: "", roomId: "", checkInDate: "", checkOutDate: "" });
    onClose();
  }

  async function handleDelete() {
    if (!reservation) return;
    if (confirm("Tem certeza que deseja excluir esta reserva?")) {
      try {
        await deleteReservation.mutateAsync(reservation.id);
        handleClose();
      } catch (error) {
        console.error("Erro ao excluir reserva:", error);
      }
    }
  }

  // Formata a data para o input date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Reserva" : "Nova Reserva"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hóspede */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Hóspede <span className="text-danger">*</span>
          </label>
          <select
            {...register("guestId")}
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success appearance-none cursor-pointer"
            disabled={isSubmitting || loadingGuests}
          >
            <option value="">Selecione o hóspede</option>
            {guests?.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.fullName}
              </option>
            ))}
          </select>
          {errors.guestId && (
            <span className="text-danger text-xs mt-1">
              {errors.guestId.message}
            </span>
          )}
        </div>

        {/* Quarto */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Quarto <span className="text-danger">*</span>
          </label>
          <select
            {...register("roomId")}
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success appearance-none cursor-pointer"
            disabled={isSubmitting || loadingRooms}
          >
            <option value="">Selecione o quarto</option>
            {availableRooms?.map((room) => (
              <option key={room.id} value={room.id}>
                {room.number} - {room.roomType.name}
              </option>
            ))}
          </select>
          {errors.roomId && (
            <span className="text-danger text-xs mt-1">
              {errors.roomId.message}
            </span>
          )}
        </div>

        {/* Período */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              Período - Início <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              {...register("checkInDate")}
              min={today}
              className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success cursor-pointer"
              disabled={isSubmitting}
            />
            {errors.checkInDate && (
              <span className="text-danger text-xs mt-1">
                {errors.checkInDate.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              Período - Fim <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              {...register("checkOutDate")}
              min={today}
              className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success cursor-pointer"
              disabled={isSubmitting}
            />
            {errors.checkOutDate && (
              <span className="text-danger text-xs mt-1">
                {errors.checkOutDate.message}
              </span>
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-between pt-4">
          {isEditing ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting || deleteReservation.isPending}
              className="flex items-center gap-2 px-4 py-3 bg-danger/10 text-danger font-semibold rounded-xl hover:bg-danger/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TrashIcon className="w-5 h-5 text-danger" />
              {deleteReservation.isPending ? "Excluindo..." : "Excluir"}
            </button>
          ) : (
            <div />
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-green-light text-white font-semibold rounded-xl hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/svg/add_icon.svg" alt="" className="w-5 h-5" />
            {isSubmitting
              ? "Salvando..."
              : isEditing
              ? "Salvar alterações"
              : "Nova reserva"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
