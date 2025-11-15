import Image from "next/image";
import Link from "next/link";

export default function MenuLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="min-h-screen flex flex-col">
      <header className="w-full bg-secondary py-4 px-6 flex justify-between">
        <div className="flex gap-2 items-center justify-center">
          <div className="w-12 h-12">
            <Image
              className="w-full h-full"
              src="/menu/logo.svg"
              alt="Logo"
              width={48}
              height={48}
            />
          </div>
          <h1 className="text-foreground font-[Poppins,sans-serif] font-semibold text-3xl">
            Stiven's Hotel
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="text-2xl text-primary font-light">
            Olá, <span className="font-medium">Isaul!</span>
          </div>
          <div className="w-12 h-12">
            <Image
              className="w-full h-full"
              src="/menu/user_icon.svg"
              alt="Logo"
              width={48}
              height={48}
            />
          </div>
        </div>
      </header>
      <main className="grid flex-1 grid-cols-[1fr_20rem]">
        {/* Content Section */}
        <div className="bg-background px-8">

          {/* ==== Main container (children) ==== */}
          <div className="pb-5 w-full max-w-7xl mx-auto flex flex-col min-h-full">{children}</div>

        </div>
        {/* Sidebar */}
        <div className="flex flex-col bg-foreground p-4">
          {/* Nav-Link: Dashboard */}
          <Link
            className="w-full p-4 flex items-center gap-2 rounded-xl hover:bg-secondary/15 cursor-pointer"
            href="/dashboard"
          >
            <div className="w-8 h-8">
              <Image
                className="w-full h-full"
                src="/menu/dashboard_icon.svg"
                alt="dashboard_icon"
                width={24}
                height={24}
              />
            </div>
            <p className="text-2xl font-montserrat font-semibold text-tertiary">
              Dashboard
            </p>
          </Link>
          {/* Nav-Link: Reservas */}
          <Link
            className="w-full p-4 flex items-center gap-2 rounded-xl hover:bg-secondary/15 cursor-pointer"
            href="/reservations"
          >
            <div className="w-8 h-8">
              <Image
                className="w-full h-full"
                src="/menu/reservas_icon.svg"
                alt="reservas_icon"
                width={24}
                height={24}
              />
            </div>
            <p className="text-2xl font-montserrat font-semibold text-tertiary">
              Reservas
            </p>
          </Link>
          {/* Nav-Link: Hóspedes */}
          <Link
            className="w-full p-4 flex items-center gap-2 rounded-xl hover:bg-secondary/15 cursor-pointer"
            href="/guests"
          >
            <div className="w-8 h-8">
              <Image
                className="w-full h-full"
                src="/menu/hospedes_icon.svg"
                alt="hospedes_icon"
                width={24}
                height={24}
              />
            </div>
            <p className="text-2xl font-montserrat font-semibold text-tertiary">
              Hóspedes
            </p>
          </Link>
          {/* Nav-Link: Quartos */}
          <Link
            className="w-full p-4 flex items-center gap-2 rounded-xl hover:bg-secondary/15 cursor-pointer"
            href="/rooms"
          >
            <div className="w-8 h-8">
              <Image
                className="w-full h-full"
                src="/menu/key_icon.svg"
                alt="key_icon"
                width={24}
                height={24}
              />
            </div>
            <p className="text-2xl font-montserrat font-semibold text-tertiary">
              Quartos
            </p>
          </Link>
          {/* Nav-Link: Usuários */}
          <Link
            className="w-full p-4 flex items-center gap-2 rounded-xl hover:bg-secondary/15 cursor-pointer"
            href="/users"
          >
            <div className="w-8 h-8">
              <Image
                className="w-full h-full"
                src="/menu/user.svg"
                alt="user"
                width={24}
                height={24}
              />
            </div>
            <p className="text-2xl font-montserrat font-semibold text-tertiary">
              Usuários
            </p>
          </Link>
        </div>
      </main>
    </section>
  );
}
