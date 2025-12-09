"use client";

import { useState } from "react";
import { useReservations } from "@/hooks/use-reservations";
import { ReservationModal } from "@/components/reservations/reservation-modal";
import { Reservation, ReservationStatus } from "@/services/reservation-service";

// Mapeia status para cores e labels
const STATUS_CONFIG: Record<ReservationStatus, { bg: string; label: string }> =
  {
    CONFIRMED: { bg: "bg-success", label: "Confirmado" },
    IN_PROGRESS: { bg: "bg-info", label: "Em andamento" },
    COMPLETED: { bg: "bg-yellow-light", label: "Finalizado" },
    CANCELED: { bg: "bg-danger", label: "Cancelado" },
  };

// Formata data de YYYY-MM-DD para DD/MM/YYYY
function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function ReservationRow({
  reservation,
  onEdit,
}: {
  reservation: Reservation;
  onEdit: (res: Reservation) => void;
}) {
  const config = STATUS_CONFIG[reservation.status];

  return (
    <tr className="text-center bg-tertiary">
      <td className="py-3 border-x border-foreground">
        {reservation.guest.fullName}
      </td>
      <td className="py-3 border-x border-foreground">
        {reservation.room.number}
      </td>
      <td className="py-3 border-x border-foreground">
        {formatDate(reservation.checkInDate)} -{" "}
        {formatDate(reservation.checkOutDate)}
      </td>
      <td className="py-3 border-x border-foreground">
        <div
          className={`px-3 py-1 ${config.bg} text-white w-max mx-auto rounded-2xl`}
        >
          {config.label}
        </div>
      </td>
      <td className="py-3 border-x border-foreground">
        <div className="flex items-center justify-center gap-4">
          <button className="cursor-pointer hover:opacity-70 transition-opacity">
            <img src="/svg/info_icon.svg" alt="info_icon" />
          </button>
          <button
            onClick={() => onEdit(reservation)}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function TableSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <tr key={i} className="text-center bg-tertiary animate-pulse">
          <td className="py-3 border-x border-foreground">
            <div className="h-6 bg-foreground/20 rounded w-32 mx-auto" />
          </td>
          <td className="py-3 border-x border-foreground">
            <div className="h-6 bg-foreground/20 rounded w-16 mx-auto" />
          </td>
          <td className="py-3 border-x border-foreground">
            <div className="h-6 bg-foreground/20 rounded w-48 mx-auto" />
          </td>
          <td className="py-3 border-x border-foreground">
            <div className="h-8 bg-foreground/20 rounded-2xl w-28 mx-auto" />
          </td>
          <td className="py-3 border-x border-foreground">
            <div className="flex items-center justify-center gap-4">
              <div className="h-6 w-6 bg-foreground/20 rounded" />
              <div className="h-6 w-6 bg-foreground/20 rounded" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default function ReservationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);
  const [search, setSearch] = useState("");
  const { data: reservations, isLoading, error } = useReservations();

  // Filtra reservas pelo nome do hóspede ou número do quarto
  const filteredReservations = reservations?.filter(
    (res) =>
      res.guest.fullName.toLowerCase().includes(search.toLowerCase()) ||
      res.room.number.toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(reservation: Reservation) {
    setEditingReservation(reservation);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setEditingReservation(null);
    setIsModalOpen(false);
  }

  function handleOpenNew() {
    setEditingReservation(null);
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold font-poppins text-5xl py-6">Reservas</h1>
        <button
          onClick={handleOpenNew}
          className="flex gap-3 cursor-pointer bg-green-light px-3 py-2 font-montserrat font-semibold text-2xl text-white rounded-xl hover:brightness-95 transition-all"
        >
          <img src="/svg/add_icon.svg" alt="" />
          Nova reserva
        </button>
      </div>

      {/* Searchbar */}
      <div className="mt-4 w-full grid grid-cols-[1fr_300px]">
        <input
          className="border border-foreground bg-tertiary text-2xl px-4 py-3 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-info"
          type="text"
          placeholder="Buscar por hóspede ou quarto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-info text-tertiary text-3xl flex items-center justify-center gap-3 font-semibold px-4 py-2 rounded-r-2xl cursor-pointer hover:brightness-95 transition-all">
          <img src="/svg/search_icon.svg" alt="" />
          <div>Pesquisar</div>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mt-8 p-4 bg-danger/10 border border-danger rounded-lg text-danger">
          Erro ao carregar reservas: {error.message}
        </div>
      )}

      {/* Table */}
      <table className="mt-12 w-full font-montserrat font-semibold border border-foreground">
        <thead className="text-3xl border-b border-foreground">
          <tr>
            <th className="py-3 border-x border-foreground">Hóspede</th>
            <th className="py-3 border-x border-foreground">Quarto</th>
            <th className="py-3 border-x border-foreground">Período</th>
            <th className="py-3 border-x border-foreground">Status</th>
            <th className="py-3 border-x border-foreground">Ações</th>
          </tr>
        </thead>
        <tbody className="text-2xl">
          {isLoading ? (
            <TableSkeleton />
          ) : filteredReservations && filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <ReservationRow
                key={reservation.id}
                reservation={reservation}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center text-foreground text-xl"
              >
                {search
                  ? "Nenhuma reserva encontrada."
                  : "Nenhuma reserva cadastrada."}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reservation={editingReservation}
      />
    </>
  );
}
