interface TrashIconProps {
  className?: string;
}

export function TrashIcon({ className = "text-danger" }: TrashIconProps) {
  return (
    <svg
      width="28"
      height="30"
      viewBox="0 0 28 30"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_trash)">
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
        <clipPath id="clip0_trash">
          <rect width="27.2727" height="30" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}
