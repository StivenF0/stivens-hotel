"use client";

import { useState } from "react";
import { useRooms } from "@/hooks/use-rooms";
import { RoomModal } from "@/components/rooms/room-modal";
import { Room, RoomStatus } from "@/services/room-service";
import { SearchBar } from "@/components/ui/search-bar";

// Mapeia status para cores e labels
const STATUS_CONFIG: Record<
  RoomStatus,
  { color: string; textColor: string; label: string }
> = {
  AVAILABLE: {
    color: "border-success",
    textColor: "text-success",
    label: "Disponível",
  },
  OCCUPIED: {
    color: "border-danger",
    textColor: "text-danger",
    label: "Ocupado",
  },
  CLEANING: { color: "border-info", textColor: "text-info", label: "Limpeza" },
  MAINTANCE: {
    color: "border-warning",
    textColor: "text-warning",
    label: "Manutenção",
  },
};

function RoomCard({ room, onClick }: { room: Room; onClick: () => void }) {
  const config = STATUS_CONFIG[room.status];

  return (
    <div
      onClick={onClick}
      className={`w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm border-l-7 ${config.color} grid grid-cols-1 grid-rows-3 p-2 cursor-pointer hover:shadow-md transition-shadow`}
    >
      <div className={`place-self-end w-full text-[38px] ${config.textColor}`}>
        {room.number}
      </div>
      <div className="place-self-start w-full text-2xl text-foreground">
        {room.roomType.name}
      </div>
      <div
        className={`place-self-end text-end w-full text-2xl ${config.textColor}`}
      >
        {config.label}
      </div>
    </div>
  );
}

function RoomCardSkeleton() {
  return (
    <div className="w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm border-l-7 border-foreground/30 grid grid-cols-1 grid-rows-3 p-2 animate-pulse">
      <div className="place-self-end w-full">
        <div className="h-10 bg-foreground/20 rounded w-20 ml-auto" />
      </div>
      <div className="place-self-start w-full">
        <div className="h-6 bg-foreground/20 rounded w-24" />
      </div>
      <div className="place-self-end text-end w-full">
        <div className="h-6 bg-foreground/20 rounded w-28 ml-auto" />
      </div>
    </div>
  );
}

export default function RoomsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [search, setSearch] = useState("");
  const { data: rooms, isLoading, error } = useRooms();

  // Filtra quartos pelo número ou tipo
  const filteredRooms = rooms?.filter(
    (room) =>
      room.number.toLowerCase().includes(search.toLowerCase()) ||
      room.roomType.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(room: Room) {
    setEditingRoom(room);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setEditingRoom(null);
    setIsModalOpen(false);
  }

  function handleOpenNew() {
    setEditingRoom(null);
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold font-poppins text-5xl py-6">Quartos</h1>
        <button
          onClick={handleOpenNew}
          className="flex gap-3 cursor-pointer bg-green-light px-3 py-2 font-montserrat font-semibold text-2xl text-white rounded-xl hover:brightness-95 transition-all"
        >
          <img src="/svg/add_icon.svg" alt="" />
          Adicionar novo quarto
        </button>
      </div>

      {/* Searchbar */}
      <SearchBar
        placeholder="Buscar por código ou tipo..."
        value={search}
        onSearch={setSearch}
      />

      {/* Error State */}
      {error && (
        <div className="mt-8 p-4 bg-danger/10 border border-danger rounded-lg text-danger">
          Erro ao carregar quartos: {error.message}
        </div>
      )}

      {/* Cards Container */}
      <div className="w-full flex-1 mb-10 mt-8 flex gap-4 font-montserrat font-medium flex-wrap content-start justify-start">
        {isLoading ? (
          // Skeleton loading
          <>
            {[...Array(8)].map((_, i) => (
              <RoomCardSkeleton key={i} />
            ))}
          </>
        ) : filteredRooms && filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onClick={() => handleEdit(room)}
            />
          ))
        ) : (
          <div className="w-full text-center text-foreground text-xl py-12">
            {search ? "Nenhum quarto encontrado." : "Nenhum quarto cadastrado."}
          </div>
        )}
      </div>

      {/* Modal */}
      <RoomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        room={editingRoom}
      />
    </>
  );
}
