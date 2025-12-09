"use client";

import { useState } from "react";
import { useRoomTypes, useDeleteRoomType } from "@/hooks/use-room-types";
import { RoomTypeModal } from "@/components/room-types/room-type-modal";
import { RoomType } from "@/services/room-type-service";
import { TrashIcon } from "@/components/ui/trash-icon";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function RoomTypeRow({
  roomType,
  onEdit,
  onDelete,
}: {
  roomType: RoomType;
  onEdit: (rt: RoomType) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <tr className="text-center bg-tertiary">
      <td className="py-3 border-x border-foreground">{roomType.name}</td>
      <td className="py-3 border-x border-foreground">
        {roomType.description || "-"}
      </td>
      <td className="py-3 border-x border-foreground">
        {formatCurrency(roomType.dailyPrice)}
      </td>
      <td className="py-3 border-x border-foreground">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => onEdit(roomType)}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <img src="/svg/edit_brown_icon.svg" alt="Editar" />
          </button>
          <button
            onClick={() => onDelete(roomType.id)}
            className="cursor-pointer hover:opacity-70 transition-opacity"
            title="Excluir"
          >
            <TrashIcon />
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
            <div className="h-6 bg-foreground/20 rounded w-48 mx-auto" />
          </td>
          <td className="py-3 border-x border-foreground">
            <div className="h-6 bg-foreground/20 rounded w-24 mx-auto" />
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

export default function RoomTypesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null);
  const [search, setSearch] = useState("");

  const { data: roomTypes, isLoading, error } = useRoomTypes();
  const deleteRoomType = useDeleteRoomType();

  const filteredRoomTypes = roomTypes?.filter((rt) =>
    rt.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(roomType: RoomType) {
    setEditingRoomType(roomType);
    setIsModalOpen(true);
  }

  function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir este tipo de quarto?")) {
      deleteRoomType.mutate(id);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingRoomType(null);
  }

  function handleOpenNew() {
    setEditingRoomType(null);
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold font-poppins text-5xl py-6">
          Tipos de Quarto
        </h1>
        <button
          onClick={handleOpenNew}
          className="flex gap-3 cursor-pointer bg-green-light px-3 py-2 font-montserrat font-semibold text-2xl text-white rounded-xl hover:brightness-95 transition-all"
        >
          <img src="/svg/add_icon.svg" alt="" />
          Novo tipo
        </button>
      </div>

      {/* Searchbar */}
      <div className="mt-4 w-full grid grid-cols-[1fr_300px]">
        <input
          className="border border-foreground bg-tertiary text-2xl px-4 py-3 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-info"
          type="text"
          placeholder="Buscar por nome..."
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
          Erro ao carregar tipos de quarto: {error.message}
        </div>
      )}

      {/* Table */}
      <table className="mt-12 w-full font-montserrat font-semibold border border-foreground">
        <thead className="text-3xl border-b border-foreground">
          <tr>
            <th className="py-3 border-x border-foreground">Nome</th>
            <th className="py-3 border-x border-foreground">Descrição</th>
            <th className="py-3 border-x border-foreground">Diária</th>
            <th className="py-3 border-x border-foreground">Ações</th>
          </tr>
        </thead>
        <tbody className="text-2xl">
          {isLoading ? (
            <TableSkeleton />
          ) : filteredRoomTypes && filteredRoomTypes.length > 0 ? (
            filteredRoomTypes.map((roomType) => (
              <RoomTypeRow
                key={roomType.id}
                roomType={roomType}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="py-12 text-center text-foreground text-xl"
              >
                {search
                  ? "Nenhum tipo de quarto encontrado."
                  : "Nenhum tipo de quarto cadastrado."}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <RoomTypeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        roomType={editingRoomType}
      />
    </>
  );
}
