export default function Guests() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold font-[Poppins] text-5xl py-6">
          Gerenciamento de Hóspedes
        </h1>
        <div className="">
          <a
            href="./new.html"
            className="flex gap-3 cursor-pointer bg-green-light px-3 py-2 font-[Montserrat] font-semibold text-2xl text-white rounded-xl"
          >
            <img src="/svg/add_icon.svg" alt="" />
            Adicionar novo hóspede
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
            <th className="py-3 border-x border-foreground">Nome Completo</th>
            <th className="py-3 border-x border-foreground">CPF</th>
            <th className="py-3 border-x border-foreground">Telefone</th>
            <th className="py-3 border-x border-foreground">Ações</th>
          </tr>
        </thead>
        <tbody className="text-2xl">
          {/* Row example */}
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">
              Stiven Felipe Câmara Fonseca
            </td>
            <td className="py-3 border-x border-foreground">000.000.000-00</td>
            <td className="py-3 border-x border-foreground">(84) 99999-9999</td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-5">
              <button className="cursor-pointer">
                <a href="./edit.html">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </a>
              </button>
              <button className="cursor-pointer">
                <a href="./delete.html">
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    className="text-danger"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_67_395)">
                      <path
                        d="M10.9087 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.3638 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.1817 6.81818V25.9091C23.1817 26.6324 22.8944 27.3261 22.3829 27.8376C21.8715 28.349 21.1778 28.6364 20.4545 28.6364H6.81809C6.09478 28.6364 5.40108 28.349 4.88962 27.8376C4.37816 27.3261 4.09082 26.6324 4.09082 25.9091V6.81818"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.36377 6.81818H25.9092"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.18213 6.81819V4.09092C8.18213 3.3676 8.46947 2.67391 8.98093 2.16245C9.49239 1.65098 10.1861 1.36365 10.9094 1.36365H16.3639C17.0873 1.36365 17.781 1.65098 18.2924 2.16245C18.8039 2.67391 19.0912 3.3676 19.0912 4.09092V6.81819"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_67_395">
                        <rect width="27.2727" height="30" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </button>
            </td>
          </tr>
          {/* Row repetitions */}
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">
              Stiven Felipe Câmara Fonseca
            </td>
            <td className="py-3 border-x border-foreground">000.000.000-00</td>
            <td className="py-3 border-x border-foreground">(84) 99999-9999</td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-5">
              <button className="cursor-pointer">
                <a href="./edit.html">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </a>
              </button>
              <button className="cursor-pointer">
                <a href="./delete.html">
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    className="text-danger"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_67_395)">
                      <path
                        d="M10.9087 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.3638 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.1817 6.81818V25.9091C23.1817 26.6324 22.8944 27.3261 22.3829 27.8376C21.8715 28.349 21.1778 28.6364 20.4545 28.6364H6.81809C6.09478 28.6364 5.40108 28.349 4.88962 27.8376C4.37816 27.3261 4.09082 26.6324 4.09082 25.9091V6.81818"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.36377 6.81818H25.9092"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.18213 6.81819V4.09092C8.18213 3.3676 8.46947 2.67391 8.98093 2.16245C9.49239 1.65098 10.1861 1.36365 10.9094 1.36365H16.3639C17.0873 1.36365 17.781 1.65098 18.2924 2.16245C18.8039 2.67391 19.0912 3.3676 19.0912 4.09092V6.81819"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_67_395">
                        <rect width="27.2727" height="30" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </button>
            </td>
          </tr>
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">
              Stiven Felipe Câmara Fonseca
            </td>
            <td className="py-3 border-x border-foreground">000.000.000-00</td>
            <td className="py-3 border-x border-foreground">(84) 99999-9999</td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-5">
              <button className="cursor-pointer">
                <a href="./edit.html">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </a>
              </button>
              <button className="cursor-pointer">
                <a href="./delete.html">
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    className="text-danger"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_67_395)">
                      <path
                        d="M10.9087 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.3638 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.1817 6.81818V25.9091C23.1817 26.6324 22.8944 27.3261 22.3829 27.8376C21.8715 28.349 21.1778 28.6364 20.4545 28.6364H6.81809C6.09478 28.6364 5.40108 28.349 4.88962 27.8376C4.37816 27.3261 4.09082 26.6324 4.09082 25.9091V6.81818"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.36377 6.81818H25.9092"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.18213 6.81819V4.09092C8.18213 3.3676 8.46947 2.67391 8.98093 2.16245C9.49239 1.65098 10.1861 1.36365 10.9094 1.36365H16.3639C17.0873 1.36365 17.781 1.65098 18.2924 2.16245C18.8039 2.67391 19.0912 3.3676 19.0912 4.09092V6.81819"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_67_395">
                        <rect width="27.2727" height="30" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </button>
            </td>
          </tr>
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">
              Stiven Felipe Câmara Fonseca
            </td>
            <td className="py-3 border-x border-foreground">000.000.000-00</td>
            <td className="py-3 border-x border-foreground">(84) 99999-9999</td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-5">
              <button className="cursor-pointer">
                <a href="./edit.html">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </a>
              </button>
              <button className="cursor-pointer">
                <a href="./delete.html">
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    className="text-danger"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_67_395)">
                      <path
                        d="M10.9087 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.3638 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.1817 6.81818V25.9091C23.1817 26.6324 22.8944 27.3261 22.3829 27.8376C21.8715 28.349 21.1778 28.6364 20.4545 28.6364H6.81809C6.09478 28.6364 5.40108 28.349 4.88962 27.8376C4.37816 27.3261 4.09082 26.6324 4.09082 25.9091V6.81818"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.36377 6.81818H25.9092"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.18213 6.81819V4.09092C8.18213 3.3676 8.46947 2.67391 8.98093 2.16245C9.49239 1.65098 10.1861 1.36365 10.9094 1.36365H16.3639C17.0873 1.36365 17.781 1.65098 18.2924 2.16245C18.8039 2.67391 19.0912 3.3676 19.0912 4.09092V6.81819"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_67_395">
                        <rect width="27.2727" height="30" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </button>
            </td>
          </tr>
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">
              Stiven Felipe Câmara Fonseca
            </td>
            <td className="py-3 border-x border-foreground">000.000.000-00</td>
            <td className="py-3 border-x border-foreground">(84) 99999-9999</td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-5">
              <button className="cursor-pointer">
                <a href="./edit.html">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </a>
              </button>
              <button className="cursor-pointer">
                <a href="./delete.html">
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    className="text-danger"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_67_395)">
                      <path
                        d="M10.9087 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.3638 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.1817 6.81818V25.9091C23.1817 26.6324 22.8944 27.3261 22.3829 27.8376C21.8715 28.349 21.1778 28.6364 20.4545 28.6364H6.81809C6.09478 28.6364 5.40108 28.349 4.88962 27.8376C4.37816 27.3261 4.09082 26.6324 4.09082 25.9091V6.81818"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.36377 6.81818H25.9092"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.18213 6.81819V4.09092C8.18213 3.3676 8.46947 2.67391 8.98093 2.16245C9.49239 1.65098 10.1861 1.36365 10.9094 1.36365H16.3639C17.0873 1.36365 17.781 1.65098 18.2924 2.16245C18.8039 2.67391 19.0912 3.3676 19.0912 4.09092V6.81819"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_67_395">
                        <rect width="27.2727" height="30" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </button>
            </td>
          </tr>
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">
              Stiven Felipe Câmara Fonseca
            </td>
            <td className="py-3 border-x border-foreground">000.000.000-00</td>
            <td className="py-3 border-x border-foreground">(84) 99999-9999</td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-5">
              <button className="cursor-pointer">
                <a href="./edit.html">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </a>
              </button>
              <button className="cursor-pointer">
                <a href="./delete.html">
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    className="text-danger"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_67_395)">
                      <path
                        d="M10.9087 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.3638 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.1817 6.81818V25.9091C23.1817 26.6324 22.8944 27.3261 22.3829 27.8376C21.8715 28.349 21.1778 28.6364 20.4545 28.6364H6.81809C6.09478 28.6364 5.40108 28.349 4.88962 27.8376C4.37816 27.3261 4.09082 26.6324 4.09082 25.9091V6.81818"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.36377 6.81818H25.9092"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.18213 6.81819V4.09092C8.18213 3.3676 8.46947 2.67391 8.98093 2.16245C9.49239 1.65098 10.1861 1.36365 10.9094 1.36365H16.3639C17.0873 1.36365 17.781 1.65098 18.2924 2.16245C18.8039 2.67391 19.0912 3.3676 19.0912 4.09092V6.81819"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_67_395">
                        <rect width="27.2727" height="30" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </button>
            </td>
          </tr>
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">
              Stiven Felipe Câmara Fonseca
            </td>
            <td className="py-3 border-x border-foreground">000.000.000-00</td>
            <td className="py-3 border-x border-foreground">(84) 99999-9999</td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-5">
              <button className="cursor-pointer">
                <a href="./edit.html">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </a>
              </button>
              <button className="cursor-pointer">
                <a href="./delete.html">
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    className="text-danger"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_67_395)">
                      <path
                        d="M10.9087 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.3638 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.1817 6.81818V25.9091C23.1817 26.6324 22.8944 27.3261 22.3829 27.8376C21.8715 28.349 21.1778 28.6364 20.4545 28.6364H6.81809C6.09478 28.6364 5.40108 28.349 4.88962 27.8376C4.37816 27.3261 4.09082 26.6324 4.09082 25.9091V6.81818"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.36377 6.81818H25.9092"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.18213 6.81819V4.09092C8.18213 3.3676 8.46947 2.67391 8.98093 2.16245C9.49239 1.65098 10.1861 1.36365 10.9094 1.36365H16.3639C17.0873 1.36365 17.781 1.65098 18.2924 2.16245C18.8039 2.67391 19.0912 3.3676 19.0912 4.09092V6.81819"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_67_395">
                        <rect width="27.2727" height="30" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </button>
            </td>
          </tr>
          <tr className="text-center bg-tertiary">
            <td className="py-3 border-x border-foreground">
              Stiven Felipe Câmara Fonseca
            </td>
            <td className="py-3 border-x border-foreground">000.000.000-00</td>
            <td className="py-3 border-x border-foreground">(84) 99999-9999</td>
            <td className="py-3 border-x border-foreground flex items-center justify-center gap-5">
              <button className="cursor-pointer">
                <a href="./edit.html">
                  <img src="/svg/edit_brown_icon.svg" alt="edit_brown_icon" />
                </a>
              </button>
              <button className="cursor-pointer">
                <a href="./delete.html">
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    className="text-danger"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_67_395)">
                      <path
                        d="M10.9087 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.3638 13.6364V21.8182"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.1817 6.81818V25.9091C23.1817 26.6324 22.8944 27.3261 22.3829 27.8376C21.8715 28.349 21.1778 28.6364 20.4545 28.6364H6.81809C6.09478 28.6364 5.40108 28.349 4.88962 27.8376C4.37816 27.3261 4.09082 26.6324 4.09082 25.9091V6.81818"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.36377 6.81818H25.9092"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.18213 6.81819V4.09092C8.18213 3.3676 8.46947 2.67391 8.98093 2.16245C9.49239 1.65098 10.1861 1.36365 10.9094 1.36365H16.3639C17.0873 1.36365 17.781 1.65098 18.2924 2.16245C18.8039 2.67391 19.0912 3.3676 19.0912 4.09092V6.81819"
                        stroke="currentColor"
                        strokeWidth="2.72727"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_67_395">
                        <rect width="27.2727" height="30" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
