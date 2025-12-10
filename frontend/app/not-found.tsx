import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background text-secondary p-4">
      <h1 className="text-9xl font-bold font-montserrat text-danger opacity-20">404</h1>
      <h2 className="text-3xl font-bold font-poppins -mt-10 mb-4">Página não encontrada</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Ops! Parece que você tentou acessar um quarto que não existe ou que está em reforma.
      </p>
      
      <Link 
        href="/dashboard" 
        className="bg-secondary text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
      >
        Voltar ao Dashboard
      </Link>
    </div>
  );
}