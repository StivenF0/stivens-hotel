"use client";

import { useMemo } from "react";
import { useRooms } from "@/hooks/use-rooms";
import { useReservations, useCheckIn, useCheckOut } from "@/hooks/use-reservations";
import { RoomStatus } from "@/services/room-service";
import { Reservation, ReservationStatus } from "@/services/reservation-service";

function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-300 rounded w-48 mb-6"></div>
      <div className="bg-tertiary w-full p-12 rounded-4xl h-[380px]">
        <div className="grid grid-cols-2 h-full">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="h-8 bg-gray-300 rounded w-64"></div>
            <div className="h-6 bg-gray-300 rounded w-48"></div>
            <div className="h-6 bg-gray-300 rounded w-48"></div>
            <div className="h-6 bg-gray-300 rounded w-48"></div>
            <div className="h-6 bg-gray-300 rounded w-48"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-60 h-60 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: rooms, isLoading: loadingRooms } = useRooms();
  const { data: reservations, isLoading: loadingReservations } = useReservations();
  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();

  const today = getTodayDate();

  const roomStats = useMemo(() => {
    if (!rooms) return { available: 0, occupied: 0, cleaning: 0, maintenance: 0, total: 0 };

    const stats = {
      available: 0,
      occupied: 0,
      cleaning: 0,
      maintenance: 0,
      total: rooms.length,
    };

    rooms.forEach((room) => {
      switch (room.status) {
        case "AVAILABLE":
          stats.available++;
          break;
        case "OCCUPIED":
          stats.occupied++;
          break;
        case "CLEANING":
          stats.cleaning++;
          break;
        case "MAINTANCE":
          stats.maintenance++;
          break;
      }
    });

    return stats;
  }, [rooms]);

  const chartPercentages = useMemo(() => {
    if (roomStats.total === 0) return { available: 25, occupied: 25, cleaning: 25, maintenance: 25 };

    return {
      available: (roomStats.available / roomStats.total) * 100,
      occupied: (roomStats.occupied / roomStats.total) * 100,
      cleaning: (roomStats.cleaning / roomStats.total) * 100,
      maintenance: (roomStats.maintenance / roomStats.total) * 100,
    };
  }, [roomStats]);

  const checkInsToday = useMemo(() => {
    if (!reservations) return [];
    return reservations.filter(
      (r) => r.checkInDate === today && r.status === "CONFIRMED"
    );
  }, [reservations, today]);

  const checkOutsToday = useMemo(() => {
    if (!reservations) return [];
    return reservations.filter(
      (r) => r.checkOutDate === today && r.status === "IN_PROGRESS"
    );
  }, [reservations, today]);

  const handleCheckIn = (id: number) => {
    checkInMutation.mutate(id);
  };

  const handleCheckOut = (id: number) => {
    checkOutMutation.mutate(id);
  };

  if (loadingRooms || loadingReservations) {
    return <DashboardSkeleton />;
  }

  const generateConicGradient = () => {
    let current = 0;
    const segments: string[] = [];

    if (chartPercentages.available > 0) {
      segments.push(`#2a5b4f ${current}% ${current + chartPercentages.available}%`);
      current += chartPercentages.available;
    }

    if (chartPercentages.occupied > 0) {
      segments.push(`#8c484e ${current}% ${current + chartPercentages.occupied}%`);
      current += chartPercentages.occupied;
    }

    if (chartPercentages.cleaning > 0) {
      segments.push(`#6b9ac4 ${current}% ${current + chartPercentages.cleaning}%`);
      current += chartPercentages.cleaning;
    }

    if (chartPercentages.maintenance > 0) {
      segments.push(`#d88c72 ${current}% ${current + chartPercentages.maintenance}%`);
      current += chartPercentages.maintenance;
    }

    return segments.length > 0 ? `conic-gradient(${segments.join(", ")})` : "#e5e5e5";
  };

  return (
    <>
      <h1 className="font-bold font-poppins text-5xl py-6">Dashboard</h1>
      <div className="bg-tertiary w-full p-12 grid grid-cols-2 rounded-4xl h-[380px]">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center font-montserrat font-medium text-3xl gap-4">
          <h1 className="font-bold font-poppins text-4xl">
            Resumo de Operação
          </h1>
          <div className="flex items-center gap-4 w-[300px]">
            <div className="h-7 w-7 bg-success border"></div>
            <p>Disponível ({roomStats.available})</p>
          </div>
          <div className="flex items-center gap-4 w-[300px]">
            <div className="h-7 w-7 bg-danger border"></div>
            <p>Ocupado ({roomStats.occupied})</p>
          </div>
          <div className="flex items-center gap-4 w-[300px]">
            <div className="h-7 w-7 bg-info border"></div>
            <p>Limpeza ({roomStats.cleaning})</p>
          </div>
          <div className="flex items-center gap-4 w-[300px]">
            <div className="h-7 w-7 bg-warning border"></div>
            <p>Em manutenção ({roomStats.maintenance})</p>
          </div>
        </div>
        {/* Right Side*/}
        <div className="grid place-items-center">
          {roomStats.total > 0 ? (
            <div
              className="overflow-hidden rounded-[50%] w-60 h-60"
              style={{
                background: generateConicGradient(),
              }}
            />
          ) : (
            <div className="text-xl text-gray-500 font-montserrat">
              Nenhum quarto cadastrado
            </div>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-2 h-[380px] gap-8 mt-6">
        {/* Check-In board */}
        <div className="flex flex-col items-center bg-tertiary rounded-4xl px-6 py-6 overflow-y-auto font-montserrat gap-4">
          <h1 className="font-bold font-poppins text-4xl">Check-ins de hoje</h1>
          <div className="w-full h-px bg-[#4A4036] opacity-36"></div>
          {checkInsToday.length === 0 ? (
            <p className="text-xl text-gray-500 mt-4">Nenhum check-in pendente para hoje</p>
          ) : (
            checkInsToday.map((reservation) => (
              <div key={reservation.id} className="w-full text-2xl font-medium flex justify-between items-center">
                <div>
                  Quarto {reservation.room.number}: {reservation.guest.fullName}
                </div>
                <button
                  onClick={() => handleCheckIn(reservation.id)}
                  disabled={checkInMutation.isPending}
                  className="px-3 py-2 bg-success text-white font-bold rounded-3xl cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkInMutation.isPending ? "..." : "Check-In"}
                </button>
              </div>
            ))
          )}
        </div>
        {/* Check-Out board */}
        <div className="flex flex-col items-center bg-tertiary rounded-4xl px-6 py-6 overflow-y-auto font-montserrat gap-4">
          <h1 className="font-bold font-poppins text-4xl">
            Check-outs de hoje
          </h1>
          <div className="w-full h-px bg-[#4A4036] opacity-36"></div>
          {checkOutsToday.length === 0 ? (
            <p className="text-xl text-gray-500 mt-4">Nenhum check-out pendente para hoje</p>
          ) : (
            checkOutsToday.map((reservation) => (
              <div key={reservation.id} className="w-full text-2xl font-medium flex justify-between items-center">
                <div>
                  Quarto {reservation.room.number}: {reservation.guest.fullName}
                </div>
                <button
                  onClick={() => handleCheckOut(reservation.id)}
                  disabled={checkOutMutation.isPending}
                  className="px-3 py-2 bg-danger text-white font-bold rounded-3xl cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkOutMutation.isPending ? "..." : "Check-Out"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
