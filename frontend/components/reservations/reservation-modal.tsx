"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { useGuests } from "@/hooks/use-guests";
import { useRooms } from "@/hooks/use-rooms";
import { useCreateReservation } from "@/hooks/use-reservations";

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
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const { data: guests, isLoading: loadingGuests } = useGuests();
  const { data: rooms, isLoading: loadingRooms } = useRooms();
  const createReservation = useCreateReservation();

  // Filtra apenas quartos disponíveis
  const availableRooms = rooms?.filter((room) => room.status === "AVAILABLE");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  async function onSubmit(data: ReservationFormData) {
    try {
      await createReservation.mutateAsync({
        guestId: Number(data.guestId),
        roomId: Number(data.roomId),
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
    }
  }

  function handleClose() {
    reset();
    onClose();
  }

  // Formata a data para o input date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Nova Reserva">
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

        {/* Botão Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-green-light text-white font-semibold rounded-xl hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/svg/add_icon.svg" alt="" className="w-5 h-5" />
            {isSubmitting ? "Criando..." : "Nova reserva"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
