export default function Rooms() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold font-[Poppins] text-5xl py-6">Quartos</h1>
        <div className="">
          <a
            href="./new.html"
            className="flex gap-3 cursor-pointer bg-green-light px-3 py-2 font-[Montserrat] font-semibold text-2xl text-white rounded-xl"
          >
            <img src="/svg/add_icon.svg" alt="" />
            Adicionar novo quarto
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
      {/* Cards Container */}
      <div className="w-full flex-1 mb-10 mt-8 flex gap-4 font-[Montserrat] font-medium flex-wrap content-start justify-start">
        {/* Card 1*/}
        <a href="./edit.html">
          <div className="w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm border-l-7 border-success grid grid-cols-1 grid-rows-3 p-2">
            <div className="place-self-end w-full text-[38px] text-success">
              A-10
            </div>
            <div className="place-self-start w-full text-2xl text-foreground">
              Solteiro
            </div>
            <div className="place-self-end text-end w-full text-2xl text-success">
              Disponível
            </div>
          </div>
        </a>
        {/* Card 2*/}
        <div className="w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm border-l-7 border-danger grid grid-cols-1 grid-rows-3 p-2">
          <div className="place-self-end w-full text-[38px] text-danger">
            A-20
          </div>
          <div className="place-self-start w-full text-2xl text-foreground">
            Casal
          </div>
          <div className="place-self-end text-end w-full text-2xl text-danger">
            Ocupado
          </div>
        </div>
        {/* Card 1*/}
        <div className="w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm border-l-7 border-warning grid grid-cols-1 grid-rows-3 p-2">
          <div className="place-self-end w-full text-[38px] text-warning">
            A-30
          </div>
          <div className="place-self-start w-full text-2xl text-foreground">
            Solteiro
          </div>
          <div className="place-self-end text-end w-full text-2xl text-warning">
            Manutenção
          </div>
        </div>
        {/* Card 1*/}
        <div className="w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm border-l-7 border-info grid grid-cols-1 grid-rows-3 p-2">
          <div className="place-self-end w-full text-[38px] text-info">
            A-40
          </div>
          <div className="place-self-start w-full text-2xl text-foreground">
            Casal
          </div>
          <div className="place-self-end text-end w-full text-2xl text-info">
            Limpeza
          </div>
        </div>
        {/* Card 1*/}
        <div className="w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm border-l-7 border-info grid grid-cols-1 grid-rows-3 p-2">
          <div className="place-self-end w-full text-[38px] text-info">
            A-40
          </div>
          <div className="place-self-start w-full text-2xl text-foreground">
            Casal
          </div>
          <div className="place-self-end text-end w-full text-2xl text-info">
            Limpeza
          </div>
        </div>
        {/* Card 1*/}
        <div className="w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm border-l-7 border-info grid grid-cols-1 grid-rows-3 p-2">
          <div className="place-self-end w-full text-[38px] text-info">
            A-40
          </div>
          <div className="place-self-start w-full text-2xl text-foreground">
            Casal
          </div>
          <div className="place-self-end text-end w-full text-2xl text-info">
            Limpeza
          </div>
        </div>
        {/* Card 1*/}
        <div className="w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm border-l-7 border-info grid grid-cols-1 grid-rows-3 p-2">
          <div className="place-self-end w-full text-[38px] text-info">
            A-40
          </div>
          <div className="place-self-start w-full text-2xl text-foreground">
            Casal
          </div>
          <div className="place-self-end text-end w-full text-2xl text-info">
            Limpeza
          </div>
        </div>
        {/* Card 1*/}
        <div className="w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm border-l-7 border-info grid grid-cols-1 grid-rows-3 p-2">
          <div className="place-self-end w-full text-[38px] text-info">
            A-40
          </div>
          <div className="place-self-start w-full text-2xl text-foreground">
            Casal
          </div>
          <div className="place-self-end text-end w-full text-2xl text-info">
            Limpeza
          </div>
        </div>
      </div>
    </>
  );
}
