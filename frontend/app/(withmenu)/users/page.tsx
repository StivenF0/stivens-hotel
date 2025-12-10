"use client";

import { useState } from "react";
import { useUsers } from "@/hooks/use-users";
import { User } from "@/utils/types";
import { SearchBar } from "@/components/ui/search-bar";
import { AdminWrapper } from "@/components/wrappers/admin-wrapper";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { UserModal } from "@/components/users/user-modal";
import { UserDeleteModal } from "@/components/users/user-delete-modal";

export default function UsersPage() {
  const { users, isLoading, isError } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (user?: User) => {
    setSelectedUser(user || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleOpenDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isError) return <div className="p-10 font-montserrat text-2xl text-danger">Erro ao carregar dados.</div>;

  return (
    <AdminWrapper>
      <div className="flex justify-between items-center">
        <h1 className="font-bold font-[Poppins] text-5xl py-6 text-secondary">
          Gerenciamento de Usuários
        </h1>
        <div>
          <button
            onClick={() => handleOpenModal()}
            className="flex gap-3 cursor-pointer bg-green-light px-3 py-2 font-[Montserrat] font-semibold text-2xl text-white rounded-xl hover:opacity-90 transition"
          >
            <img src="/svg/add_icon.svg" alt="" />
            Adicionar novo usuário
          </button>
        </div>
      </div>

      <SearchBar onSearch={setSearchTerm} placeholder="Pesquisar por nome..." />

      <div className="overflow-x-auto">
        <table className="mt-12 w-full font-[Montserrat] font-semibold border border-foreground">
          <thead className="text-3xl border-b border-foreground bg-background">
            <tr>
              <th className="py-3 border-x border-foreground">Nome</th>
              <th className="py-3 border-x border-foreground">Função (Role)</th>
              <th className="py-3 border-x border-foreground">Ações</th>
            </tr>
          </thead>
          <tbody className="text-2xl">
            {isLoading ? (
               <TableSkeleton 
                 columns={[
                   { type: "text", width: "w-40" },
                   { type: "badge", width: "w-32" },
                   { type: "actions", count: 2 }
                 ]}
               /> 
            ) : (
              filteredUsers?.map((user) => (
                <tr key={user.id} className="text-center bg-tertiary hover:bg-white transition duration-200">
                  <td className="py-3 border-x border-foreground px-2">{user.name}</td>
                  <td className="py-3 border-x border-foreground">
                    <span className={`px-4 py-1 rounded-full text-lg ${
                      user.role === "ADMIN" 
                        ? "bg-danger text-white" 
                        : "bg-info text-white"
                    }`}>
                      {user.role === "ADMIN" ? "Administrador" : "Recepcionista"}
                    </span>
                  </td>
                  <td className="py-3 border-x border-foreground">
                    <div className="flex items-center justify-center gap-5">
                      <button onClick={() => handleOpenModal(user)} className="cursor-pointer hover:scale-110 transition">
                        <img src="/svg/edit_brown_icon.svg" alt="Editar" />
                      </button>
                      <button onClick={() => handleOpenDeleteModal(user)} className="cursor-pointer hover:scale-110 transition">
                        <svg width="28" height="30" viewBox="0 0 28 30" fill="none" className="text-danger" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_users)">
                            <path d="M10.9087 13.6364V21.8182" stroke="currentColor" strokeWidth="2.72727" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.3638 13.6364V21.8182" stroke="currentColor" strokeWidth="2.72727" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M23.1817 6.81818V25.9091C23.1817 26.6324 22.8944 27.3261 22.3829 27.8376C21.8715 28.349 21.1778 28.6364 20.4545 28.6364H6.81809C6.09478 28.6364 5.40108 28.349 4.88962 27.8376C4.37816 27.3261 4.09082 26.6324 4.09082 25.9091V6.81818" stroke="currentColor" strokeWidth="2.72727" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1.36377 6.81818H25.9092" stroke="currentColor" strokeWidth="2.72727" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.18213 6.81819V4.09092C8.18213 3.3676 8.46947 2.67391 8.98093 2.16245C9.49239 1.65098 10.1861 1.36365 10.9094 1.36365H16.3639C17.0873 1.36365 17.781 1.65098 18.2924 2.16245C18.8039 2.67391 19.0912 3.3676 19.0912 4.09092V6.81819" stroke="currentColor" strokeWidth="2.72727" strokeLinecap="round" strokeLinejoin="round"/>
                          </g>
                          <defs><clipPath id="clip0_users"><rect width="27.2727" height="30" fill="currentColor"/></clipPath></defs>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />

      <UserDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        user={selectedUser}
      />
    </AdminWrapper>
  );
}