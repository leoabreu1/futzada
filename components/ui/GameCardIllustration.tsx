interface GameCardIllustrationProps {
  gameType: 'jogo-da-velha' | 'wordle' | 'quem-e-o-craque' | 'conexoes' | 'carreira' | 'duelo' | 'linha-do-tempo' | 'escudo' | 'camisa'
  size?: 'sm' | 'md'
}

export default function GameCardIllustration({ gameType, size = 'md' }: GameCardIllustrationProps) {
  const baseSize = size === 'sm' ? 80 : 120

  switch (gameType) {
    case 'jogo-da-velha':
      return (
        <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="jogoDaVelhaGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="120" height="120" fill="url(#jogoDaVelhaGrad)" rx="16"/>
          {/* Grid 3x3 */}
          <g stroke="#10b981" strokeWidth="2.5" strokeLinecap="round">
            <line x1="30" y1="20" x2="30" y2="100"/>
            <line x1="60" y1="20" x2="60" y2="100"/>
            <line x1="20" y1="40" x2="100" y2="40"/>
            <line x1="20" y1="70" x2="100" y2="70"/>
          </g>
          {/* X e O decorativos */}
          <text x="35" y="60" fontSize="20" fill="#10b981" opacity="0.6" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">X</text>
          <text x="65" y="60" fontSize="20" fill="#f59e0b" opacity="0.6" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">O</text>
        </svg>
      )

    case 'wordle':
      return (
        <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wordleGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="120" height="120" fill="url(#wordleGrad)" rx="16"/>
          {/* Grid de letras */}
          <g>
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => {
                const x = 25 + col * 35
                const y = 30 + row * 28
                const colors = ['#10b981', '#f59e0b', '#ef4444']
                const color = colors[(row * 3 + col) % 3]
                return (
                  <g key={`${row}-${col}`}>
                    <rect x={x} y={y} width="22" height="22" rx="4" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5"/>
                    <text x={x + 11} y={y + 14} fontSize="10" fill={color} textAnchor="middle" fontWeight="bold">
                      {String.fromCharCode(65 + (row * 3 + col))}
                    </text>
                  </g>
                )
              })
            )}
          </g>
        </svg>
      )

    case 'quem-e-o-craque':
      return (
        <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="craqueGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="120" height="120" fill="url(#craqueGrad)" rx="16"/>
          {/* Foto com blur */}
          <rect x="30" y="25" width="60" height="70" rx="8" fill="#06b6d4" opacity="0.2" stroke="#06b6d4" strokeWidth="2"/>
          {/* Linhas de blur */}
          <g stroke="#06b6d4" strokeWidth="1" opacity="0.4">
            <line x1="35" y1="40" x2="85" y2="40"/>
            <line x1="35" y1="55" x2="85" y2="55"/>
            <line x1="35" y1="70" x2="85" y2="70"/>
            <line x1="35" y1="85" x2="85" y2="85"/>
          </g>
          {/* Lupa */}
          <circle cx="85" cy="35" r="12" fill="none" stroke="#06b6d4" strokeWidth="2"/>
          <line x1="95" y1="45" x2="100" y2="50" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )

    case 'conexoes':
      return (
        <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="conexoesGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="120" height="120" fill="url(#conexoesGrad)" rx="16"/>
          {/* 4 grupos de pontos */}
          {[[30, 30], [30, 90], [90, 30], [90, 90]].map((pos, i) => (
            <g key={i}>
              <circle cx={pos[0]} cy={pos[1]} r="8" fill="#8b5cf6" opacity="0.4"/>
              <circle cx={pos[0] - 8} cy={pos[1] - 8} r="3" fill="#8b5cf6" opacity="0.3"/>
              <circle cx={pos[0] + 8} cy={pos[1] - 8} r="3" fill="#8b5cf6" opacity="0.3"/>
              <circle cx={pos[0] - 8} cy={pos[1] + 8} r="3" fill="#8b5cf6" opacity="0.3"/>
              <circle cx={pos[0] + 8} cy={pos[1] + 8} r="3" fill="#8b5cf6" opacity="0.3"/>
            </g>
          ))}
        </svg>
      )

    case 'carreira':
      return (
        <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="carreiraGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="120" height="120" fill="url(#carreiraGrad)" rx="16"/>
          {/* Linha de carreira */}
          <line x1="20" y1="60" x2="100" y2="60" stroke="#ec4899" strokeWidth="2" opacity="0.5"/>
          {/* Estágios */}
          {[20, 45, 70, 95].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="60" r="6" fill="#ec4899" opacity={0.8 - i * 0.15}/>
              <circle cx={x} cy="60" r="10" fill="none" stroke="#ec4899" strokeWidth="1.5" opacity={0.4 - i * 0.08}/>
            </g>
          ))}
        </svg>
      )

    case 'duelo':
      return (
        <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dueloGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="120" height="120" fill="url(#dueloGrad)" rx="16"/>
          {/* VS */}
          <circle cx="40" cy="60" r="18" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="2"/>
          <circle cx="80" cy="60" r="18" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="2"/>
          <text x="60" y="65" fontSize="16" fill="#ef4444" textAnchor="middle" fontWeight="bold" opacity="0.7">VS</text>
        </svg>
      )

    case 'linha-do-tempo':
      return (
        <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="timelineGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="120" height="120" fill="url(#timelineGrad)" rx="16"/>
          {/* Timeline vertical */}
          <line x1="60" y1="20" x2="60" y2="100" stroke="#14b8a6" strokeWidth="2" opacity="0.5"/>
          {[30, 50, 70, 90].map((y, i) => (
            <circle key={i} cx="60" cy={y} r="5" fill="#14b8a6" opacity={0.8 - i * 0.15}/>
          ))}
        </svg>
      )

    case 'escudo':
      return (
        <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="escudoGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="120" height="120" fill="url(#escudoGrad)" rx="16"/>
          {/* Escudo quebrado */}
          <path d="M60 20 L75 30 L75 70 Q75 85 60 95 Q45 85 45 70 L45 30 Z" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
          {/* Linhas de quebra */}
          <line x1="55" y1="40" x2="50" y2="70" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"/>
          <line x1="65" y1="40" x2="70" y2="70" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"/>
        </svg>
      )

    case 'camisa':
      return (
        <svg width={baseSize} height={baseSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="camisaGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="120" height="120" fill="url(#camisaGrad)" rx="16"/>
          {/* Jersey simplificada */}
          <path d="M35 35 L40 50 L35 65 L45 75 L60 70 L75 75 L85 65 L80 50 L85 35 Q60 30 35 35 Z" fill="#fbbf24" opacity="0.3" stroke="#fbbf24" strokeWidth="2"/>
          {/* Número */}
          <text x="60" y="65" fontSize="20" fill="#fbbf24" textAnchor="middle" dominantBaseline="middle" fontWeight="bold" opacity="0.5">10</text>
        </svg>
      )

    default:
      return null
  }
}
