"use client";

import { useState } from "react";
import { useGuests } from "@/hooks/use-guests";
import { Guest } from "@/utils/types";
import { SearchBar } from "@/components/ui/search-bar";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { GuestModal } from "@/components/guests/guest-modal";
import { GuestDeleteModal } from "@/components/guests/guest-delete-modal";

export default function GuestsPage() {
  const { guests, isLoading, isError } = useGuests();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (guest?: Guest) => {
    setSelectedGuest(guest || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGuest(null);
  };

  const handleOpenDeleteModal = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedGuest(null);
  };

  const safeGuests = guests || [];

  const filteredGuests = safeGuests.filter((guest) =>
    guest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.cpf.includes(searchTerm)
  );

  if (isError) return <div className="p-10 font-montserrat text-2xl text-danger">Erro ao carregar dados.</div>;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold font-[Poppins] text-5xl py-6 text-secondary">
          Gerenciamento de Hóspedes
        </h1>
        <div>
          <button
            onClick={() => handleOpenModal()}
            className="flex gap-3 cursor-pointer bg-green-light px-3 py-2 font-[Montserrat] font-semibold text-2xl text-white rounded-xl hover:opacity-90 transition"
          >
            <img src="/svg/add_icon.svg" alt="" />
            Adicionar novo hóspede
          </button>
        </div>
      </div>

      <SearchBar onSearch={setSearchTerm} placeholder="Pesquisar por nome ou CPF..." />

      <div className="overflow-x-auto">
        <table className="mt-12 w-full font-[Montserrat] font-semibold border border-foreground">
          <thead className="text-3xl border-b border-foreground bg-background">
            <tr>
              <th className="py-3 border-x border-foreground">Nome Completo</th>
              <th className="py-3 border-x border-foreground">CPF</th>
              <th className="py-3 border-x border-foreground">Telefone</th>
              <th className="py-3 border-x border-foreground">Ações</th>
            </tr>
          </thead>
          <tbody className="text-2xl">
            {isLoading ? (
               <TableSkeleton 
                 columns={[
                   { type: "text", width: "w-48" },
                   { type: "text", width: "w-32" },
                   { type: "text", width: "w-32" },
                   { type: "actions", count: 2 }
                 ]}
               /> 
            ) : (
              filteredGuests?.map((guest) => (
                <tr key={guest.id} className="text-center bg-tertiary hover:bg-white transition duration-200">
                  <td className="py-3 border-x border-foreground px-2">{guest.fullName}</td>
                  <td className="py-3 border-x border-foreground">{guest.cpf}</td>
                  <td className="py-3 border-x border-foreground">{guest.phone}</td>
                  <td className="py-3 border-x border-foreground">
                    <div className="flex items-center justify-center gap-5">

                      <button onClick={() => handleOpenModal(guest)} className="cursor-pointer hover:scale-110 transition">
                        <img src="/svg/edit_brown_icon.svg" alt="Editar" />
                      </button>
                      
                      <button onClick={() => handleOpenDeleteModal(guest)} className="cursor-pointer hover:scale-110 transition">
                        <svg width="28" height="30" viewBox="0 0 28 30" fill="none" className="text-danger" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_67_395)">
                            <path d="M10.9087 13.6364V21.8182" stroke="currentColor" strokeWidth="2.72727" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.3638 13.6364V21.8182" stroke="currentColor" strokeWidth="2.72727" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M23.1817 6.81818V25.9091C23.1817 26.6324 22.8944 27.3261 22.3829 27.8376C21.8715 28.349 21.1778 28.6364 20.4545 28.6364H6.81809C6.09478 28.6364 5.40108 28.349 4.88962 27.8376C4.37816 27.3261 4.09082 26.6324 4.09082 25.9091V6.81818" stroke="currentColor" strokeWidth="2.72727" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1.36377 6.81818H25.9092" stroke="currentColor" strokeWidth="2.72727" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.18213 6.81819V4.09092C8.18213 3.3676 8.46947 2.67391 8.98093 2.16245C9.49239 1.65098 10.1861 1.36365 10.9094 1.36365H16.3639C17.0873 1.36365 17.781 1.65098 18.2924 2.16245C18.8039 2.67391 19.0912 3.3676 19.0912 4.09092V6.81819" stroke="currentColor" strokeWidth="2.72727" strokeLinecap="round" strokeLinejoin="round"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_67_395"><rect width="27.2727" height="30" fill="currentColor"/></clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            
            {filteredGuests?.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500 font-montserrat">
                  Nenhum hóspede encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <GuestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        guest={selectedGuest}
      />

      <GuestDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        guest={selectedGuest}
      />
    </>
  );
}