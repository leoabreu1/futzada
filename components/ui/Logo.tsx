interface LogoProps {
  size?: number
  id?: string
}

export default function Logo({ size = 32, id = 'logo' }: LogoProps) {
  const clipId = `${id}Clip`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="40" height="40" rx="7" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {/* Fundo preto */}
        <rect width="40" height="40" fill="#0A0A0B" />

        {/* Letra F — branca */}
        {/* Haste vertical */}
        <rect x="10" y="8" width="5" height="24" rx="1.5" fill="white" />
        {/* Barra superior */}
        <rect x="10" y="8" width="18" height="5" rx="1.5" fill="white" />
        {/* Barra do meio */}
        <rect x="10" y="19" width="13" height="4.5" rx="1.5" fill="white" />

        {/* Acento diagonal amarelo — corta o F na diagonal */}
        <path
          d="M27 5 L17 35"
          stroke="#FACC15"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Bola de futebol na interseção */}
        <circle cx="21" cy="21.5" r="4.2" fill="white" />
        {/* Pentágono central da bola */}
        <polygon
          points="21,18.5 22.9,19.8 22.2,22 19.8,22 19.1,19.8"
          fill="#0A0A0B"
        />
        {/* Linhas radiantes */}
        <line x1="21" y1="18.5" x2="21" y2="17.3" stroke="#0A0A0B" strokeWidth="0.7" />
        <line x1="22.9" y1="19.8" x2="24.3" y2="19.1" stroke="#0A0A0B" strokeWidth="0.7" />
        <line x1="22.2" y1="22" x2="23.2" y2="23.2" stroke="#0A0A0B" strokeWidth="0.7" />
        <line x1="19.8" y1="22" x2="18.8" y2="23.2" stroke="#0A0A0B" strokeWidth="0.7" />
        <line x1="19.1" y1="19.8" x2="17.7" y2="19.1" stroke="#0A0A0B" strokeWidth="0.7" />
      </g>
    </svg>
  )
}
