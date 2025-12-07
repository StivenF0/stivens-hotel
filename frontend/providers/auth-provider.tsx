"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  authService,
  User,
  LoginCredentials,
  LoginResponse,
} from "@/services/auth-service";

// Tipos do contexto
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => void;
  isAdmin: boolean;
}

// Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Carrega usuário do localStorage ao montar
  useEffect(() => {
    const storedUser = authService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  // Login
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    },
    []
  );

  // Logout
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    router.push("/login");
  }, [router]);

  // Computed values
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar o contexto
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
