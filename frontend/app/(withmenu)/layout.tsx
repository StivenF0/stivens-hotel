"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import { AuthWrapper } from "@/components/wrappers/auth-wrapper";

export default function MenuLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, isAdmin, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <AuthWrapper>
      <section className="min-h-screen flex flex-col">
        <header className="w-full bg-secondary py-4 px-6 flex justify-between">
          <div className="flex gap-2 items-center justify-center">
            <div className="w-12 h-12">
              <Image
                className="w-full h-full"
                src="/menu/logo.svg"
                alt="Logo"
                width={48}
                height={48}
              />
            </div>
            <h1 className="text-foreground font-[Poppins,sans-serif] font-semibold text-3xl">
              Stiven's Hotel
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="text-2xl text-primary font-light">
              Olá, <span className="font-medium">{user?.name || "Visitante"}!</span>
            </div>
            <div className="w-12 h-12">
              <Image
                className="w-full h-full"
                src="/menu/user_icon.svg"
                alt="Logo"
                width={48}
                height={48}
              />
            </div>
            {/* Botão de Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-danger/80 hover:bg-danger text-white rounded-xl transition-all font-montserrat font-medium"
              title="Sair"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </header>
        <main className={`grid flex-1 transition-all duration-300 ${isSidebarOpen ? 'grid-cols-[1fr_20rem]' : 'grid-cols-[1fr_4rem]'}`}>
          {/* Content Section */}
          <div className="bg-background px-8">
            {/* ==== Main container (children) ==== */}
            <div className="pb-5 w-full max-w-7xl mx-auto flex flex-col min-h-full">
              {children}
            </div>
          </div>
          {/* Sidebar */}
          <div className={`flex flex-col bg-foreground p-4 relative ${isSidebarOpen ? '' : 'items-center'}`}>
            {/* Botão de Colapsar */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="absolute -left-3 top-6 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-secondary/80 transition-all shadow-lg z-10"
              title={isSidebarOpen ? "Recolher menu" : "Expandir menu"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`}
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Nav-Link: Dashboard */}
            <Link
              className={`p-4 flex items-center rounded-xl hover:bg-secondary/15 cursor-pointer ${isSidebarOpen ? 'w-full gap-2' : 'w-12 h-12 justify-center'}`}
              href="/dashboard"
              title="Dashboard"
            >
              <div className="w-8 h-8 flex-shrink-0">
                <Image
                  className="w-full h-full"
                  src="/menu/dashboard_icon.svg"
                  alt="dashboard_icon"
                  width={24}
                  height={24}
                />
              </div>
              {isSidebarOpen && (
                <p className="text-2xl font-montserrat font-semibold text-tertiary whitespace-nowrap">
                  Dashboard
                </p>
              )}
            </Link>
            {/* Nav-Link: Reservas */}
            <Link
              className={`p-4 flex items-center rounded-xl hover:bg-secondary/15 cursor-pointer ${isSidebarOpen ? 'w-full gap-2' : 'w-12 h-12 justify-center'}`}
              href="/reservations"
              title="Reservas"
            >
              <div className="w-8 h-8 flex-shrink-0">
                <Image
                  className="w-full h-full"
                  src="/menu/reservas_icon.svg"
                  alt="reservas_icon"
                  width={24}
                  height={24}
                />
              </div>
              {isSidebarOpen && (
                <p className="text-2xl font-montserrat font-semibold text-tertiary whitespace-nowrap">
                  Reservas
                </p>
              )}
            </Link>
            {/* Nav-Link: Hóspedes */}
            <Link
              className={`p-4 flex items-center rounded-xl hover:bg-secondary/15 cursor-pointer ${isSidebarOpen ? 'w-full gap-2' : 'w-12 h-12 justify-center'}`}
              href="/guests"
              title="Hóspedes"
            >
              <div className="w-8 h-8 flex-shrink-0">
                <Image
                  className="w-full h-full"
                  src="/menu/hospedes_icon.svg"
                  alt="hospedes_icon"
                  width={24}
                  height={24}
                />
              </div>
              {isSidebarOpen && (
                <p className="text-2xl font-montserrat font-semibold text-tertiary whitespace-nowrap">
                  Hóspedes
                </p>
              )}
            </Link>
            {/* Nav-Link: Quartos */}
            <Link
              className={`p-4 flex items-center rounded-xl hover:bg-secondary/15 cursor-pointer ${isSidebarOpen ? 'w-full gap-2' : 'w-12 h-12 justify-center'}`}
              href="/rooms"
              title="Quartos"
            >
              <div className="w-8 h-8 flex-shrink-0">
                <Image
                  className="w-full h-full"
                  src="/menu/key_icon.svg"
                  alt="key_icon"
                  width={24}
                  height={24}
                />
              </div>
              {isSidebarOpen && (
                <p className="text-2xl font-montserrat font-semibold text-tertiary whitespace-nowrap">
                  Quartos
                </p>
              )}
            </Link>
            {/* Nav-Link: Tipos de Quarto */}
            <Link
              className={`p-4 flex items-center rounded-xl hover:bg-secondary/15 cursor-pointer ${isSidebarOpen ? 'w-full gap-2' : 'w-12 h-12 justify-center'}`}
              href="/room-types"
              title="Tipos de Quarto"
            >
              <div className="w-8 h-8 flex-shrink-0">
                <Image
                  className="w-full h-full"
                  src="/menu/key_icon.svg"
                  alt="room_types_icon"
                  width={24}
                  height={24}
                />
              </div>
              {isSidebarOpen && (
                <p className="text-2xl font-montserrat font-semibold text-tertiary whitespace-nowrap">
                  Tipos de Quarto
                </p>
              )}
            </Link>
            {/* Nav-Link: Usuários */}
            {isAdmin && (
              <Link
                className={`p-4 flex items-center rounded-xl hover:bg-secondary/15 cursor-pointer ${isSidebarOpen ? 'w-full gap-2' : 'w-12 h-12 justify-center'}`}
                href="/users"
                title="Usuários"
              >
                <div className="w-8 h-8 flex-shrink-0">
                  <Image className="w-full h-full" src="/menu/user.svg" alt="user" width={24} height={24} />
                </div>
                {isSidebarOpen && (
                  <p className="text-2xl font-montserrat font-semibold text-tertiary whitespace-nowrap">Usuários</p>
                )}
              </Link>
            )}
          </div>
        </main>
      </section>
    </AuthWrapper>
  );
}
