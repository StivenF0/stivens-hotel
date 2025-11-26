export default function Reservations() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold font-[Poppins] text-5xl py-6">Reservas</h1>
        <div className="">
          <a
            href="./new.html"
            className="flex gap-3 cursor-pointer bg-green-light px-3 py-2 font-[Montserrat] font-semibold text-2xl text-white rounded-xl"
          >
            <img src="/svg/add_icon.svg" alt="" />
            Adicionar Reserva
          </a>
        </div>
      </div>

      {/* Searchbar */}
      <div className="mt-4 w-full grid grid-cols-[1fr_300px]">
        <input
          className="border border-foreground bg-tertiary text-2xl px-4 py-3 rounded-l-2xl"
          type="text"
        />
        <button className="bg-info text-tertiary text-3xl flex items-center justify-center gap-3 font-semibold px-4 py-2 rounded-r-2xl cursor-pointer">
          <img src="/svg/search_icon.svg" alt="" />
          <div>Pesquisar</div>
        </button>
      </div>

      {/* Table */}
      <table className="mt-12 font-[Montserrat] font-semibold border border-foreground">
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
          {/* Row example */}
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">Antônio Weine</td>
            <td className="py-3 border-x border-foreground">E-10</td>
            <td className="py-3 border-x border-foreground">
              08/09/2025 - 10/09/2025
            </td>
            <td className="py-3 border-x border-foreground">
              <div className="px-3 py-1 bg-success text-white w-max mx-auto rounded-2xl">
                Confirmada
              </div>
            </td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-4">
              <a href="reservation.html">
                <button className="cursor-pointer">
                  <img src="/svg/info_icon.svg" alt="info_icon" />
                </button>
              </a>
              <a href="edit.html">
                <button className="cursor-pointer">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </button>
              </a>
            </td>
          </tr>
          {/* Row repetitions */}
          <tr className="text-center border-foreground bg-tertiary">
            <td className="py-3 border-x border-foreground">Antônio Weine</td>
            <td className="py-3 border-x border-foreground">E-10</td>
            <td className="py-3 border-x border-foreground">
              08/09/2025 - 10/09/2025
            </td>
            <td className="py-3 border-x border-foreground">
              <div className="px-3 py-1 bg-danger text-white w-max mx-auto rounded-2xl">
                Cancelada
              </div>
            </td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-4">
              <a href="reservation.html">
                <button className="cursor-pointer">
                  <img src="/svg/info_icon.svg" alt="info_icon" />
                </button>
              </a>
              <a href="edit.html">
                <button className="cursor-pointer">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </button>
              </a>
            </td>
          </tr>
          <tr className="text-center border-foreground bg-tertiary">
            <td className="py-3 border-x border-foreground">Antônio Weine</td>
            <td className="py-3 border-x border-foreground">E-10</td>
            <td className="py-3 border-x border-foreground">
              08/09/2025 - 10/09/2025
            </td>
            <td className="py-3 border-x border-foreground">
              <div className="px-3 py-1 bg-info text-white w-max mx-auto rounded-2xl">
                Em andamento
              </div>
            </td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-4">
              <a href="reservation.html">
                <button className="cursor-pointer">
                  <img src="/svg/info_icon.svg" alt="info_icon" />
                </button>
              </a>
              <a href="edit.html">
                <button className="cursor-pointer">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </button>
              </a>
            </td>
          </tr>
          <tr className="text-center border-foreground bg-tertiary">
            <td className="py-3 border-x border-foreground">Antônio Weine</td>
            <td className="py-3 border-x border-foreground">E-10</td>
            <td className="py-3 border-x border-foreground">
              08/09/2025 - 10/09/2025
            </td>
            <td className="py-3 border-x border-foreground">
              <div className="px-3 py-1 bg-yellow-light text-white w-max mx-auto rounded-2xl">
                Finalizado
              </div>
            </td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-4">
              <a href="reservation.html">
                <button className="cursor-pointer">
                  <img src="/svg/info_icon.svg" alt="info_icon" />
                </button>
              </a>
              <a href="edit.html">
                <button className="cursor-pointer">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </button>
              </a>
            </td>
          </tr>
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">Antônio Weine</td>
            <td className="py-3 border-x border-foreground">E-10</td>
            <td className="py-3 border-x border-foreground">
              08/09/2025 - 10/09/2025
            </td>
            <td className="py-3 border-x border-foreground">
              <div className="px-3 py-1 bg-success text-white w-max mx-auto rounded-2xl">
                Confirmada
              </div>
            </td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-4">
              <a href="reservation.html">
                <button className="cursor-pointer">
                  <img src="/svg/info_icon.svg" alt="info_icon" />
                </button>
              </a>
              <a href="edit.html">
                <button className="cursor-pointer">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </button>
              </a>
            </td>
          </tr>
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">Antônio Weine</td>
            <td className="py-3 border-x border-foreground">E-10</td>
            <td className="py-3 border-x border-foreground">
              08/09/2025 - 10/09/2025
            </td>
            <td className="py-3 border-x border-foreground">
              <div className="px-3 py-1 bg-success text-white w-max mx-auto rounded-2xl">
                Confirmada
              </div>
            </td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-4">
              <a href="reservation.html">
                <button className="cursor-pointer">
                  <img src="/svg/info_icon.svg" alt="info_icon" />
                </button>
              </a>
              <a href="edit.html">
                <button className="cursor-pointer">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </button>
              </a>
            </td>
          </tr>
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">Antônio Weine</td>
            <td className="py-3 border-x border-foreground">E-10</td>
            <td className="py-3 border-x border-foreground">
              08/09/2025 - 10/09/2025
            </td>
            <td className="py-3 border-x border-foreground">
              <div className="px-3 py-1 bg-success text-white w-max mx-auto rounded-2xl">
                Confirmada
              </div>
            </td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-4">
              <a href="reservation.html">
                <button className="cursor-pointer">
                  <img src="/svg/info_icon.svg" alt="info_icon" />
                </button>
              </a>
              <a href="edit.html">
                <button className="cursor-pointer">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </button>
              </a>
            </td>
          </tr>
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">Antônio Weine</td>
            <td className="py-3 border-x border-foreground">E-10</td>
            <td className="py-3 border-x border-foreground">
              08/09/2025 - 10/09/2025
            </td>
            <td className="py-3 border-x border-foreground">
              <div className="px-3 py-1 bg-success text-white w-max mx-auto rounded-2xl">
                Confirmada
              </div>
            </td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-4">
              <a href="reservation.html">
                <button className="cursor-pointer">
                  <img src="/svg/info_icon.svg" alt="info_icon" />
                </button>
              </a>
              <a href="edit.html">
                <button className="cursor-pointer">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
