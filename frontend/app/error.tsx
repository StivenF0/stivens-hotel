"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background text-secondary p-4">
      <h1 className="text-6xl font-bold font-montserrat text-warning mb-4">Ops!</h1>
      <h2 className="text-2xl font-bold font-poppins mb-2">Algo deu errado</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Tivemos um problema técnico ao processar sua solicitação. 
        Tente recarregar a página ou volte para o início.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-info text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
        >
          Recarregar página
        </button>
        <button
          onClick={() => window.location.href = "/dashboard"}
          className="bg-transparent border-2 border-secondary text-secondary px-6 py-3 rounded-2xl font-semibold hover:bg-secondary hover:text-white transition"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
}