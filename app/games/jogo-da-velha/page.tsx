'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { PLAYERS, getDailyGrid, getValidPlayers, type Player } from '@/lib/games/jogo-da-velha-data'

type CellState = { player: Player | null; locked: boolean }

const TODAY = new Date().toISOString().split('T')[0]
const STORAGE_KEY = `futzada-velha-${TODAY}`
const MAX_GUESSES = 9

function loadState() {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch { return null }
}

function saveState(cells: CellState[], guesses: number, gameOver: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cells, guesses, gameOver }))
  } catch {}
}

export default function JogoDaVelhaPage() {
  const { rows, cols } = getDailyGrid()
  const saved = loadState()

  const [cells, setCells] = useState<CellState[]>(
    saved?.cells ?? Array(9).fill(null).map(() => ({ player: null, locked: false }))
  )
  const [guesses, setGuesses] = useState<number>(saved?.guesses ?? MAX_GUESSES)
  const [gameOver, setGameOver] = useState<boolean>(saved?.gameOver ?? false)
  const [activeCell, setActiveCell] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [errorCell, setErrorCell] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const score = cells.filter((c) => c.locked).length

  // Jogadores já usados em células travadas
  const usedPlayerIds = new Set(
    cells.filter((c) => c.locked && c.player).map((c) => c.player!.id)
  )

  const suggestions = query.length >= 2
    ? PLAYERS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) &&
          !usedPlayerIds.has(p.id)
      ).slice(0, 6)
    : []

  function openCell(index: number) {
    if (cells[index].locked || gameOver) return
    setActiveCell(index)
    setQuery('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function selectPlayer(player: Player) {
    if (activeCell === null) return
    const row = Math.floor(activeCell / 3)
    const col = activeCell % 3
    const valid = getValidPlayers(rows[row], cols[col])
    const isValid = valid.some((p) => p.id === player.id)

    const newCells = [...cells]
    newCells[activeCell] = { player, locked: isValid }

    if (!isValid) {
      setErrorCell(activeCell)
      setTimeout(() => setErrorCell(null), 800)
    }

    const remaining = guesses - 1
    const newGameOver = remaining === 0 || newCells.every((c) => c.locked)

    setCells(newCells)
    setGuesses(remaining)
    setActiveCell(null)
    setQuery('')
    if (newGameOver) setGameOver(true)
    saveState(newCells, remaining, newGameOver)
  }

  const activeCat = activeCell !== null
    ? { row: rows[Math.floor(activeCell / 3)], col: cols[activeCell % 3] }
    : null

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 16px 80px' }}>

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: 32 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        Voltar
      </Link>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            Jogo da Velha Futebol
          </h1>
          <span className="badge badge-green">DIÁRIO</span>
        </div>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
          Preencha o grid com jogadores que se encaixam nas duas categorias. Sem repetir jogadores.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 28 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-brand-green)' }}>{score}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginLeft: 6, letterSpacing: '0.06em' }}>ACERTOS</span>
        </div>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: guesses <= 3 ? 'var(--color-brand-yellow)' : 'var(--color-text)' }}>{guesses}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginLeft: 6, letterSpacing: '0.06em' }}>TENTATIVAS</span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, 1fr)', gap: 6 }}>
        {/* Canto */}
        <div />

        {/* Headers colunas */}
        {cols.map((cat) => (
          <div key={cat.id} style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '8px 4px',
            textAlign: 'center',
            fontSize: '0.7rem',
            color: 'var(--color-muted)',
            lineHeight: 1.3,
          }}>
            {cat.label}
          </div>
        ))}

        {/* Rows */}
        {rows.map((rowCat, rowIdx) => (
          <>
            <div key={rowCat.id} style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              color: 'var(--color-muted)',
              lineHeight: 1.3,
              textAlign: 'center',
            }}>
              {rowCat.label}
            </div>

            {cols.map((_, colIdx) => {
              const index = rowIdx * 3 + colIdx
              const cell = cells[index]
              const isActive = activeCell === index
              const isError = errorCell === index

              return (
                <button
                  key={index}
                  onClick={() => openCell(index)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${
                      isError ? 'rgba(239,68,68,0.5)' :
                      cell.locked ? 'rgba(16,185,129,0.35)' :
                      isActive ? 'rgba(245,158,11,0.6)' :
                      'var(--color-border)'
                    }`,
                    background:
                      isError ? 'rgba(239,68,68,0.08)' :
                      cell.locked ? 'rgba(16,185,129,0.08)' :
                      isActive ? 'rgba(245,158,11,0.06)' :
                      'var(--color-surface)',
                    cursor: cell.locked || gameOver ? 'default' : 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 6,
                    gap: 4,
                    transition: 'border-color 0.15s, background 0.15s',
                    opacity: gameOver && !cell.locked ? 0.3 : 1,
                    animation: isError ? 'shake 0.4s ease' : undefined,
                  }}
                >
                  {cell.locked && cell.player ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: '0.65rem', color: 'var(--color-brand-green)', lineHeight: 1.2, textAlign: 'center' }}>
                        {cell.player.name}
                      </span>
                    </>
                  ) : cell.player && !cell.locked ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(239,68,68,0.7)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(239,68,68,0.6)', lineHeight: 1.2, textAlign: 'center' }}>
                        {cell.player.name}
                      </span>
                    </>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: isActive ? 'var(--color-brand-yellow)' : 'var(--color-muted-2)' }}>
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  )}
                </button>
              )
            })}
          </>
        ))}
      </div>

      {/* Busca */}
      {activeCell !== null && !gameOver && activeCat && (
        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 10 }}>
            Jogador que é{' '}
            <span style={{ color: 'var(--color-brand-yellow)', fontFamily: 'var(--font-display)' }}>{activeCat.row.label}</span>
            {' '}e{' '}
            <span style={{ color: 'var(--color-brand-yellow)', fontFamily: 'var(--font-display)' }}>{activeCat.col.label}</span>
          </p>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome do jogador..."
            className="input"
          />
          {suggestions.length > 0 && (
            <div style={{
              marginTop: 4,
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
            }}>
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectPlayer(p)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 14px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--color-border)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ color: 'var(--color-text)', fontSize: '0.875rem' }}>{p.name}</span>
                  <span style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>{p.nationality} · {p.position}</span>
                </button>
              ))}
            </div>
          )}
          {query.length >= 2 && suggestions.length === 0 && (
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-2)', marginTop: 8 }}>
              Nenhum jogador encontrado
            </p>
          )}
        </div>
      )}

      {/* Game Over */}
      {gameOver && (
        <div style={{
          marginTop: 28,
          padding: '20px 24px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 6 }}>
            {score === 9 ? 'Perfeito!' : score >= 7 ? 'Craque!' : score >= 4 ? 'Bom jogo!' : 'Quase lá!'}
          </p>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: 16 }}>
            {score}/9 acertos · Novo desafio amanhã
          </p>
          <button
            onClick={() => {
              const today = new Date().toISOString().split('T')[0]
              const grid = cells.map((c) => c.locked ? '🟩' : '⬛').join('')
              const gridStr = `${grid.slice(0,3)}\n${grid.slice(3,6)}\n${grid.slice(6,9)}`
              const text = `Futzada Jogo da Velha ${today}\n${score}/9\n\n${gridStr}\n\nfutzada.vercel.app`
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
