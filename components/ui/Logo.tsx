/**
 * Logo FUTZADA — Bola de futebol estilizada com "F" integrado
 * O hexágono central da bola forma parte da letra F
 */

interface LogoProps {
  size?: number
  id?: string
}

export default function Logo({ size = 32, id = 'logo' }: LogoProps) {
  const gradId = `${id}Grad`
  const glowId = `${id}Glow`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Fundo circular — bola de futebol */}
      <circle cx="20" cy="20" r="19" fill={`url(#${gradId})`} />
      <circle cx="20" cy="20" r="19" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

      {/* Padrão de bola — linhas pentagono estilizadas */}
      <g opacity="0.2" stroke="#000" strokeWidth="0.8" fill="none">
        {/* Pentágono central */}
        <polygon points="20,12 24.7,15.4 23,20.8 17,20.8 15.3,15.4" />
        {/* Linhas radiantes */}
        <line x1="20" y1="12" x2="20" y2="4" />
        <line x1="24.7" y1="15.4" x2="32" y2="11" />
        <line x1="23" y1="20.8" x2="31" y2="25" />
        <line x1="17" y1="20.8" x2="9" y2="25" />
        <line x1="15.3" y1="15.4" x2="8" y2="11" />
      </g>

      {/* Letra F — bold, integrada na bola */}
      <g filter={`url(#${glowId})`}>
        <path
          d="M14 9 h13 v4.5 h-8.5 v4 h7 v4.5 h-7 v9 h-4.5 z"
          fill="#060609"
          opacity="0.9"
        />
      </g>

      {/* Detalhe — pequeno brilho no canto */}
      <circle cx="11" cy="10" r="3" fill="rgba(255,255,255,0.15)" />
    </svg>
  )
}
