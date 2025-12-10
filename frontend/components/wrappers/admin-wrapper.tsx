"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export function AdminWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user || !isAdmin) {
        router.push("/dashboard"); 
      }
    }
  }, [user, isLoading, isAdmin, router]);

  if (isLoading || !isAdmin) {
    return null; 
  }

  return <>{children}</>;
}