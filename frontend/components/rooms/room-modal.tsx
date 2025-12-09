"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { useRoomTypes } from "@/hooks/use-room-types";
import { useCreateRoom } from "@/hooks/use-rooms";
import { RoomStatus } from "@/services/room-service";

// Schema de validação - form inputs como strings
const roomSchema = z.object({
  number: z.string().min(1, "Código é obrigatório"),
  floor: z.string().min(1, "Andar é obrigatório").refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 1,
    "Andar deve ser maior que 0"
  ),
  roomTypeId: z.string().min(1, "Tipo é obrigatório"),
  status: z.enum(["AVAILABLE", "OCCUPIED", "CLEANING", "MAINTANCE"]),
});

type RoomFormData = z.infer<typeof roomSchema>;

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_OPTIONS: { value: RoomStatus; label: string }[] = [
  { value: "AVAILABLE", label: "Disponível" },
  { value: "OCCUPIED", label: "Ocupado" },
  { value: "CLEANING", label: "Limpeza" },
  { value: "MAINTANCE", label: "Manutenção" },
];

export function RoomModal({ isOpen, onClose }: RoomModalProps) {
  const { data: roomTypes, isLoading: loadingTypes } = useRoomTypes();
  const createRoom = useCreateRoom();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      status: "AVAILABLE",
    },
  });

  async function onSubmit(data: RoomFormData) {
    try {
      await createRoom.mutateAsync({
        number: data.number,
        floor: Number(data.floor),
        roomTypeId: Number(data.roomTypeId),
        status: data.status,
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao criar quarto:", error);
    }
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Adicionar Novo Quarto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Código */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Código <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("number")}
            placeholder="Ex: A-10"
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success"
            disabled={isSubmitting}
          />
          {errors.number && (
            <span className="text-danger text-xs mt-1">
              {errors.number.message}
            </span>
          )}
        </div>

        {/* Andar */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Andar <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("floor")}
            placeholder="Ex: 1"
            min={1}
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success"
            disabled={isSubmitting}
          />
          {errors.floor && (
            <span className="text-danger text-xs mt-1">
              {errors.floor.message}
            </span>
          )}
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Tipo <span className="text-danger">*</span>
          </label>
          <select
            {...register("roomTypeId")}
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success appearance-none cursor-pointer"
            disabled={isSubmitting || loadingTypes}
          >
            <option value="">Selecione o tipo</option>
            {roomTypes?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.roomTypeId && (
            <span className="text-danger text-xs mt-1">
              {errors.roomTypeId.message}
            </span>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Status <span className="text-danger">*</span>
          </label>
          <select
            {...register("status")}
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success appearance-none cursor-pointer"
            disabled={isSubmitting}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <span className="text-danger text-xs mt-1">
              {errors.status.message}
            </span>
          )}
        </div>

        {/* Botão Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-green-light text-white font-semibold rounded-xl hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/svg/add_icon.svg" alt="" className="w-5 h-5" />
            {isSubmitting ? "Adicionando..." : "Adicionar novo quarto"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
