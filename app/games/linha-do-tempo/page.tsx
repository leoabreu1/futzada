'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useGameScore } from '@/lib/hooks/useGameScore'
import { getDailyTimelineEvents, getCorrectOrder, calculateTimelinePoints, type TimelineEvent } from '@/lib/games/linha-do-tempo-data'

export default function LinhaDoTempoPage() {
  const { registerGameResult } = useGameScore()
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [shuffled, setShuffled] = useState<TimelineEvent[]>([])
  const [userOrder, setUserOrder] = useState<TimelineEvent[]>([])
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing')
  const [attempts, setAttempts] = useState(1)
  const [scoreRegistered, setScoreRegistered] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Get daily events
    const dailyEvents = getDailyTimelineEvents()
    setEvents(dailyEvents)

    // Shuffle them
    const shuffledEvents = [...dailyEvents].sort(() => Math.random() - 0.5)
    setShuffled(shuffledEvents)
    setUserOrder([])

    setLoaded(true)
  }, [])

  // Registrar score quando ganhar
  useEffect(() => {
    if (gameState === 'won' && !scoreRegistered) {
      registerGameResult('linha-do-tempo', true, attempts)
      setScoreRegistered(true)
    }
  }, [gameState, attempts, scoreRegistered, registerGameResult])

  if (!loaded) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ textAlign: 'center', color: 'var(--color-muted)' }}>
          Carregando desafio do dia...
        </div>
      </div>
    )
  }

  const correctOrder = getCorrectOrder(events)
  const isCorrect = userOrder.length === events.length && 
                   userOrder.every((e, i) => e.id === correctOrder[i].id)

  const handleAddEvent = (event: TimelineEvent) => {
    setUserOrder([...userOrder, event])
  }

  const handleRemoveEvent = (index: number) => {
    setUserOrder(userOrder.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (isCorrect) {
      setGameState('won')
    } else {
      if (attempts < 3) {
        setAttempts(attempts + 1)
        // Desfaz a última tentativa
        setUserOrder([])
      } else {
        setGameState('lost')
        registerGameResult('linha-do-tempo', false, attempts)
        setScoreRegistered(true)
      }
    }
  }

  const handleReplay = () => {
    window.location.reload()
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: 32 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', marginBottom: 8 }}>
          ⏳ Linha do Tempo
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '1rem' }}>
          Ordene os 4 eventos do futebol em ordem cronológica (mais antigo → mais recente)
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 16 }}>
          <div style={{ fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--color-muted)' }}>Tentativa:</span> <strong>{attempts}/3</strong>
          </div>
          {gameState !== 'playing' && (
            <div style={{ fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--color-muted)' }}>Pontos:</span> <strong style={{ color: '#10b981' }}>{calculateTimelinePoints(attempts, gameState === 'won')}</strong>
            </div>
          )}
        </div>
      </div>

      {gameState === 'playing' ? (
        <>
          {/* Sua ordem */}
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: 12 }}>
              Sua Ordem (arraste ou clique):
            </label>
            <div style={{
              minHeight: userOrder.length === 0 ? 60 : 'auto',
              padding: userOrder.length === 0 ? '30px' : '0',
              borderRadius: 'var(--radius)',
              border: '2px dashed var(--color-border)',
              textAlign: 'center',
              background: 'var(--color-surface)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              {userOrder.length === 0 ? (
                <span style={{ color: 'var(--color-muted)' }}>Clique nos eventos para ordenar...</span>
              ) : (
                userOrder.map((event, idx) => (
                  <div
                    key={`order-${idx}`}
                    onClick={() => handleRemoveEvent(idx)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'linear-gradient(90deg, rgba(16,185,129,0.2) 0%, rgba(245,158,11,0.2) 100%)',
                      border: '1px solid rgba(16,185,129,0.3)',
                      cursor: 'pointer',
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <span style={{ fontSize: '1.2rem', minWidth: 24 }}>{idx + 1}.</span>
                    <span style={{ fontSize: '1.5rem', minWidth: 24 }}>{event.emoji}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{event.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{event.year}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--color-muted)', fontSize: '0.8rem' }}>Clique para remover</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Eventos disponíveis */}
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: 12 }}>
              Eventos Disponíveis:
            </label>
            <div style={{ display: 'grid', gap: 8 }}>
              {shuffled.map((event) => {
                const isSelected = userOrder.some(e => e.id === event.id)
                return (
                  <button
                    key={event.id}
                    onClick={() => !isSelected && handleAddEvent(event)}
                    disabled={!!isSelected}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '1px solid var(--color-border)' : '1px solid rgba(16,185,129,0.3)',
                      background: isSelected ? 'var(--color-surface-2)' : 'var(--color-surface)',
                      color: isSelected ? 'var(--color-muted)' : 'var(--color-text)',
                      cursor: isSelected ? 'not-allowed' : 'pointer',
                      opacity: isSelected ? 0.5 : 1,
                      display: 'flex',
                      gap: 12,
                      alignItems: 'center',
                      textAlign: 'left',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-sans)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => !isSelected && (e.currentTarget.style.background = 'rgba(16,185,129,0.1)')}
                    onMouseLeave={(e) => !isSelected && (e.currentTarget.style.background = 'var(--color-surface)')}
                  >
                    <span style={{ fontSize: '1.5rem', minWidth: 24 }}>{event.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: 2 }}>{event.title}</div>
                      <div style={{ fontSize: '0.8rem', color: isSelected ? 'var(--color-muted)' : 'var(--color-muted-2)', marginBottom: 2 }}>{event.description}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Ano: {event.year}</div>
                    </div>
                    {isSelected && <span style={{ color: 'var(--color-muted)' }}>✓</span>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Botão submit */}
          <button
            onClick={handleSubmit}
            disabled={userOrder.length !== events.length}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: 'var(--radius-sm)',
              background: userOrder.length === events.length ? 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)' : 'var(--color-surface)',
              border: userOrder.length === events.length ? 'none' : '1px solid var(--color-border)',
              color: userOrder.length === events.length ? '#0a0a0b' : 'var(--color-text)',
              fontSize: '1rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 'bold',
              cursor: userOrder.length === events.length ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => userOrder.length === events.length && (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => userOrder.length === events.length && (e.currentTarget.style.opacity = '1')}
          >
            {userOrder.length === events.length ? 'Verificar Ordem' : `Selecione ${events.length - userOrder.length} evento(s)`}
          </button>
        </>
      ) : gameState === 'won' ? (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 8 }}>
            Parabéns!
          </h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: 24, fontSize: '1.1rem' }}>
            Você ordenou corretamente em {attempts} tentativa{attempts > 1 ? 's' : ''}!
          </p>
          <div style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 'var(--radius)',
            padding: '16px',
            marginBottom: 24,
          }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: 8 }}>Pontos Ganhos:</div>
            <div style={{ fontSize: '2rem', color: '#10b981', fontFamily: 'var(--font-display)', fontWeight: 'bold' }}>
              +{calculateTimelinePoints(attempts, true)}
            </div>
          </div>
          {!scoreRegistered ? (
            <div style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: 24 }}>
              ⏳ Registrando pontuação...
            </div>
          ) : (
            <div style={{ color: '#10b981', fontSize: '0.85rem', marginBottom: 24 }}>
              ✓ Pontuação registrada!
            </div>
          )}
          <button
            onClick={handleReplay}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)',
              border: 'none',
              color: '#0a0a0b',
              fontSize: '1rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Novo Desafio (Amanhã)
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>😢</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 8 }}>
            Fim do Jogo
          </h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: 24, fontSize: '1.1rem' }}>
            Você usou todas as 3 tentativas!
          </p>
          <div style={{
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 'var(--radius)',
            padding: '20px',
            marginBottom: 24,
          }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: 12 }}>Ordem Correta:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {correctOrder.map((event, idx) => (
                <div
                  key={`correct-${idx}`}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(245,158,11,0.15)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                  }}
                >
                  <span>{idx + 1}.</span>
                  <span style={{ fontSize: '1.2rem' }}>{event.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{event.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{event.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleReplay}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)',
              border: 'none',
              color: '#0a0a0b',
              fontSize: '1rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Novo Desafio (Amanhã)
          </button>
        </div>
      )}
    </div>
  )
}
