export default function Dashboard() {
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
            <p>Disponível</p>
          </div>
          <div className="flex items-center gap-4 w-[300px]">
            <div className="h-7 w-7 bg-danger border"></div>
            <p>Ocupado</p>
          </div>
          <div className="flex items-center gap-4 w-[300px]">
            <div className="h-7 w-7 bg-info border"></div>
            <p>Limpeza</p>
          </div>
          <div className="flex items-center gap-4 w-[300px]">
            <div className="h-7 w-7 bg-warning border"></div>
            <p>Em manutenção</p>
          </div>
        </div>
        {/* Right Side*/}
        <div className="grid place-items-center">
          <div
            className="overflow-hidden rounded-[50%] w-60 h-60"
            style={{
              background:
                "conic-gradient(#6b9ac4 0% 16%, #d88c72 16% 33%, #8c484e 33% 66%, #2a5b4f 66% 100%);",
            }}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 h-[380px] gap-8 mt-6">
        {/* Check-In board */}
        <div className="flex flex-col items-center justify-center bg-tertiary rounded-4xl px-6 overflow-y-auto font-montserrat gap-4">
          <h1 className="font-bold font-poppins text-4xl">Check-ins de hoje</h1>
          <div className="w-full h-px bg-[#4A4036] opacity-36"></div>
          <div className="w-full text-3xl font-medium flex justify-between items-center">
            <div>Quarto A-10: Isaul Felipe</div>
            <button className="px-3 py-2 bg-success text-white font-bold rounded-3xl cursor-pointer">
              Check-In
            </button>
          </div>
          <div className="w-full text-3xl font-medium flex justify-between items-center">
            <div>Quarto A-10: Isaul Felipe</div>
            <button className="px-3 py-2 bg-success text-white font-bold rounded-3xl cursor-pointer">
              Check-In
            </button>
          </div>
          <div className="w-full text-3xl font-medium flex justify-between items-center">
            <div>Quarto A-10: Isaul Felipe</div>
            <button className="px-3 py-2 bg-success text-white font-bold rounded-3xl cursor-pointer">
              Check-In
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-tertiary rounded-4xl px-6 overflow-y-auto font-montserrat gap-4">
          <h1 className="font-bold font-poppins text-4xl">
            Check-outs de hoje
          </h1>
          <div className="w-full h-px bg-[#4A4036] opacity-36"></div>
          <div className="w-full text-3xl font-medium flex justify-between items-center">
            <div>Quarto A-10: Isaul Felipe</div>
            <button className="px-3 py-2 bg-danger text-white font-bold rounded-3xl cursor-pointer">
              Check-Out
            </button>
          </div>
          <div className="w-full text-3xl font-medium flex justify-between items-center">
            <div>Quarto A-10: Isaul Felipe</div>
            <button className="px-3 py-2 bg-danger text-white font-bold rounded-3xl cursor-pointer">
              Check-Out
            </button>
          </div>
          <div className="w-full text-3xl font-medium flex justify-between items-center">
            <div>Quarto A-10: Isaul Felipe</div>
            <button className="px-3 py-2 bg-danger text-white font-bold rounded-3xl cursor-pointer">
              Check-Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
