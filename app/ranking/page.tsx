'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRankingStorage } from '@/lib/hooks/useRankingStorage'
import type { PlayerRanking } from '@/lib/types/ranking'

export default function RankingPage() {
  const { getRanking, loaded } = useRankingStorage()
  const [ranking, setRanking] = useState<PlayerRanking[]>([])
  const [filter, setFilter] = useState<'all' | 'wordle' | 'jogo-da-velha' | 'quem-e-o-craque'>('all')

  useEffect(() => {
    if (loaded) {
      setRanking(getRanking())
    }
  }, [loaded, getRanking])

  const filteredRanking = ranking.filter((player) => {
    if (filter === 'all') return true
    return player.gameBreakdown[filter] > 0
  })

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: 32 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', marginBottom: 8 }}>
          🏆 Ranking Global
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '1rem' }}>
          Veja os melhores jogadores de Futzada e suas conquistas
        </p>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {(['all', 'wordle', 'jogo-da-velha', 'quem-e-o-craque'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${filter === f ? 'rgba(16,185,129,0.5)' : 'var(--color-border)'}`,
              background: filter === f ? 'rgba(16,185,129,0.1)' : 'var(--color-surface)',
              color: filter === f ? '#10b981' : 'var(--color-text)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {f === 'all' && 'Todos'}
            {f === 'wordle' && '🎯 Wordle'}
            {f === 'jogo-da-velha' && '⚡ Jogo da Velha'}
            {f === 'quem-e-o-craque' && '👁️ Quem é o Craque'}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {!loaded ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-muted)' }}>
          Carregando ranking...
        </div>
      ) : filteredRanking.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-muted)' }}>
          <p>Nenhum score ainda. Comece a jogar! 🎮</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredRanking.slice(0, 20).map((player, index) => (
            <div
              key={player.playerId}
              style={{
                display: 'grid',
                gridTemplateColumns: '50px 1fr auto',
                gap: 16,
                alignItems: 'center',
                padding: '16px 20px',
                borderRadius: 'var(--radius)',
                background: index === 0 ? 'rgba(16,185,129,0.08)' : index === 1 ? 'rgba(245,158,11,0.08)' : index === 2 ? 'rgba(107,114,128,0.08)' : 'var(--color-surface)',
                border: index < 3 ? `1px solid rgba(${index === 0 ? '16,185,129' : index === 1 ? '245,158,11' : '107,114,128'},0.3)` : '1px solid var(--color-border)',
              }}
            >
              {/* Posição + Medal */}
              <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}>
                {index === 0 && '🥇'}
                {index === 1 && '🥈'}
                {index === 2 && '🥉'}
                {index >= 3 && `#${index + 1}`}
              </div>

              {/* Jogador + Badges */}
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 4 }}>
                  {player.playerName}
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                  {player.gameBreakdown.wordle > 0 && (
                    <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: 'var(--radius-sm)', background: 'rgba(16,185,129,0.2)', color: '#10b981' }}>
                      🎯 {player.gameBreakdown.wordle}
                    </span>
                  )}
                  {player.gameBreakdown['jogo-da-velha'] > 0 && (
                    <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: 'var(--radius-sm)', background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>
                      ⚡ {player.gameBreakdown['jogo-da-velha']}
                    </span>
                  )}
                  {player.gameBreakdown['quem-e-o-craque'] > 0 && (
                    <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: 'var(--radius-sm)', background: 'rgba(59,130,246,0.2)', color: '#3b82f6' }}>
                      👁️ {player.gameBreakdown['quem-e-o-craque']}
                    </span>
                  )}
                </div>
                {player.badges.length > 0 && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    {player.badges.slice(0, 3).map((badge) => (
                      <span key={badge.id} title={badge.name} style={{ fontSize: '1rem', cursor: 'help' }}>
                        {badge.icon}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Pontos */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#10b981', marginBottom: 4 }}>
                  {player.totalPoints}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  {player.gamesPlayed} {player.gamesPlayed === 1 ? 'jogo' : 'jogos'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Gerais */}
      {ranking.length > 0 && (
        <div style={{ marginTop: 56, padding: '32px', borderRadius: 'var(--radius)', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 20 }}>
            📊 Estatísticas Globais
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 8 }}>Total de Jogadores</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#10b981' }}>
                {ranking.length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 8 }}>Total de Jogos</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#f59e0b' }}>
                {ranking.reduce((sum, p) => sum + p.gamesPlayed, 0)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 8 }}>Pontos Totais</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#3b82f6' }}>
                {ranking.reduce((sum, p) => sum + p.totalPoints, 0)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
