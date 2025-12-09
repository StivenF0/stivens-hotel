import { QueryClient } from "@tanstack/react-query";

// Função para criar QueryClient (evita problemas de SSR)
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Dados ficam "frescos" por 1 minuto
        staleTime: 60 * 1000,
        // Cache mantido por 5 minutos
        gcTime: 5 * 60 * 1000,
        // Não refetch automático ao focar a janela
        refetchOnWindowFocus: false,
        // Tentar novamente 1 vez em caso de erro
        retry: 1,
      },
      mutations: {
        // Tentar novamente 0 vezes em mutações
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  // Servidor: sempre cria um novo QueryClient
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  // Browser: reutiliza o mesmo QueryClient
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}
