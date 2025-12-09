"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { useCreateRoomType, useUpdateRoomType } from "@/hooks/use-room-types";
import { RoomType } from "@/services/room-type-service";

const roomTypeSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  dailyPrice: z
    .string()
    .min(1, "Preço é obrigatório")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Preço deve ser maior que 0"
    ),
});

type RoomTypeFormData = z.infer<typeof roomTypeSchema>;

interface RoomTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomType?: RoomType | null;
}

export function RoomTypeModal({
  isOpen,
  onClose,
  roomType,
}: RoomTypeModalProps) {
  const createRoomType = useCreateRoomType();
  const updateRoomType = useUpdateRoomType();
  const isEditing = !!roomType;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RoomTypeFormData>({
    resolver: zodResolver(roomTypeSchema),
  });

  useEffect(() => {
    if (roomType) {
      reset({
        name: roomType.name,
        description: roomType.description || "",
        dailyPrice: String(roomType.dailyPrice),
      });
    } else {
      reset({ name: "", description: "", dailyPrice: "" });
    }
  }, [roomType, reset]);

  async function onSubmit(data: RoomTypeFormData) {
    try {
      const payload = {
        name: data.name,
        description: data.description || undefined,
        dailyPrice: Number(data.dailyPrice),
      };

      if (isEditing && roomType) {
        await updateRoomType.mutateAsync({ id: roomType.id, data: payload });
      } else {
        await createRoomType.mutateAsync(payload);
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar tipo de quarto:", error);
    }
  }

  function handleClose() {
    reset({ name: "", description: "", dailyPrice: "" });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Tipo de Quarto" : "Novo Tipo de Quarto"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Nome <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Ex: Suíte Master"
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success"
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="text-danger text-xs mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Descrição
          </label>
          <textarea
            {...register("description")}
            placeholder="Descrição do tipo de quarto..."
            rows={3}
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success resize-none"
            disabled={isSubmitting}
          />
        </div>

        {/* Preço Diário */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Preço da Diária (R$) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            {...register("dailyPrice")}
            placeholder="Ex: 150.00"
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success"
            disabled={isSubmitting}
          />
          {errors.dailyPrice && (
            <span className="text-danger text-xs mt-1">
              {errors.dailyPrice.message}
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
            {isSubmitting
              ? "Salvando..."
              : isEditing
              ? "Salvar alterações"
              : "Adicionar tipo"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
