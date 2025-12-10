"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useGuests } from "@/hooks/use-guests";
import { Guest } from "@/utils/types";
import toast from "react-hot-toast";

interface GuestDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: Guest | null;
}

export function GuestDeleteModal({ isOpen, onClose, guest }: GuestDeleteModalProps) {
  const { deleteGuest } = useGuests();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!guest) return;
    
    try {
      setIsDeleting(true);
      await deleteGuest(guest.id);
      toast.success("Hóspede removido!");
      onClose();
    } catch (error) {
      console.error("Erro ao excluir hóspede:", error);
      toast.error("Erro ao excluir hóspede.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (!guest) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Excluir Hóspede">
      <div className="flex flex-col items-center">
        <div className="text-center mb-6">
          <p className="text-lg text-secondary">
            Deseja mesmo deletar esse <span className="font-bold">hóspede</span>?
          </p>
          <p className="text-secondary mt-2">
            Não será possível desfazer essa ação.
          </p>
        </div>

        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-2 text-danger underline font-[Montserrat] cursor-pointer hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </button>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-6 py-2 text-white font-[Montserrat] cursor-pointer hover:opacity-80 transition disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}
