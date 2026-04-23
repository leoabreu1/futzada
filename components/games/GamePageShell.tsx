import type { ReactNode } from 'react'
import Link from 'next/link'

type StatTone = 'default' | 'green' | 'yellow' | 'danger'

interface GameHeroStat {
  label: string
  value: ReactNode
  helper?: string
  tone?: StatTone
}

interface GameHeroNote {
  title: string
  text: string
}

interface GamePageShellProps {
  eyebrow: string
  title: string
  description: string
  badge?: ReactNode
  meta?: string[]
  stats?: GameHeroStat[]
  asideTitle: string
  asideDescription?: string
  asideNotes?: GameHeroNote[]
  children: ReactNode
}

const STAT_TONE_CLASS: Record<StatTone, string> = {
  default: '',
  green: ' game-stat-card--green',
  yellow: ' game-stat-card--yellow',
  danger: ' game-stat-card--danger',
}

export default function GamePageShell({
  eyebrow,
  title,
  description,
  badge,
  meta,
  stats,
  asideTitle,
  asideDescription,
  asideNotes,
  children,
}: GamePageShellProps) {
  return (
    <div className="page-shell game-page-shell">
      <Link href="/" className="page-back">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar
      </Link>

      <section className="surface-panel game-hero">
        <div className="surface-panel__inner game-hero__inner">
          <div className="game-hero__copy">
            <div>
              <p className="section-label" style={{ marginBottom: 14 }}>
                {eyebrow}
              </p>
              <div className="game-hero__heading">
                <h1 className="page-title">{title}</h1>
                {badge}
              </div>
            </div>

            <p className="lede" style={{ maxWidth: '56ch' }}>
              {description}
            </p>

            {meta && meta.length > 0 && (
              <div className="game-hero__meta">
                {meta.map((item) => (
                  <span key={item} className="game-meta-chip">
                    {item}
                  </span>
                ))}
              </div>
            )}

            {stats && stats.length > 0 && (
              <div className="game-stat-grid">
                {stats.map((stat) => (
                  <div key={stat.label} className={`game-stat-card${STAT_TONE_CLASS[stat.tone ?? 'default']}`}>
                    <div className="game-stat-card__value">{stat.value}</div>
                    <div className="game-stat-card__label">{stat.label}</div>
                    {stat.helper ? <div className="game-stat-card__helper">{stat.helper}</div> : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="game-hero__aside">
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                {asideTitle}
              </p>
              {asideDescription ? <p className="muted">{asideDescription}</p> : null}
            </div>

            {asideNotes && asideNotes.length > 0 && (
              <div className="game-note-list">
                {asideNotes.map((note) => (
                  <div key={note.title} className="game-note">
                    <p className="game-note__title">{note.title}</p>
                    <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {note.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>

      {children}
    </div>
  )
}
