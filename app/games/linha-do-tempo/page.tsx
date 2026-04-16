'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useGameScore } from '@/lib/hooks/useGameScore'
import { getDailyTimelineEvents, getCorrectOrder, calculateTimelinePoints, type TimelineEvent } from '@/lib/games/linha-do-tempo-data'

function fisherYates<T>(arr: T[], seed: number): T[] {
  const result = [...arr]
  let s = seed
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647
    const j = s % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

type CheckResult = 'correct' | 'wrong' | null

interface SavedState {
  gameState: 'playing' | 'won' | 'lost'
  attempts: number
  userOrder: TimelineEvent[]
  shuffled: TimelineEvent[]
}

export default function LinhaDoTempoPage() {
  const { registerGameResult } = useGameScore()
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [shuffled, setShuffled] = useState<TimelineEvent[]>([])
  const [userOrder, setUserOrder] = useState<TimelineEvent[]>([])
  const [gameState, setGameState] = useState<'playing' | 'checking' | 'won' | 'lost'>('playing')
  const [attempts, setAttempts] = useState(1)
  const [checkResults, setCheckResults] = useState<CheckResult[]>([])
  const [scoreRegistered, setScoreRegistered] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [shared, setShared] = useState(false)

  const today = typeof window !== 'undefined' ? new Date().toISOString().split('T')[0] : ''
  const STORAGE_KEY = `futzada-timeline-${today}`

  useEffect(() => {
    const dailyEvents = getDailyTimelineEvents()
    const seed = today.split('-').reduce((acc, val) => acc + parseInt(val, 10), 0)
    const shuffledEvents = fisherYates(dailyEvents, seed)

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed: SavedState = JSON.parse(saved)
        setEvents(dailyEvents)
        setShuffled(parsed.shuffled)
        setUserOrder(parsed.userOrder)
        setGameState(parsed.gameState)
        setAttempts(parsed.attempts)
        if (parsed.gameState !== 'playing') setScoreRegistered(true)
        setLoaded(true)
        return
      }
    } catch {}

    setEvents(dailyEvents)
    setShuffled(shuffledEvents)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded || gameState === 'checking') return
    try {
      const state: SavedState = {
        gameState: gameState as 'playing' | 'won' | 'lost',
        attempts,
        userOrder,
        shuffled,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [gameState, attempts, userOrder, loaded])

  useEffect(() => {
    if (gameState === 'won' && !scoreRegistered) {
      registerGameResult('linha-do-tempo', true, attempts)
      setScoreRegistered(true)
    }
  }, [gameState, attempts, scoreRegistered, registerGameResult])

  const correctOrder = getCorrectOrder(events)

  const handleAddEvent = (event: TimelineEvent) => {
    if (gameState !== 'playing') return
    setUserOrder(prev => [...prev, event])
  }

  const handleRemoveEvent = (index: number) => {
    if (gameState !== 'playing') return
    setUserOrder(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = useCallback(() => {
    if (userOrder.length !== events.length || gameState !== 'playing') return

    const results: CheckResult[] = userOrder.map((event, i) =>
      event.id === correctOrder[i].id ? 'correct' : 'wrong'
    )
    const allCorrect = results.every(r => r === 'correct')

    setCheckResults(results)
    setGameState('checking')

    setTimeout(() => {
      if (allCorrect) {
        setGameState('won')
      } else if (attempts >= 3) {
        registerGameResult('linha-do-tempo', false, attempts)
        setScoreRegistered(true)
        setGameState('lost')
      } else {
        setAttempts(prev => prev + 1)
        setUserOrder([])
        setCheckResults([])
        setGameState('playing')
      }
    }, 1800)
  }, [userOrder, events, correctOrder, attempts, gameState, registerGameResult])

  const handleShare = () => {
    const date = new Date().toLocaleDateString('pt-BR')
    const lines =
      gameState === 'won'
        ? `⏳ Linha do Tempo — ${date}\nResolvi em ${attempts}/3 tentativa${attempts > 1 ? 's' : ''}!\n\nfutzada.com`
        : `⏳ Linha do Tempo — ${date}\nNão consegui hoje 😅\n\nfutzada.com`

    if (navigator.share) {
      navigator.share({ text: lines })
    } else {
      navigator.clipboard.writeText(lines)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  if (!loaded) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 24px' }}>
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.85rem' }}>
          Preparando desafio...
        </p>
      </div>
    )
  }

  const isChecking = gameState === 'checking'
  const isPlaying = gameState === 'playing'
  const canSubmit = userOrder.length === events.length && isPlaying

  return (
    <>
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-7px); }
          40%      { transform: translateX(7px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealYear {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .tl-shake     { animation: shake 0.45s ease; }
        .tl-slide-in  { animation: slideDown 0.2s ease forwards; }
        .tl-year-in   { animation: revealYear 0.35s ease 0.4s both; }
        .tl-btn { transition: background 0.12s ease, opacity 0.12s ease, border-color 0.12s ease; }
        .tl-btn:hover:not(:disabled) { background: rgba(16,185,129,0.08) !important; }
        @media (prefers-reduced-motion: reduce) {
          .tl-shake, .tl-slide-in, .tl-year-in { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Back */}
        <Link
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'var(--color-muted)', fontSize: '0.8rem',
            textDecoration: 'none', marginBottom: 40,
            transition: 'color 0.15s ease',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Voltar
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 10 }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
            }}>
              Linha do Tempo
            </h1>
            {/* Dots de tentativa */}
            <div style={{ display: 'flex', gap: 5, paddingTop: 6, flexShrink: 0 }}>
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: i < attempts
                      ? 'var(--color-border)'
                      : i === attempts
                        ? '#10b981'
                        : 'var(--color-border)',
                    opacity: i < attempts ? 0.3 : 1,
                    transition: 'background 0.3s, opacity 0.3s',
                  }}
                />
              ))}
            </div>
          </div>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: 480 }}>
            Ordene os 4 eventos do mais antigo ao mais recente.{' '}
            <span style={{ color: 'var(--color-text)', opacity: 0.4 }}>Tentativa {attempts}/3.</span>
          </p>
        </div>

        {/* ── ESTADO PLAYING / CHECKING ── */}
        {(isPlaying || isChecking) && (
          <>
            {/* Zona de ordenação */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{
                  fontSize: '0.7rem', letterSpacing: '0.09em',
                  textTransform: 'uppercase', color: 'var(--color-muted)',
                }}>
                  Sua ordem
                </span>
                <span style={{
                  fontSize: '0.68rem', color: 'var(--color-muted)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1px 7px',
                }}>
                  {userOrder.length}/{events.length}
                </span>
              </div>

              <div
                className={isChecking && checkResults.some(r => r === 'wrong') ? 'tl-shake' : ''}
                style={{
                  borderRadius: 'var(--radius)',
                  border: `1px solid ${
                    isChecking
                      ? checkResults.every(r => r === 'correct')
                        ? 'rgba(16,185,129,0.35)'
                        : 'rgba(239,68,68,0.25)'
                      : 'var(--color-border)'
                  }`,
                  background: 'var(--color-surface)',
                  minHeight: 60,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {userOrder.length === 0 ? (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: 60, color: 'var(--color-muted)', fontSize: '0.82rem',
                  }}>
                    Selecione os eventos na ordem abaixo
                  </div>
                ) : (
                  userOrder.map((event, idx) => {
                    const result = checkResults[idx] ?? null
                    return (
                      <div
                        key={`order-${event.id}-${idx}`}
                        className="tl-slide-in"
                        onClick={() => handleRemoveEvent(idx)}
                        style={{
                          padding: '11px 16px',
                          display: 'flex', gap: 12, alignItems: 'center',
                          cursor: isPlaying ? 'pointer' : 'default',
                          borderBottom: idx < userOrder.length - 1 ? '1px solid var(--color-border)' : 'none',
                          borderLeft: `3px solid ${
                            result === 'correct' ? '#10b981'
                            : result === 'wrong'  ? '#ef4444'
                            : 'transparent'
                          }`,
                          background: result === 'correct'
                            ? 'rgba(16,185,129,0.05)'
                            : result === 'wrong'
                              ? 'rgba(239,68,68,0.05)'
                              : 'transparent',
                          transition: 'border-color 0.25s ease, background 0.25s ease',
                        }}
                      >
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.05rem', fontWeight: 800,
                          letterSpacing: '-0.03em', minWidth: 18,
                          color: result === 'correct' ? '#10b981'
                               : result === 'wrong'  ? '#ef4444'
                               : 'var(--color-muted)',
                          transition: 'color 0.25s ease',
                        }}>
                          {idx + 1}
                        </span>
                        <span style={{ fontSize: '1.15rem', minWidth: 22 }}>{event.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.3 }}>{event.title}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginTop: 2 }}>{event.description}</div>
                        </div>
                        {result === 'correct' && (
                          <span style={{ fontSize: '0.8rem', color: '#10b981', flexShrink: 0 }}>✓</span>
                        )}
                        {result === 'wrong' && (
                          <span style={{ fontSize: '0.8rem', color: '#ef4444', flexShrink: 0 }}>✗</span>
                        )}
                        {result === null && isPlaying && (
                          <span style={{ fontSize: '0.68rem', color: 'var(--color-muted)', opacity: 0.45, flexShrink: 0 }}>remover</span>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Eventos disponíveis */}
            <div style={{ marginBottom: 20 }}>
              <span style={{
                display: 'block', marginBottom: 10,
                fontSize: '0.7rem', letterSpacing: '0.09em',
                textTransform: 'uppercase', color: 'var(--color-muted)',
              }}>
                Eventos
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {shuffled.map((event) => {
                  const isSelected = userOrder.some(e => e.id === event.id)
                  return (
                    <button
                      key={event.id}
                      onClick={() => handleAddEvent(event)}
                      disabled={isSelected || isChecking}
                      className="tl-btn"
                      style={{
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        background: isSelected ? 'transparent' : 'var(--color-surface)',
                        color: isSelected ? 'var(--color-muted)' : 'var(--color-text)',
                        cursor: isSelected || isChecking ? 'default' : 'pointer',
                        opacity: isSelected ? 0.3 : 1,
                        display: 'flex', gap: 12, alignItems: 'center',
                        textAlign: 'left',
                        fontFamily: 'var(--font-sans)',
                        width: '100%',
                      }}
                    >
                      <span style={{ fontSize: '1.15rem', minWidth: 22 }}>{event.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.3 }}>{event.title}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginTop: 2, lineHeight: 1.4 }}>
                          {event.description}
                        </div>
                      </div>
                      {isSelected && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', flexShrink: 0 }}>✓</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Botão confirmar */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="tl-btn"
              style={{
                width: '100%',
                padding: '13px 20px',
                borderRadius: 'var(--radius-sm)',
                background: canSubmit
                  ? 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)'
                  : 'var(--color-surface)',
                border: canSubmit ? 'none' : '1px solid var(--color-border)',
                color: canSubmit ? '#0a0a0b' : 'var(--color-muted)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                cursor: canSubmit ? 'pointer' : 'not-allowed',
              }}
            >
              {isChecking
                ? 'Verificando...'
                : canSubmit
                  ? 'Confirmar ordem'
                  : `Selecione mais ${events.length - userOrder.length} evento${events.length - userOrder.length > 1 ? 's' : ''}`}
            </button>
          </>
        )}

        {/* ── VITÓRIA ── */}
        {gameState === 'won' && (
          <div>
            <div style={{
              borderRadius: 'var(--radius)',
              border: '1px solid rgba(16,185,129,0.2)',
              background: 'rgba(16,185,129,0.04)',
              padding: '24px',
              marginBottom: 12,
            }}>
              <div style={{
                fontSize: '0.7rem', letterSpacing: '0.09em',
                textTransform: 'uppercase', color: '#10b981', marginBottom: 16,
              }}>
                Ordem correta
              </div>

              {correctOrder.map((event, idx) => (
                <div
                  key={event.id}
                  style={{
                    padding: '11px 0',
                    display: 'flex', gap: 12, alignItems: 'center',
                    borderBottom: idx < correctOrder.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem', fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: '#10b981', minWidth: 18,
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontSize: '1.15rem', minWidth: 22 }}>{event.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.3 }}>{event.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginTop: 2 }}>{event.description}</div>
                  </div>
                  <span className="tl-year-in" style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800, fontSize: '0.95rem',
                    letterSpacing: '-0.02em',
                    color: '#10b981', flexShrink: 0,
                  }}>
                    {event.year}
                  </span>
                </div>
              ))}

              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-end', marginTop: 20,
                paddingTop: 16, borderTop: '1px solid var(--color-border)',
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginBottom: 3 }}>Pontos ganhos</div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.2rem', fontWeight: 800,
                    letterSpacing: '-0.04em', color: '#10b981',
                  }}>
                    +{calculateTimelinePoints(attempts, true)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginBottom: 3 }}>Tentativas</div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.2rem', fontWeight: 800,
                    letterSpacing: '-0.04em',
                  }}>
                    {attempts}
                    <span style={{ fontSize: '1rem', color: 'var(--color-muted)', fontWeight: 400 }}>/3</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="tl-btn"
              style={{
                width: '100%', padding: '12px 20px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: shared ? '#10b981' : 'var(--color-text)',
                fontSize: '0.875rem', fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
              }}
            >
              {shared ? '✓ Copiado!' : 'Compartilhar resultado'}
            </button>
          </div>
        )}

        {/* ── DERROTA ── */}
        {gameState === 'lost' && (
          <div>
            <div style={{
              borderRadius: 'var(--radius)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              padding: '24px',
              marginBottom: 12,
            }}>
              <div style={{
                fontSize: '0.7rem', letterSpacing: '0.09em',
                textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 16,
              }}>
                Ordem correta
              </div>

              {correctOrder.map((event, idx) => (
                <div
                  key={event.id}
                  style={{
                    padding: '11px 0',
                    display: 'flex', gap: 12, alignItems: 'center',
                    borderBottom: idx < correctOrder.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem', fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-muted)', minWidth: 18,
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontSize: '1.15rem', minWidth: 22 }}>{event.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.3 }}>{event.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginTop: 2 }}>{event.description}</div>
                  </div>
                  <span className="tl-year-in" style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800, fontSize: '0.95rem',
                    letterSpacing: '-0.02em',
                    color: 'var(--color-muted)', flexShrink: 0,
                  }}>
                    {event.year}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleShare}
              className="tl-btn"
              style={{
                width: '100%', padding: '12px 20px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: shared ? '#10b981' : 'var(--color-text)',
                fontSize: '0.875rem', fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
              }}
            >
              {shared ? '✓ Copiado!' : 'Compartilhar resultado'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
