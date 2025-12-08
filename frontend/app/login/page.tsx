"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import axios from "axios";
import { useAuth } from "@/providers/auth-provider";
import { getErrorMessage } from "@/lib/api";

// Schema de validação (Zod v4)
const loginSchema = z.object({
  name: z.string().check(z.minLength(1, "Nome é obrigatório")),
  password: z
    .string()
    .check(
      z.minLength(1, "Senha é obrigatória"),
      z.minLength(6, "Senha deve ter no mínimo 6 caracteres")
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [apiError, setApiError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setApiError("");

    try {
      await login(data);
      router.push("/dashboard");
    } catch (err) {
      // Erro 403 no login = credenciais inválidas
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        setApiError("Nome ou senha inválidos");
      } else {
        setApiError(getErrorMessage(err));
      }
    }
  }

  return (
    <div className="w-[1500px] min-h-[650px] max-w-[99%] flex bg-primary shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden">
      <div className="basis-1/2 bg-background bg-contain bg-no-repeat bg-center">
        <Image
          className="h-full w-full"
          src="/login/ilustracao.png"
          alt="ilustracao.png"
          width={464}
          height={538}
        />
      </div>
      <div className="basis-1/2 py-[60px] px-[50px] flex items-center justify-center">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="mb-2.5 text-[28px] font-bold text-secondary">
              Stiven's Hotel
            </h1>
            <p className="mb-10 text-base text-foreground">
              Bem vindo ao Stiven's Hotel
            </p>
          </div>
          <form className="w-[80%]" onSubmit={handleSubmit(onSubmit)}>
            {apiError && (
              <div className="mb-4 p-3 bg-danger/10 border border-danger rounded-lg text-danger text-sm">
                {apiError}
              </div>
            )}
            <div className="mb-[30px]">
              <label
                htmlFor="name"
                className="block text-xs text-foreground mb-[5px]"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Digite seu nome"
                className="w-full border-b border-foreground bg-transparent py-[5px] text-base text-secondary focus:outline-none focus:border-success placeholder:text-foreground/70"
                disabled={isSubmitting}
              />
              {errors.name && (
                <span className="text-danger text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="mb-[30px]">
              <label
                htmlFor="password"
                className="block text-xs text-foreground mb-[5px]"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Digite sua senha"
                className="w-full border-b border-foreground bg-transparent py-[5px] text-base text-secondary focus:outline-none focus:border-success placeholder:text-foreground/70"
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className="text-danger text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center w-full">
                <hr className="grow border-t border-foreground" />
                <span className="mx-4 font-bold text-foreground">X</span>
                <hr className="grow border-t border-foreground" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[40%] p-3 my-6 border-none rounded-2xl bg-success text-white text-2xl font-medium cursor-pointer transition-all duration-300 ease-in-out hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
              <div className="flex items-center w-full">
                <hr className="grow border-t border-foreground" />
                <span className="mx-4 font-bold text-foreground">X</span>
                <hr className="grow border-t border-foreground" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
