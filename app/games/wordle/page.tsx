'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { getDailyWord, evaluateGuess, WORD_LIST, type LetterState } from '@/lib/games/wordle-data'

const MAX_GUESSES = 6
const DAILY_WORD = getDailyWord()
const WORD_LENGTH = DAILY_WORD.length
const STORAGE_KEY = `futzada-wordle-${new Date().toISOString().split('T')[0]}`

type GuessRow = { letters: string[]; states: LetterState[] }

const CELL_STYLE: Record<LetterState, React.CSSProperties> = {
  correct: { background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.5)', color: '#10b981' },
  present: { background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#f59e0b' },
  absent: { background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-muted-2)' },
  empty: { background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text)' },
}

const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

function loadState() {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch { return null }
}

function saveState(guesses: GuessRow[], gameOver: boolean, won: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ guesses, gameOver, won }))
  } catch {}
}

export default function WordlePage() {
  const saved = loadState()
  const [guesses, setGuesses] = useState<GuessRow[]>(saved?.guesses ?? [])
  const [current, setCurrent] = useState('')
  const [gameOver, setGameOver] = useState<boolean>(saved?.gameOver ?? false)
  const [won, setWon] = useState<boolean>(saved?.won ?? false)
  const [shake, setShake] = useState(false)
  const [error, setError] = useState('')
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const usedLetters = guesses.reduce<Record<string, LetterState>>((acc, row) => {
    row.letters.forEach((l, i) => {
      const prev = acc[l], next = row.states[i]
      if (!prev || next === 'correct' || (next === 'present' && prev === 'absent')) acc[l] = next
    })
    return acc
  }, {})

  const submit = useCallback(() => {
    if (current.length !== WORD_LENGTH) {
      setError(`A palavra deve ter ${WORD_LENGTH} letras`)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    if (!WORD_LIST.includes(current)) {
      setError('Jogador não encontrado na lista')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(''), 1500)
      return
    }
    setError('')
    const states = evaluateGuess(current, DAILY_WORD)
    const newGuesses = [...guesses, { letters: current.split(''), states }]
    const newWon = current === DAILY_WORD
    const newGameOver = newWon || newGuesses.length >= MAX_GUESSES
    setGuesses(newGuesses)
    setCurrent('')
    if (newWon) setWon(true)
    if (newGameOver) setGameOver(true)
    saveState(newGuesses, newGameOver, newWon)
  }, [current, guesses])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (gameOver) return
      if (e.key === 'Enter') { submit(); return }
      if (e.key === 'Backspace') { setCurrent((c) => c.slice(0, -1)); return }
      if (/^[A-Za-z]$/.test(e.key) && current.length < WORD_LENGTH)
        setCurrent((c) => c + e.key.toUpperCase())
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [gameOver, current, submit])

  function pressKey(key: string) {
    if (gameOver) return
    if (key === 'DEL') { setCurrent((c) => c.slice(0, -1)); return }
    if (key === 'ENT') { submit(); return }
    if (current.length < WORD_LENGTH) setCurrent((c) => c + key)
  }

  const rows = Array.from({ length: MAX_GUESSES }, (_, i) => {
    if (i < guesses.length) return { ...guesses[i], isActive: false, isShaking: false }
    if (i === guesses.length && !gameOver) {
      const letters = [...current.split(''), ...Array(WORD_LENGTH - current.length).fill('')]
      return { letters, states: Array(WORD_LENGTH).fill('empty') as LetterState[], isActive: true, isShaking: shake }
    }
    return { letters: Array(WORD_LENGTH).fill(''), states: Array(WORD_LENGTH).fill('empty') as LetterState[], isActive: false, isShaking: false }
  })

  const keyStyle = (key: string): React.CSSProperties => {
    const state = usedLetters[key]
    if (state === 'correct') return { background: 'rgba(16,185,129,0.25)', border: '1px solid rgba(16,185,129,0.4)', color: '#10b981' }
    if (state === 'present') return { background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.35)', color: '#f59e0b' }
    if (state === 'absent') return { background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-muted-2)' }
    return { background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '40px 16px 80px' }}>

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: 32 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        Voltar
      </Link>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            Wordle do Futebol
          </h1>
          <span className="badge badge-green">DIÁRIO</span>
        </div>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
          {WORD_LENGTH} letras · {MAX_GUESSES} tentativas · Sobrenome de jogador
        </p>
      </div>

      {/* Erro */}
      {error && (
        <div style={{
          padding: '10px 14px',
          marginBottom: 16,
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
          fontSize: '0.82rem',
          color: 'rgba(239,68,68,0.8)',
          textAlign: 'center',
        }}>
          {error}
        </div>
      )}

      {/* Grid — clica para focar teclado no mobile */}
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 28, alignItems: 'center', cursor: 'text' }}
        onClick={() => { if (!gameOver) hiddenInputRef.current?.focus() }}
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            style={{
              display: 'flex',
              gap: 6,
              animation: row.isShaking ? 'shake 0.4s ease' : undefined,
            }}
          >
            {row.letters.map((letter, li) => (
              <div
                key={li}
                style={{
                  width: Math.min(52, Math.floor(320 / WORD_LENGTH) - 6),
                  height: Math.min(52, Math.floor(320 / WORD_LENGTH) - 6),
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  letterSpacing: '0.02em',
                  transition: 'all 0.2s ease',
                  ...CELL_STYLE[row.states[li]],
                  ...(row.isActive && letter ? { borderColor: 'rgba(255,255,255,0.25)', transform: 'scale(1.04)' } : {}),
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Game Over */}
      {gameOver && (
        <div style={{
          padding: '16px 20px',
          marginBottom: 20,
          borderRadius: 'var(--radius)',
          border: `1px solid ${won ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.25)'}`,
          background: won ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.05)',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 4 }}>
            {won ? `Acertou em ${guesses.length} tentativa${guesses.length > 1 ? 's' : ''}!` : `Era ${DAILY_WORD}`}
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginBottom: 12 }}>Novo desafio amanhã</p>
          <button
            onClick={() => {
              const today = new Date().toISOString().split('T')[0]
              const emoji = (state: LetterState) => state === 'correct' ? '🟩' : state === 'present' ? '🟨' : '⬛'
              const grid = guesses.map(g => g.states.map(emoji).join('')).join('\n')
              const result = won ? `${guesses.length}/${MAX_GUESSES}` : 'X/6'
              const text = `Futzada Wordle ${today}\n${result}\n\n${grid}\n\nfutzada.vercel.app`
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

      {/* Input invisível para capturar teclado nativo no mobile */}
      <input
        ref={hiddenInputRef}
        value={current}
        onChange={(e) => {
          const val = e.target.value.toUpperCase().replace(/[^A-Z]/g, '')
          if (val.length <= WORD_LENGTH) setCurrent(val)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit()
        }}
        style={{
          position: 'fixed',
          opacity: 0,
          pointerEvents: 'none',
          width: 1,
          height: 1,
          top: 0,
          left: 0,
        }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="characters"
        spellCheck={false}
        readOnly={gameOver}
      />

      {/* Teclado — clicável no desktop/tablet, e ao clicar no grid foca input no mobile */}
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}
        onClick={() => hiddenInputRef.current?.focus()}
      >
        {KEY_ROWS.map((row) => (
          <div key={row} style={{ display: 'flex', gap: 'clamp(3px, 1vw, 5px)' }}>
            {row.split('').map((key) => (
              <button
                key={key}
                onClick={(e) => { e.stopPropagation(); pressKey(key) }}
                style={{
                  width: 'clamp(28px, 8.5vw, 36px)',
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.65rem, 2.5vw, 0.8rem)',
                  cursor: 'pointer',
                  transition: 'opacity 0.15s',
                  ...keyStyle(key),
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={(e) => { e.stopPropagation(); pressKey('DEL') }}
            style={{ padding: '0 14px', height: 44, borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            ⌫
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); pressKey('ENT') }}
            className="btn-primary"
            style={{ height: 44, fontSize: '0.75rem' }}
          >
            ENTER
          </button>
        </div>
      </div>

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
