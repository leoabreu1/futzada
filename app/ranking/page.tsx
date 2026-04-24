'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

type PlayerRow = {
  userId: string
  name: string
  image: string | null
  totalPoints: number
  gamesPlayed: number
  gameBreakdown: Record<string, number>
  lastPlayedDate: string
}

const FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'wordle', label: 'Wordle' },
  { value: 'jogo-da-velha', label: 'Jogo da Velha' },
  { value: 'quem-e-o-craque', label: 'Quem é o Craque' },
  { value: 'linha-do-tempo', label: 'Linha do Tempo' },
  { value: 'conexoes', label: 'Conexões' },
] as const

const GAME_BADGES: Array<{ key: string; label: string; color: string }> = [
  { key: 'wordle', label: 'Wordle', color: '#6CFF93' },
  { key: 'jogo-da-velha', label: 'Velha', color: '#FFC247' },
  { key: 'quem-e-o-craque', label: 'Craque', color: '#8BD4FF' },
  { key: 'linha-do-tempo', label: 'Tempo', color: '#FF9F81' },
  { key: 'conexoes', label: 'Conexões', color: '#E6A8FF' },
]

export default function RankingPage() {
  const { data: session } = useSession()
  const [ranking, setRanking] = useState<PlayerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetch('/api/ranking')
      .then((response) => response.json())
      .then((data) => setRanking(data.ranking ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered =
    filter === 'all' ? ranking : ranking.filter((player) => (player.gameBreakdown[filter] ?? 0) > 0)

  const totalGames = ranking.reduce((sum, player) => sum + player.gamesPlayed, 0)
  const totalPoints = ranking.reduce((sum, player) => sum + player.totalPoints, 0)

  return (
    <div className="page-shell">
      <Link href="/" className="page-back">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar para jogos
      </Link>

      <section className="panel-grid" style={{ marginBottom: 32, alignItems: 'stretch' }}>
        <div className="surface-panel surface-panel--accent animate-fade-up delay-1" style={{ padding: 28, opacity: 0, animationFillMode: 'forwards' }}>
          <div className="surface-panel__inner stack">
            <div>
              <p className="section-label">Tabela geral</p>
              <h1 className="page-title" style={{ marginBottom: 14 }}>
                Ranking global
              </h1>
              <p className="lede" style={{ maxWidth: '52ch' }}>
                Pontuação viva, histórico por jogo e destaque para quem sustenta performance rodada após rodada.
              </p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card__value" style={{ color: 'var(--color-brand-green)' }}>
                  {ranking.length}
                </div>
                <div className="stat-card__label">Jogadores</div>
              </div>
              <div className="stat-card">
                <div className="stat-card__value" style={{ color: 'var(--color-brand-yellow)' }}>
                  {totalGames}
                </div>
                <div className="stat-card__label">Partidas</div>
              </div>
              <div className="stat-card">
                <div className="stat-card__value" style={{ color: '#8BD4FF' }}>
                  {totalPoints}
                </div>
                <div className="stat-card__label">Pontos</div>
              </div>
            </div>
          </div>
        </div>

        <div className="surface-panel animate-fade-up delay-2" style={{ padding: 28, opacity: 0, animationFillMode: 'forwards' }}>
          <div className="surface-panel__inner stack">
            <div>
              <p className="section-label section-label-muted">Leitura rápida</p>
              <h2 className="section-title" style={{ marginBottom: 12 }}>
                Filtre por modalidade
              </h2>
              <p className="muted">
                Veja quem domina cada formato e descubra se seu melhor jogo também rende vantagem no acumulado.
              </p>
            </div>

            <div className="pill-row">
              {FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`pill-button ${filter === value ? 'is-active' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="surface-panel" style={{ padding: 40, textAlign: 'center' }}>
          <div className="surface-panel__inner muted">Carregando ranking...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="surface-panel" style={{ padding: 40, textAlign: 'center' }}>
          <div className="surface-panel__inner stack" style={{ alignItems: 'center' }}>
            <p className="section-label">Sem pontuação ainda</p>
            <h2 className="section-title">Essa tabela ainda está vazia</h2>
            <p className="muted" style={{ maxWidth: 520 }}>
              Jogue uma rodada para gerar score e abrir disputa no ranking global.
            </p>
            {!session?.user && (
              <Link href="/login" className="btn-primary">
                Entrar para competir
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="ranking-list">
          {filtered.map((player, index) => {
            const isMe = session?.user?.id === player.userId
            const medal = index === 0 ? '1' : index === 1 ? '2' : index === 2 ? '3' : `#${index + 1}`
            const cardClass = `ranking-row${isMe || index < 3 ? ' ranking-row--highlight' : ''}`

            return (
              <div key={player.userId} className={cardClass}>
                <div className="ranking-position">{medal}</div>

                <div className="ranking-user">
                  {player.image ? (
                    <Image
                      src={player.image}
                      alt={player.name}
                      width={48}
                      height={48}
                      style={{
                        borderRadius: 18,
                        border: '2px solid rgba(248, 244, 235, 0.08)',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <span className="avatar">{player.name[0]?.toUpperCase()}</span>
                  )}

                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        flexWrap: 'wrap',
                        marginBottom: 7,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.4rem',
                          letterSpacing: '0.02em',
                          lineHeight: 0.94,
                          textTransform: 'uppercase',
                        }}
                      >
                        {player.name}
                      </span>
                      {isMe && <span className="badge badge-green">Você</span>}
                    </div>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {GAME_BADGES.filter((game) => (player.gameBreakdown[game.key] ?? 0) > 0).map((game) => (
                        <span
                          key={game.key}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            minHeight: 28,
                            padding: '0 10px',
                            borderRadius: 999,
                            background: `${game.color}18`,
                            border: `1px solid ${game.color}40`,
                            color: game.color,
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {game.label}
                          <strong>{player.gameBreakdown[game.key]}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      color: 'var(--color-brand-green)',
                      lineHeight: 0.88,
                    }}
                  >
                    {player.totalPoints}
                  </div>
                  <div className="eyebrow" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
                    {player.gamesPlayed} jogos
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
