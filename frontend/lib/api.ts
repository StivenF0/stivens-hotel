import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Base URL da API - pode ser alterada via variável de ambiente
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Instância do Axios configurada
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

// Interceptor de Request: Adiciona token JWT automaticamente
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Verifica se está no cliente (browser)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Response: Trata erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Erro 401: Token expirado ou inválido
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Redireciona para login
        window.location.href = "/login";
      }
    }

    // Erro 403: Sem permissão
    if (error.response?.status === 403) {
      console.error("Acesso negado: você não tem permissão para esta ação.");
    }

    // Erro de rede
    if (error.code === "ERR_NETWORK") {
      console.error("Erro de conexão: verifique sua internet.");
    }

    return Promise.reject(error);
  }
);

// Tipos base para respostas da API
export interface ApiError {
  message: string;
  status: number;
}

// Helper para extrair mensagem de erro
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || error.message || "Erro desconhecido"
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Erro desconhecido";
}
