import Link from 'next/link'
import Image from 'next/image'

// Ícones SVG por jogo (Lucide-style, 20x20 viewBox)
const ICONS: Record<string, React.ReactNode> = {
  'jogo-da-velha': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="8" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="16" y2="21"/>
      <line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/>
    </svg>
  ),
  wordle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="3" width="5" height="5" rx="1"/><rect x="9.5" y="3" width="5" height="5" rx="1"/>
      <rect x="16" y="3" width="5" height="5" rx="1"/><rect x="3" y="9.5" width="5" height="5" rx="1"/>
      <rect x="9.5" y="9.5" width="5" height="5" rx="1"/><rect x="16" y="9.5" width="5" height="5" rx="1"/>
    </svg>
  ),
  'quem-e-o-craque': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  conexoes: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  carreira: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3"/>
    </svg>
  ),
  duelo: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="m14.5 17.5 3-3-3-3"/><path d="m9.5 6.5-3 3 3 3"/>
      <line x1="4" y1="9.5" x2="20" y2="9.5"/><line x1="4" y1="14.5" x2="20" y2="14.5"/>
    </svg>
  ),
  'linha-do-tempo': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <circle cx="6" cy="12" r="2" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
      <circle cx="18" cy="12" r="2" fill="currentColor" stroke="none"/>
      <path d="M6 7v2M12 5v4M18 8v1"/>
    </svg>
  ),
  escudo: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  camisa: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
    </svg>
  ),
}

function getIcon(href: string) {
  const key = href.split('/').pop() ?? ''
  return ICONS[key] ?? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v4l3 3"/>
    </svg>
  )
}

function getGameImage(href: string): string {
  const key = href.split('/').pop() ?? ''
  return `/images/games/${key}.png`
}

interface GameCardProps {
  title: string
  description: string
  href: string
  tag?: string
  isNew?: boolean
  isAvailable?: boolean
  index?: number
}

export default function GameCard({ title, description, href, tag, isNew = false, isAvailable = true, index = 0 }: GameCardProps) {
  const icon = getIcon(href)
  const imageSrc = getGameImage(href)

  const inner = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
    }}>
      {/* Imagem com overlay gradient */}
      <div style={{
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '12px 12px 0 0',
        overflow: 'hidden',
        position: 'relative',
        background: '#08080a',
      }}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: 'cover',
            opacity: isAvailable ? 1 : 0.3,
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          }}
          className={isAvailable ? 'card-image' : ''}
        />
        {/* Gradient overlay na parte inferior da imagem */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(6,6,9,0.95) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Conteúdo */}
      <div style={{
        padding: '16px 20px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        flex: 1,
      }}>
        {/* Icon + badges */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{
            color: isAvailable ? 'var(--color-brand-green)' : 'var(--color-muted-2)',
            flexShrink: 0,
            filter: isAvailable ? 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))' : 'none',
          }}>
            {icon}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {isNew && <span className="badge badge-yellow badge-pulse">NOVO</span>}
            {tag && isAvailable && <span className="badge badge-green">{tag}</span>}
            {!isAvailable && <span className="badge badge-muted">EM BREVE</span>}
          </div>
        </div>

        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem',
            letterSpacing: '0.01em',
            color: isAvailable ? 'var(--color-text)' : 'var(--color-muted)',
            marginBottom: 6,
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: '0.82rem',
            color: 'var(--color-muted)',
            lineHeight: 1.55,
          }}>
            {description}
          </p>
        </div>

        {isAvailable && (
          <div style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.78rem',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.04em',
          }}>
            <span style={{
              background: 'linear-gradient(90deg, #10b981, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>JOGAR</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.5))' }}>
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  )

  // Stagger animation delay
  const delayClass = `delay-${Math.min(index + 1, 9)}`

  if (!isAvailable) {
    return (
      <div className={`card animate-fade-up ${delayClass}`} style={{ opacity: 0, animationFillMode: 'forwards' }}>
        <div style={{ opacity: 0.4 }}>
          {inner}
        </div>
      </div>
    )
  }

  return (
    <Link href={href} className={`card card-interactive animate-fade-up ${delayClass}`} style={{ display: 'block', textDecoration: 'none', position: 'relative', opacity: 0, animationFillMode: 'forwards' }}>
      {inner}
      <style>{`
        .card-image { transition: transform 0.4s cubic-bezier(0.4,0,0.2,1) !important; }
        .card-interactive:hover .card-image { transform: scale(1.05); }
      `}</style>
    </Link>
  )
}
