import Image from "next/image";

export default function Login() {
  return (
    <div className="w-[1500px] min-h-[650px] max-w-[99%] flex bg-primary shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden">
      <div className="basis-1/2 bg-background bg-contain bg-no-repeat bg-center">
        <Image
          className="h-full w-full"
          src="/login/ilustracao.png"
          alt="ilustracao.png"
          width={464}
          height={538}
        />
      </div>
      <div className="basis-1/2 py-[60px] px-[50px] flex items-center justify-center">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="mb-2.5 text-[28px] font-bold text-secondary">
              Stiven's Hotel
            </h1>
            <p className="mb-10 text-base text-foreground">
              Bem vindo ao Stiven's Hotel
            </p>
          </div>
          <form className="w-[80%]" action="./dashboard.html">
            <div className="mb-[30px]">
              <label
                htmlFor="email"
                className="block text-xs text-foreground mb-[5px]"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Digite seu email"
                className="w-full border-b border-foreground bg-transparent py-[5px] text-base text-secondary focus:outline-none focus:border-success placeholder:text-foreground/70"
                pattern="^[^@]+@[^@]+\.[^@]+$"
                required
              />
            </div>
            <div className="mb-[30px]">
              <label
                htmlFor="password"
                className="block text-xs text-foreground mb-[5px]"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                className="w-full border-b border-foreground bg-transparent py-[5px] text-base text-secondary focus:outline-none focus:border-success placeholder:text-foreground/70"
                required
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center w-full">
                <hr className="grow border-t border-foreground" />
                <span className="mx-4 font-bold text-foreground">X</span>
                <hr className="grow border-t border-foreground" />
              </div>
              <button
                type="submit"
                className="w-[40%] p-3 my-6 border-none rounded-2xl bg-success text-white text-2xl font-medium cursor-pointer transition-all duration-300 ease-in-out hover:brightness-90"
              >
                Entrar
              </button>
              <div className="flex items-center w-full">
                <hr className="grow border-t border-foreground" />
                <span className="mx-4 font-bold text-foreground">X</span>
                <hr className="grow border-t border-foreground" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
