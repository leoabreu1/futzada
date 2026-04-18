'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getDailyConexoes, type ConexoesGroup } from '@/lib/games/conexoes-data'
import { useGameScore } from '@/lib/hooks/useGameScore'
import { useGameDailyStorage } from '@/lib/hooks/useGameDailyStorage'

const PUZZLE = getDailyConexoes()

type ConexoesState = {
  foundGroups: ConexoesGroup[]
  errors: number
  shuffledPlayers: string[]
  gameState: 'playing' | 'won' | 'lost'
}

const DIFF_STYLE: Record<ConexoesGroup['difficulty'], { bg: string; border: string; text: string }> = {
  yellow: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', text: 'var(--color-brand-yellow)' },
  green:  { bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.35)', text: 'var(--color-brand-green)' },
  blue:   { bg: 'rgba(59,130,246,0.10)', border: 'rgba(59,130,246,0.35)', text: '#60a5fa' },
  purple: { bg: 'rgba(168,85,247,0.10)', border: 'rgba(168,85,247,0.35)', text: '#c084fc' },
}

const DIFF_EMOJI: Record<ConexoesGroup['difficulty'], string> = {
  yellow: '🟨', green: '🟩', blue: '🟦', purple: '🟪',
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr]
  let s = seed
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export default function ConexoesPage() {
  const { load, save, today, isReady } = useGameDailyStorage<ConexoesState>('conexoes')
  const { registerGameResult } = useGameScore()
  const [scoreRegistered, setScoreRegistered] = useState(false)

  const allPlayers = PUZZLE.groups.flatMap((g) => g.players)
  const seed = today.split('-').reduce((acc, n) => acc + parseInt(n), 0)

  const [foundGroups, setFoundGroups] = useState<ConexoesGroup[]>([])
  const [errors, setErrors] = useState(0)
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing')
  const [shuffledPlayers, setShuffledPlayers] = useState<string[]>(seededShuffle(allPlayers, seed))
  const [selected, setSelected] = useState<string[]>([])
  const [shaking, setShaking] = useState(false)

  useEffect(() => {
    if (!isReady) return
    const saved = load()
    if (!saved) return
    setFoundGroups(saved.foundGroups)
    setErrors(saved.errors)
    setGameState(saved.gameState)
    setShuffledPlayers(saved.shuffledPlayers)
    if (saved.gameState !== 'playing') setScoreRegistered(true)
  }, [isReady]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if ((gameState === 'won' || gameState === 'lost') && !scoreRegistered) {
      registerGameResult('conexoes', gameState === 'won', errors)
      setScoreRegistered(true)
    }
  }, [gameState, scoreRegistered, errors, registerGameResult])

  function toggleSelect(player: string) {
    if (gameState !== 'playing') return
    if (selected.includes(player)) {
      setSelected(selected.filter((p) => p !== player))
    } else if (selected.length < 4) {
      setSelected([...selected, player])
    }
  }

  function submit() {
    if (selected.length !== 4 || gameState !== 'playing') return

    const matched = PUZZLE.groups.find(
      (g) =>
        g.players.every((p) => selected.includes(p)) &&
        selected.every((p) => g.players.includes(p))
    )

    if (matched) {
      const newFound = [...foundGroups, matched]
      const remaining = shuffledPlayers.filter((p) => !selected.includes(p))
      const newState = newFound.length === 4 ? 'won' : 'playing'
      setFoundGroups(newFound)
      setShuffledPlayers(remaining)
      setSelected([])
      setGameState(newState)
      save({ foundGroups: newFound, errors, shuffledPlayers: remaining, gameState: newState })
    } else {
      const newErrors = errors + 1
      const newState = newErrors >= 4 ? 'lost' : 'playing'
      setShaking(true)
      setTimeout(() => {
        setShaking(false)
        setSelected([])
      }, 600)
      setErrors(newErrors)
      setGameState(newState)
      save({ foundGroups, errors: newErrors, shuffledPlayers, gameState: newState })
    }
  }

  const unfoundGroups = PUZZLE.groups.filter((g) => !foundGroups.some((fg) => fg.category === g.category))

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 16px 80px' }}>

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: 32 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        Voltar
      </Link>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            Conexões Futebol
          </h1>
          <span className="badge badge-green">DIÁRIO</span>
        </div>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
          Encontre os 4 grupos de 4 jogadores com algo em comum. Cuidado com as pegadinhas.
        </p>
      </div>

      {/* Error dots */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', letterSpacing: '0.06em' }}>ERROS</span>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: '50%',
            background: i < errors ? 'rgba(239,68,68,0.7)' : 'var(--color-surface-2)',
            border: `1px solid ${i < errors ? 'rgba(239,68,68,0.4)' : 'var(--color-border)'}`,
            transition: 'all 0.2s',
          }} />
        ))}
        <span style={{ fontSize: '0.7rem', color: 'var(--color-muted-2)', marginLeft: 4 }}>
          {errors < 4 ? `${4 - errors} restante${4 - errors !== 1 ? 's' : ''}` : 'Esgotado'}
        </span>
      </div>

      {/* Found groups */}
      {foundGroups.map((group) => {
        const s = DIFF_STYLE[group.difficulty]
        return (
          <div key={group.category} style={{
            marginBottom: 6, padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            background: s.bg, border: `1px solid ${s.border}`,
          }}>
            <p style={{ fontSize: '0.68rem', color: s.text, letterSpacing: '0.06em', marginBottom: 4, fontFamily: 'var(--font-display)' }}>
              {group.category.toUpperCase()}
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>
              {group.players.join(' · ')}
            </p>
          </div>
        )
      })}

      {/* Grid de tiles */}
      {gameState !== 'lost' && shuffledPlayers.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
          marginBottom: 12,
          animation: shaking ? 'shake 0.5s ease' : undefined,
        }}>
          {shuffledPlayers.map((player) => {
            const isSelected = selected.includes(player)
            return (
              <button
                key={player}
                onClick={() => toggleSelect(player)}
                style={{
                  padding: '8px 4px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${isSelected ? 'rgba(245,158,11,0.6)' : 'var(--color-border)'}`,
                  background: isSelected ? 'rgba(245,158,11,0.1)' : 'var(--color-surface)',
                  color: isSelected ? 'var(--color-brand-yellow)' : 'var(--color-text)',
                  fontSize: '0.65rem',
                  lineHeight: 1.3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.1s, background 0.1s, color 0.1s',
                  fontFamily: 'var(--font-sans)',
                  minHeight: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'var(--color-surface)' }}
              >
                {player}
              </button>
            )
          })}
        </div>
      )}

      {/* Botões de ação */}
      {gameState === 'playing' && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button
            onClick={() => setSelected([])}
            disabled={selected.length === 0}
            style={{
              flex: 1, padding: '10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              background: 'transparent',
              color: 'var(--color-muted)',
              fontSize: '0.8rem',
              cursor: selected.length === 0 ? 'default' : 'pointer',
              opacity: selected.length === 0 ? 0.4 : 1,
              fontFamily: 'var(--font-sans)',
            }}
          >
            Limpar
          </button>
          <button
            onClick={submit}
            disabled={selected.length !== 4}
            style={{
              flex: 2, padding: '10px',
              borderRadius: 'var(--radius-sm)',
              border: selected.length === 4 ? '1px solid rgba(16,185,129,0.4)' : '1px solid var(--color-border)',
              background: selected.length === 4 ? 'rgba(16,185,129,0.12)' : 'transparent',
              color: selected.length === 4 ? 'var(--color-brand-green)' : 'var(--color-muted)',
              fontSize: '0.8rem',
              fontWeight: selected.length === 4 ? 600 : 400,
              cursor: selected.length !== 4 ? 'default' : 'pointer',
              opacity: selected.length !== 4 ? 0.4 : 1,
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.15s',
            }}
          >
            Confirmar ({selected.length}/4)
          </button>
        </div>
      )}

      {/* Grupos revelados ao perder */}
      {gameState === 'lost' && unfoundGroups.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {unfoundGroups.map((group) => {
            const s = DIFF_STYLE[group.difficulty]
            return (
              <div key={group.category} style={{
                marginBottom: 6, padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(239,68,68,0.04)',
                border: '1px solid rgba(239,68,68,0.15)',
                opacity: 0.75,
              }}>
                <p style={{ fontSize: '0.68rem', color: s.text, letterSpacing: '0.06em', marginBottom: 4, fontFamily: 'var(--font-display)' }}>
                  {group.category.toUpperCase()}
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>
                  {group.players.join(' · ')}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Resultado final */}
      {(gameState === 'won' || gameState === 'lost') && (
        <div style={{
          marginTop: 8,
          padding: '20px 24px',
          background: 'var(--color-surface)',
          border: `1px solid ${gameState === 'won' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.2)'}`,
          borderRadius: 'var(--radius)',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 6 }}>
            {gameState === 'won'
              ? errors === 0 ? 'Perfeito! Sem erros!' : errors === 1 ? 'Excelente!' : errors <= 2 ? 'Muito bom!' : 'Conseguiu!'
              : 'Não foi dessa vez'}
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: 16 }}>
            {gameState === 'won'
              ? `${errors} erro${errors !== 1 ? 's' : ''} · Novo desafio amanhã`
              : `${foundGroups.length}/4 grupos encontrados · Novo desafio amanhã`}
          </p>
          <button
            onClick={() => {
              const rows = [
                ...foundGroups.map((g) => DIFF_EMOJI[g.difficulty].repeat(4)),
                ...(gameState === 'lost' ? Array(unfoundGroups.length).fill('🟥🟥🟥🟥') : []),
              ].join('\n')
              const result = gameState === 'won'
                ? `✅ ${errors === 0 ? 'Sem erros!' : `${errors} erro${errors !== 1 ? 's' : ''}`}`
                : `❌ ${foundGroups.length}/4 grupos`
              const text = `Futzada Conexões ${today}\n${result}\n\n${rows}\n\nfutzada.vercel.app`
              if (navigator.share) {
                navigator.share({ text }).catch(() => {})
              } else {
                navigator.clipboard.writeText(text).then(() => alert('Copiado!'))
              }
            }}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Compartilhar resultado
          </button>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}
