"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { useUsers } from "@/hooks/use-users";
import { User, Role, CreateUserPayload } from "@/utils/types";
import toast from "react-hot-toast";

const userSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  role: z.enum(["ADMIN", "RECEPCIONIST"], {
    message: "Selecione uma função válida",
  }),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .optional()
    .or(z.literal("")),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
}

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "ADMIN", label: "Administrador" },
  { value: "RECEPCIONIST", label: "Recepcionista" },
];

export function UserModal({ isOpen, onClose, user }: UserModalProps) {
  const { createUser, updateUser } = useUsers();
  const isEditing = !!user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "RECEPCIONIST",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        role: user.role as "ADMIN" | "RECEPCIONIST",
        password: "",
      });
    } else {
      reset({ name: "", role: "RECEPCIONIST", password: "" });
    }
  }, [user, reset]);

  async function onSubmit(data: UserFormData) {
    try {
      const apiData: CreateUserPayload = {
        name: data.name,
        role: data.role as Role,
        password: data.password || undefined,
      };

      if (isEditing && user) {
        const payload = { ...apiData };
        if (!payload.password) delete payload.password;

        await updateUser({ id: user.id, data: payload });
        toast.success("Usuário atualizado!");
      } else {
        await createUser(apiData);
        toast.success("Usuário cadastrado!");
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      toast.error("Erro ao salvar usuário.");
    }
  }

  function handleClose() {
    reset({ name: "", role: "RECEPCIONIST", password: "" });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Usuário" : "Adicionar Novo Usuário"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Nome Completo <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Nome do usuário"
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success"
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="text-danger text-xs mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Senha{" "}
            {isEditing ? (
              <span className="text-gray-500 font-normal text-xs">
                (Deixe em branco para manter a atual)
              </span>
            ) : (
              <span className="text-danger">*</span>
            )}
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="********"
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success"
            disabled={isSubmitting}
          />
          {errors.password && (
            <span className="text-danger text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Função <span className="text-danger">*</span>
          </label>
          <select
            {...register("role")}
            className="w-full px-4 py-3 bg-tertiary border border-foreground/30 rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-success appearance-none cursor-pointer"
            disabled={isSubmitting}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.role && (
            <span className="text-danger text-xs mt-1">
              {errors.role.message}
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
              : "Adicionar novo usuário"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
