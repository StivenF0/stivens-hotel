"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { useGuests } from "@/hooks/use-guests";
import { Guest } from "@/utils/types";
import { TrashIcon } from "@/components/ui/trash-icon";
import toast from "react-hot-toast";

const guestSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().length(11, "CPF deve conter 11 dígitos (apenas números)"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.email("Email inválido"),
});

type GuestFormData = z.infer<typeof guestSchema>;

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest?: Guest | null;
}

export function GuestModal({ isOpen, onClose, guest }: GuestModalProps) {
  const { createGuest, updateGuest } = useGuests();
  const isEditing = !!guest;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
  });

  useEffect(() => {
    if (guest) {
      reset({
        fullName: guest.fullName,
        cpf: guest.cpf,
        phone: guest.phone,
        email: guest.email,
      });
    } else {
      reset({ fullName: "", cpf: "", phone: "", email: "" });
    }
  }, [guest, reset]);

  async function onSubmit(data: GuestFormData) {
    try {
      if (isEditing && guest) {
        await updateGuest({ id: guest.id, data });
        toast.success("Hóspede atualizado!");
      } else {
        await createGuest(data);
        toast.success("Hóspede cadastrado!");
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar hóspede:", error);
      toast.error("Erro ao salvar hóspede.");
    }
  }

  function handleClose() {
    reset({ fullName: "", cpf: "", phone: "", email: "" });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Hóspede" : "Adicionar Novo Hóspede"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Nome Completo <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("fullName")}
            placeholder="Nome do hóspede"
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success"
            disabled={isSubmitting}
          />
          {errors.fullName && (
            <span className="text-danger text-xs mt-1">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              CPF <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              {...register("cpf")}
              placeholder="Apenas números"
              maxLength={11}
              className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success"
              disabled={isSubmitting}
            />
            {errors.cpf && (
              <span className="text-danger text-xs mt-1">
                {errors.cpf.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              Telefone <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="(00) 00000-0000"
              className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <span className="text-danger text-xs mt-1">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="email@exemplo.com"
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success"
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="text-danger text-xs mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

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
              : "Adicionar novo hóspede"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
