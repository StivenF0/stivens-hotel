"use client";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onSearch: (value: string) => void;
}

export function SearchBar({ placeholder = "Pesquisar...", value, onSearch }: SearchBarProps) {
  return (
    <div className="mt-4 w-full grid grid-cols-[1fr_300px]">
      <input
        className="border border-foreground bg-tertiary text-2xl px-4 py-3 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-info"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="bg-info text-tertiary text-3xl flex items-center justify-center gap-3 font-semibold px-4 py-2 rounded-r-2xl cursor-pointer hover:opacity-90 transition">
        <img src="/svg/search_icon.svg" alt="Buscar" width={30} height={30} />
        <div>Pesquisar</div>
      </button>
    </div>
  );
}