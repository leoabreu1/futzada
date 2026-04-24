import Link from 'next/link'
import Image from 'next/image'

const ICONS: Record<string, React.ReactNode> = {
  'jogo-da-velha': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <line x1="8" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="16" y2="21" />
      <line x1="3" y1="8" x2="21" y2="8" />
      <line x1="3" y1="16" x2="21" y2="16" />
    </svg>
  ),
  wordle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="9.5" y="3" width="5" height="5" rx="1" />
      <rect x="16" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="9.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="16" y="9.5" width="5" height="5" rx="1" />
    </svg>
  ),
  'quem-e-o-craque': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  conexoes: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  carreira: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3" />
    </svg>
  ),
  duelo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="m14.5 17.5 3-3-3-3" />
      <path d="m9.5 6.5-3 3 3 3" />
      <line x1="4" y1="9.5" x2="20" y2="9.5" />
      <line x1="4" y1="14.5" x2="20" y2="14.5" />
    </svg>
  ),
  'linha-do-tempo': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <circle cx="6" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M6 7v2M12 5v4M18 8v1" />
    </svg>
  ),
  escudo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  camisa: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
    </svg>
  ),
}

function getIcon(href: string) {
  const key = href.split('/').pop() ?? ''
  return (
    ICONS[key] ?? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    )
  )
}

function getGameImage(href: string): string {
  const key = href.split('/').pop() ?? ''
  return `/images/games/${key}.png?v=2026-04-23-minimal`
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

export default function GameCard({
  title,
  description,
  href,
  tag,
  isNew = false,
  isAvailable = true,
  index = 0,
}: GameCardProps) {
  const icon = getIcon(href)
  const imageSrc = getGameImage(href)
  const delayClass = `delay-${Math.min(index + 1, 9)}`

  const inner = (
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          borderRadius: '20px 20px 16px 16px',
          background: '#091923',
          margin: 8,
          marginBottom: 0,
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: 'cover',
            opacity: isAvailable ? 1 : 0.28,
            transform: isAvailable ? 'scale(1.01)' : 'scale(1)',
            transition: 'transform 0.35s ease, opacity 0.35s ease',
          }}
          className={isAvailable ? 'game-card-image' : undefined}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(6,17,27,0.08) 0%, rgba(6,17,27,0.28) 54%, rgba(6,17,27,0.95) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 12,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isAvailable ? 'rgba(108, 255, 147, 0.14)' : 'rgba(154,176,190,0.08)',
              color: isAvailable ? 'var(--color-brand-green)' : 'var(--color-muted)',
              border: '1px solid rgba(248,244,235,0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {icon}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {isNew && <span className="badge badge-yellow badge-pulse">Novo</span>}
            {tag && isAvailable && <span className="badge badge-green">{tag}</span>}
            {!isAvailable && <span className="badge badge-muted">Em breve</span>}
          </div>
        </div>
      </div>

      <div style={{ padding: '15px 16px 18px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div>
          <h3
            style={{
              marginBottom: 6,
              color: isAvailable ? 'var(--color-text)' : 'var(--color-muted)',
              fontSize: '1.08rem',
              lineHeight: 0.96,
            }}
          >
            {title}
          </h3>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>{description}</p>
        </div>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <span className="eyebrow" style={{ color: isAvailable ? 'var(--color-brand-green)' : 'var(--color-muted-2)' }}>
            {isAvailable ? 'Jogar agora' : 'Aquecendo'}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: isAvailable ? 'var(--color-brand-yellow)' : 'var(--color-muted)',
              fontSize: '0.66rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {isAvailable ? 'Entrar' : 'Em producao'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )

  if (!isAvailable) {
    return (
      <div className={`card animate-fade-up ${delayClass}`} style={{ opacity: 0, animationFillMode: 'forwards' }}>
        {inner}
      </div>
    )
  }

  return (
    <Link
      href={href}
      className={`card card-interactive animate-fade-up ${delayClass}`}
      style={{ display: 'block', textDecoration: 'none', opacity: 0, animationFillMode: 'forwards' }}
    >
      {inner}
      <style>{`
        .card-interactive:hover .game-card-image {
          transform: scale(1.08);
        }
      `}</style>
    </Link>
  )
}
