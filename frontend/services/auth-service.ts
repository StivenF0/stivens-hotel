import { api } from "@/lib/api";

// Tipos
export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "RECEPCIONIST";
}

export interface LoginCredentials {
  name: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Chaves do localStorage
const TOKEN_KEY = "token";
const USER_KEY = "user";

// Service de Autenticação
export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    const { token, user } = response.data;

    // Armazena no localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    return response.data;
  },

  // Logout
  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  // Obtém o token armazenado
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  // Obtém o usuário armazenado
  getUser(): User | null {
    if (typeof window === "undefined") return null;
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  },

  // Verifica se está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Verifica se o usuário tem uma role específica
  hasRole(role: "ADMIN" | "RECEPTIONIST"): boolean {
    const user = this.getUser();
    return user?.role === role;
  },

  // Verifica se é admin
  isAdmin(): boolean {
    return this.hasRole("ADMIN");
  },
};
