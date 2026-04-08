'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { getDailyCraque, CRAQUE_PLAYERS } from '@/lib/games/quem-e-o-craque-data'

const MAX_ATTEMPTS = 5
const PLAYER = getDailyCraque()
const TODAY = new Date().toISOString().split('T')[0]
const STORAGE_KEY = `futzada-craque-${TODAY}`

const BLUR_LEVELS = [
  'blur(32px) brightness(0.5)',
  'blur(20px) brightness(0.65)',
  'blur(12px) brightness(0.75)',
  'blur(6px) brightness(0.88)',
  'blur(2px) brightness(0.95)',
  'blur(0px) brightness(1)',
]

function loadState() {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch { return null }
}

function saveState(attempt: number, guesses: { name: string; correct: boolean }[], gameOver: boolean, won: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ attempt, guesses, gameOver, won }))
  } catch {}
}

export default function QuemEOCraquePage() {
  const saved = loadState()
  const [attempt, setAttempt] = useState<number>(saved?.attempt ?? 0)
  const [query, setQuery] = useState('')
  const [guesses, setGuesses] = useState<{ name: string; correct: boolean }[]>(saved?.guesses ?? [])
  const [gameOver, setGameOver] = useState<boolean>(saved?.gameOver ?? false)
  const [won, setWon] = useState<boolean>(saved?.won ?? false)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = query.length >= 2
    ? CRAQUE_PLAYERS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        !guesses.some((g) => g.name === p.name)
      ).slice(0, 5)
    : []

  function guess(name: string) {
    const correct = name.toLowerCase() === PLAYER.name.toLowerCase()
    const newGuesses = [...guesses, { name, correct }]
    const newAttempt = attempt + 1
    const newWon = correct
    const newGameOver = correct || newAttempt >= MAX_ATTEMPTS

    setGuesses(newGuesses)
    setQuery('')
    setAttempt(newAttempt)
    if (newWon) setWon(true)
    if (newGameOver) setGameOver(true)
    saveState(newAttempt, newGuesses, newGameOver, newWon)
  }

  const filterStyle = gameOver ? BLUR_LEVELS[5] : BLUR_LEVELS[Math.min(attempt, BLUR_LEVELS.length - 2)]

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '40px 16px 80px' }}>

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: 32 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        Voltar
      </Link>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            Quem é o Craque?
          </h1>
          <span className="badge badge-yellow">NOVO</span>
        </div>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
          A foto vai revelando a cada tentativa errada. Acerte com o mínimo de dicas.
        </p>
      </div>

      {/* Foto */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        aspectRatio: '1 / 1',
        maxWidth: 320,
        margin: '0 auto 24px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PLAYER.imageUrl}
          alt="Jogador misterioso"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            transform: 'scale(1.1)',
            filter: filterStyle,
            transition: 'filter 0.8s ease',
          }}
        />

        {/* Badge tentativas */}
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: 'var(--radius-sm)',
          padding: '4px 10px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.72rem',
          letterSpacing: '0.05em',
          color: MAX_ATTEMPTS - attempt <= 1 ? 'var(--color-brand-yellow)' : 'var(--color-text)',
        }}>
          {gameOver ? (won ? 'Acertou!' : 'Revelado') : `${MAX_ATTEMPTS - attempt} tentativa${MAX_ATTEMPTS - attempt !== 1 ? 's' : ''}`}
        </div>

        {/* Overlay revelado */}
        {gameOver && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '16px',
          }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#fff', marginBottom: 2 }}>{PLAYER.name}</p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>{PLAYER.club} · {PLAYER.position}</p>
          </div>
        )}
      </div>

      {/* Barra de progresso */}
      <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 20 }}>
        {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => {
          const isUsed = i < attempt
          const isWinSlot = won && i === attempt - 1
          return (
            <div key={i} style={{
              width: 28,
              height: 4,
              borderRadius: 2,
              background: isWinSlot
                ? 'var(--color-brand-green)'
                : isUsed
                ? 'rgba(239,68,68,0.5)'
                : 'var(--color-surface-2)',
              transition: 'background 0.3s',
            }} />
          )
        })}
      </div>

      {/* Dicas progressivas */}
      {attempt > 0 && !won && (
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
          padding: '14px 16px',
          marginBottom: 16,
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: 10 }}>
            DICAS
          </p>
          {PLAYER.hints.slice(0, attempt).map((hint, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              marginBottom: i < attempt - 1 ? 8 : 0,
              fontSize: '0.85rem',
              color: 'var(--color-muted)',
              lineHeight: 1.5,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-yellow)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              <span>{hint}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tentativas erradas */}
      {guesses.filter(g => !g.correct).length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
          {guesses.filter(g => !g.correct).map((g, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(239,68,68,0.05)',
              border: '1px solid rgba(239,68,68,0.15)',
              fontSize: '0.85rem',
              color: 'rgba(239,68,68,0.7)',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <span>{g.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Game Over */}
      {gameOver ? (
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius)',
          border: `1px solid ${won ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.2)'}`,
          background: won ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.04)',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 6 }}>
            {won ? `Acertou em ${attempt} tentativa${attempt > 1 ? 's' : ''}!` : 'Não foi dessa vez'}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            {PLAYER.nationality} · {PLAYER.position} · {PLAYER.club}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-2)', marginTop: 8, marginBottom: 16 }}>Novo desafio amanhã</p>
          <button
            onClick={() => {
              const today = new Date().toISOString().split('T')[0]
              const bars = Array.from({ length: MAX_ATTEMPTS }).map((_, i) => {
                if (won && i === attempt - 1) return '🟩'
                if (i < attempt) return '🟥'
                return '⬛'
              }).join('')
              const result = won ? `${attempt}/${MAX_ATTEMPTS}` : `X/${MAX_ATTEMPTS}`
              const text = `Futzada Quem é o Craque? ${today}\n${result}\n\n${bars}\n\nfutzada.vercel.app`
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
      ) : (
        <div>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && suggestions.length > 0) guess(suggestions[0].name) }}
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
                  onClick={() => guess(p.name)}
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
    </div>
  )
}
