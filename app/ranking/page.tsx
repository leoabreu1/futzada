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
  { value: 'wordle', label: '🎯 Wordle' },
  { value: 'jogo-da-velha', label: '⚡ Jogo da Velha' },
  { value: 'quem-e-o-craque', label: '👁️ Quem é o Craque' },
  { value: 'linha-do-tempo', label: '📅 Linha do Tempo' },
  { value: 'conexoes', label: '🔗 Conexões' },
] as const

export default function RankingPage() {
  const { data: session } = useSession()
  const [ranking, setRanking] = useState<PlayerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetch('/api/ranking')
      .then(r => r.json())
      .then(data => setRanking(data.ranking ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all'
    ? ranking
    : ranking.filter(p => (p.gameBreakdown[filter] ?? 0) > 0)

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: 32 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar
      </Link>

      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', marginBottom: 8 }}>
          🏆 Ranking Global
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '1rem' }}>
          Scores reais de todos os jogadores — atualizados a cada partida
        </p>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${filter === value ? 'rgba(16,185,129,0.5)' : 'var(--color-border)'}`,
              background: filter === value ? 'rgba(16,185,129,0.1)' : 'var(--color-surface)',
              color: filter === value ? '#10b981' : 'var(--color-text)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Lista */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-muted)' }}>
          Carregando ranking...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-muted)' }}>
          <p style={{ marginBottom: 12 }}>Nenhum score ainda. Seja o primeiro! 🎮</p>
          {!session?.user && (
            <Link href="/login" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem', display: 'inline-block', marginTop: 8 }}>
              Entrar para competir
            </Link>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((player, index) => {
            const isMe = session?.user?.id === player.userId
            return (
              <div
                key={player.userId}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '50px auto 1fr auto',
                  gap: 16,
                  alignItems: 'center',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius)',
                  background: isMe
                    ? 'rgba(16,185,129,0.06)'
                    : index === 0 ? 'rgba(16,185,129,0.05)'
                    : index === 1 ? 'rgba(245,158,11,0.05)'
                    : index === 2 ? 'rgba(107,114,128,0.05)'
                    : 'var(--color-surface)',
                  border: isMe
                    ? '1px solid rgba(16,185,129,0.4)'
                    : index < 3
                    ? `1px solid rgba(${index === 0 ? '16,185,129' : index === 1 ? '245,158,11' : '107,114,128'},0.2)`
                    : '1px solid var(--color-border)',
                }}
              >
                {/* Posição */}
                <div style={{ textAlign: 'center', fontSize: index < 3 ? '1.4rem' : '0.95rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', color: 'var(--color-muted)' }}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>

                {/* Avatar */}
                <div>
                  {player.image ? (
                    <Image src={player.image} alt={player.name} width={36} height={36} style={{ borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />
                  ) : (
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#10B981,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', color: '#0a0a0b' }}>
                      {player.name[0]?.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Nome + breakdown */}
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', marginBottom: 4 }}>
                    {player.name}
                    {isMe && <span style={{ marginLeft: 8, fontSize: '0.7rem', color: '#10b981', background: 'rgba(16,185,129,0.15)', padding: '1px 6px', borderRadius: 4 }}>você</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {(player.gameBreakdown['wordle'] ?? 0) > 0 && <span style={{ fontSize: '0.68rem', padding: '1px 5px', borderRadius: 3, background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>🎯 {player.gameBreakdown['wordle']}</span>}
                    {(player.gameBreakdown['jogo-da-velha'] ?? 0) > 0 && <span style={{ fontSize: '0.68rem', padding: '1px 5px', borderRadius: 3, background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>⚡ {player.gameBreakdown['jogo-da-velha']}</span>}
                    {(player.gameBreakdown['quem-e-o-craque'] ?? 0) > 0 && <span style={{ fontSize: '0.68rem', padding: '1px 5px', borderRadius: 3, background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>👁️ {player.gameBreakdown['quem-e-o-craque']}</span>}
                    {(player.gameBreakdown['linha-do-tempo'] ?? 0) > 0 && <span style={{ fontSize: '0.68rem', padding: '1px 5px', borderRadius: 3, background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>📅 {player.gameBreakdown['linha-do-tempo']}</span>}
                    {(player.gameBreakdown['conexoes'] ?? 0) > 0 && <span style={{ fontSize: '0.68rem', padding: '1px 5px', borderRadius: 3, background: 'rgba(236,72,153,0.15)', color: '#ec4899' }}>🔗 {player.gameBreakdown['conexoes']}</span>}
                  </div>
                </div>

                {/* Pontos */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#10b981' }}>
                    {player.totalPoints}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)' }}>
                    {player.gamesPlayed} {player.gamesPlayed === 1 ? 'jogo' : 'jogos'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Stats gerais */}
      {ranking.length > 0 && (
        <div style={{ marginTop: 56, padding: '28px 32px', borderRadius: 'var(--radius)', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 20 }}>📊 Estatísticas Globais</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 6 }}>Jogadores</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#10b981' }}>{ranking.length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 6 }}>Partidas</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#f59e0b' }}>{ranking.reduce((s, p) => s + p.gamesPlayed, 0)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 6 }}>Pontos Totais</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#3b82f6' }}>{ranking.reduce((s, p) => s + p.totalPoints, 0)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
