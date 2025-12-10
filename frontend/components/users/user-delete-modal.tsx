"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useUsers } from "@/hooks/use-users";
import { User } from "@/utils/types";
import toast from "react-hot-toast";

interface UserDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function UserDeleteModal({ isOpen, onClose, user }: UserDeleteModalProps) {
  const { deleteUser } = useUsers();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!user) return;

    try {
      setIsDeleting(true);
      await deleteUser(user.id);
      toast.success("Usuário removido!");
      onClose();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast.error("Erro ao excluir usuário.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Excluir Usuário">
      <div className="flex flex-col items-center">
        <div className="text-center mb-6">
          <p className="text-lg text-secondary">
            Deseja mesmo deletar esse <span className="font-bold">usuário</span>?
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
