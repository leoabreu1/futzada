'use client'

import { useState, useEffect, useCallback } from 'react'
import { useGameScore } from '@/lib/hooks/useGameScore'
import { useGameDailyStorage } from '@/lib/hooks/useGameDailyStorage'
import { getDailyTimelineEvents, getCorrectOrder, calculateTimelinePoints, type TimelineEvent } from '@/lib/games/linha-do-tempo-data'
import GamePageShell from '@/components/games/GamePageShell'

function fisherYates<T>(arr: T[], seed: number): T[] {
  const result = [...arr]
  let state = seed
  for (let index = result.length - 1; index > 0; index--) {
    state = (state * 16807) % 2147483647
    const otherIndex = state % (index + 1)
    ;[result[index], result[otherIndex]] = [result[otherIndex], result[index]]
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
  const { load, save, today, isReady } = useGameDailyStorage<SavedState>('timeline')

  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [shuffled, setShuffled] = useState<TimelineEvent[]>([])
  const [userOrder, setUserOrder] = useState<TimelineEvent[]>([])
  const [gameState, setGameState] = useState<'playing' | 'checking' | 'won' | 'lost'>('playing')
  const [attempts, setAttempts] = useState(1)
  const [checkResults, setCheckResults] = useState<CheckResult[]>([])
  const [scoreRegistered, setScoreRegistered] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [shared, setShared] = useState(false)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isReady) return
    const dailyEvents = getDailyTimelineEvents()
    const seed = today.split('-').reduce((accumulator, value) => accumulator + parseInt(value, 10), 0)
    const shuffledEvents = fisherYates(dailyEvents, seed)

    const saved = load()
    if (saved) {
      setEvents(dailyEvents)
      setShuffled(saved.shuffled)
      setUserOrder(saved.userOrder)
      setGameState(saved.gameState)
      setAttempts(saved.attempts)
      if (saved.gameState !== 'playing') setScoreRegistered(true)
      setLoaded(true)
      return
    }

    setEvents(dailyEvents)
    setShuffled(shuffledEvents)
    setLoaded(true)
  }, [isReady]) // eslint-disable-line react-hooks/exhaustive-deps
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!loaded || gameState === 'checking') return
    save({
      gameState: gameState as 'playing' | 'won' | 'lost',
      attempts,
      userOrder,
      shuffled,
    })
  }, [attempts, gameState, loaded, save, shuffled, userOrder])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if ((gameState === 'won' || gameState === 'lost') && !scoreRegistered) {
      registerGameResult('linha-do-tempo', gameState === 'won', attempts)
      setScoreRegistered(true)
    }
  }, [attempts, gameState, registerGameResult, scoreRegistered])
  /* eslint-enable react-hooks/set-state-in-effect */

  const correctOrder = getCorrectOrder(events)

  const handleAddEvent = (event: TimelineEvent) => {
    if (gameState !== 'playing') return
    setUserOrder((previous) => [...previous, event])
  }

  const handleRemoveEvent = (index: number) => {
    if (gameState !== 'playing') return
    setUserOrder((previous) => previous.filter((_, itemIndex) => itemIndex !== index))
  }

  const handleSubmit = useCallback(() => {
    if (userOrder.length !== events.length || gameState !== 'playing') return

    const results: CheckResult[] = userOrder.map((event, index) =>
      event.id === correctOrder[index].id ? 'correct' : 'wrong',
    )
    const allCorrect = results.every((result) => result === 'correct')

    setCheckResults(results)
    setGameState('checking')

    setTimeout(() => {
      if (allCorrect) {
        setGameState('won')
      } else if (attempts >= 3) {
        setGameState('lost')
      } else {
        setAttempts((value) => value + 1)
        setUserOrder([])
        setCheckResults([])
        setGameState('playing')
      }
    }, 1800)
  }, [attempts, correctOrder, events.length, gameState, userOrder])

  async function handleShare() {
    const date = new Date().toLocaleDateString('pt-BR')
    const text =
      gameState === 'won'
        ? `Futle Linha do Tempo ${date}\nResolvido em ${attempts}/3 tentativa${attempts > 1 ? 's' : ''}\n\nfutle.vercel.app`
        : `Futle Linha do Tempo ${date}\nNao consegui hoje\n\nfutle.vercel.app`

    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
      return
    }

    await navigator.clipboard.writeText(text)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  const isChecking = gameState === 'checking'
  const isPlaying = gameState === 'playing'
  const canSubmit = userOrder.length === events.length && isPlaying

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealYear {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .timeline-row-in { animation: slideDown 0.22s ease forwards; }
        .timeline-year-in { animation: revealYear 0.35s ease 0.3s both; }
      `}</style>

      <GamePageShell
        storageKey="linha-do-tempo"
        eyebrow="Ordem historica"
        title="Linha do Tempo"
        badge={<span className="badge badge-green">Diario</span>}
        description="Organize quatro eventos do futebol do mais antigo ao mais recente. O novo layout destaca sua ordem, o banco de eventos e o momento de checagem sem confundir o fluxo."
        meta={['4 eventos', 'Ate 3 tentativas', 'Clique para ordenar']}
        stats={[
          { label: 'Tentativa atual', value: loaded ? `${attempts}/3` : '--' },
          { label: 'Eventos no slot', value: loaded ? userOrder.length : '--', tone: loaded && canSubmit ? 'green' : 'default' },
          { label: 'Pontuacao maxima', value: 120, helper: 'Sem errar a ordem', tone: 'yellow' },
        ]}
        asideTitle="Como funciona"
        asideDescription="Escolha os quatro blocos na ordem que voce acredita ser correta. O painel de validacao mostra na hora o que esta certo e o que ainda precisa de ajuste."
        asideNotes={[
          { title: 'Toque para montar', text: 'Clique em um evento disponivel para levá-lo para sua ordem.' },
          { title: 'Toque para remover', text: 'Enquanto estiver jogando, clique no item da sua ordem para tirar dali.' },
          { title: 'Tres janelas', text: 'Errou duas vezes? A terceira e a ultima tentativa da rodada.' },
        ]}
      >
        {!loaded ? (
          <div className="game-empty">Preparando a linha do tempo de hoje...</div>
        ) : (
          <div className="game-stage">
            <div className="game-stage__main">
              {(isPlaying || isChecking) ? (
                <>
                  <section className="game-panel">
                    <p className="game-panel__eyebrow">Sua ordem</p>
                    <div
                      style={{
                        overflow: 'hidden',
                        borderRadius: 20,
                        border: `1px solid ${
                          isChecking
                            ? checkResults.every((result) => result === 'correct')
                              ? 'rgba(108,255,147,0.28)'
                              : 'rgba(239,68,68,0.22)'
                            : 'rgba(154,176,190,0.14)'
                        }`,
                        background: 'rgba(8,20,29,0.78)',
                      }}
                    >
                      {userOrder.length === 0 ? (
                        <div className="game-empty" style={{ minHeight: 120, border: 'none', borderRadius: 0 }}>
                          Selecione os eventos abaixo na ordem do mais antigo ao mais recente.
                        </div>
                      ) : (
                        userOrder.map((event, index) => {
                          const result = checkResults[index] ?? null
                          return (
                            <button
                              key={`${event.id}-${index}`}
                              onClick={() => handleRemoveEvent(index)}
                              disabled={!isPlaying}
                              className="timeline-row-in"
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14,
                                padding: '14px 16px',
                                border: 'none',
                                borderBottom: index < userOrder.length - 1 ? '1px solid rgba(154,176,190,0.12)' : 'none',
                                borderLeft: `3px solid ${
                                  result === 'correct' ? 'var(--color-brand-green)' : result === 'wrong' ? '#f87171' : 'transparent'
                                }`,
                                background:
                                  result === 'correct'
                                    ? 'rgba(108,255,147,0.08)'
                                    : result === 'wrong'
                                      ? 'rgba(239,68,68,0.08)'
                                      : 'transparent',
                                color: 'var(--color-text)',
                                textAlign: 'left',
                                cursor: isPlaying ? 'pointer' : 'default',
                              }}
                            >
                              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', minWidth: 22, color: result === 'wrong' ? '#fca5a5' : result === 'correct' ? 'var(--color-brand-green)' : 'var(--color-muted)' }}>
                                {index + 1}
                              </span>
                              <span style={{ fontSize: '1.2rem', minWidth: 24 }}>{event.emoji}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, lineHeight: 1.35 }}>{event.title}</div>
                                <div style={{ color: 'var(--color-muted)', fontSize: '0.78rem', marginTop: 4 }}>{event.description}</div>
                              </div>
                              {result === null && isPlaying ? (
                                <span style={{ color: 'var(--color-muted)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Remover</span>
                              ) : null}
                              {result === 'correct' ? <span style={{ color: 'var(--color-brand-green)' }}>✓</span> : null}
                              {result === 'wrong' ? <span style={{ color: '#f87171' }}>×</span> : null}
                            </button>
                          )
                        })
                      )}
                    </div>
                  </section>

                  <section className="game-panel game-panel--soft">
                    <p className="game-panel__eyebrow">Eventos disponiveis</p>
                    <div className="game-stack">
                      {shuffled.map((event) => {
                        const isSelected = userOrder.some((item) => item.id === event.id)
                        return (
                          <button
                            key={event.id}
                            onClick={() => handleAddEvent(event)}
                            disabled={isSelected || isChecking}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 14,
                              padding: '14px 16px',
                              borderRadius: 18,
                              border: '1px solid rgba(154,176,190,0.14)',
                              background: isSelected ? 'rgba(255,255,255,0.02)' : 'rgba(6,18,28,0.78)',
                              color: isSelected ? 'var(--color-muted)' : 'var(--color-text)',
                              opacity: isSelected ? 0.38 : 1,
                              cursor: isSelected || isChecking ? 'default' : 'pointer',
                              textAlign: 'left',
                            }}
                          >
                            <span style={{ fontSize: '1.2rem', minWidth: 24 }}>{event.emoji}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, lineHeight: 1.35 }}>{event.title}</div>
                              <div style={{ color: 'var(--color-muted)', fontSize: '0.78rem', marginTop: 4 }}>{event.description}</div>
                            </div>
                            {isSelected ? <span style={{ color: 'var(--color-muted)' }}>✓</span> : null}
                          </button>
                        )
                      })}
                    </div>
                  </section>

                  <section className="game-panel game-panel--soft">
                    <div className="game-actions">
                      <button onClick={handleSubmit} disabled={!canSubmit} className="btn-primary" style={{ flex: 1, opacity: canSubmit ? 1 : 0.55 }}>
                        {isChecking ? 'Verificando...' : canSubmit ? 'Confirmar ordem' : `Faltam ${events.length - userOrder.length}`}
                      </button>
                    </div>
                  </section>
                </>
              ) : null}

              {gameState === 'won' ? (
                <section className="game-panel game-panel--success">
                  <p className="game-panel__eyebrow">Ordem correta</p>
                  <div className="game-stack">
                    {correctOrder.map((event, index) => (
                      <div
                        key={event.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          paddingBottom: 14,
                          marginBottom: index < correctOrder.length - 1 ? 14 : 0,
                          borderBottom: index < correctOrder.length - 1 ? '1px solid rgba(154,176,190,0.12)' : 'none',
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', minWidth: 22, color: 'var(--color-brand-green)' }}>
                          {index + 1}
                        </span>
                        <span style={{ fontSize: '1.2rem', minWidth: 24 }}>{event.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, lineHeight: 1.35 }}>{event.title}</div>
                          <div style={{ color: 'var(--color-muted)', fontSize: '0.78rem', marginTop: 4 }}>{event.description}</div>
                        </div>
                        <span className="timeline-year-in" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-brand-green)' }}>
                          {event.year}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="game-actions" style={{ marginTop: 18 }}>
                    <div className="game-status-banner game-status-banner--success" style={{ flex: 1 }}>
                      +{calculateTimelinePoints(attempts, true)} pontos · {attempts}/3 tentativa{attempts > 1 ? 's' : ''}
                    </div>
                    <button onClick={handleShare} className="btn-ghost">
                      {shared ? 'Copiado' : 'Compartilhar resultado'}
                    </button>
                  </div>
                </section>
              ) : null}

              {gameState === 'lost' ? (
                <section className="game-panel game-panel--danger">
                  <p className="game-panel__eyebrow">Ordem correta</p>
                  <div className="game-stack">
                    {correctOrder.map((event, index) => (
                      <div
                        key={event.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          paddingBottom: 14,
                          marginBottom: index < correctOrder.length - 1 ? 14 : 0,
                          borderBottom: index < correctOrder.length - 1 ? '1px solid rgba(154,176,190,0.12)' : 'none',
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', minWidth: 22, color: 'var(--color-muted)' }}>
                          {index + 1}
                        </span>
                        <span style={{ fontSize: '1.2rem', minWidth: 24 }}>{event.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, lineHeight: 1.35 }}>{event.title}</div>
                          <div style={{ color: 'var(--color-muted)', fontSize: '0.78rem', marginTop: 4 }}>{event.description}</div>
                        </div>
                        <span className="timeline-year-in" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-muted)' }}>
                          {event.year}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="game-actions" style={{ marginTop: 18 }}>
                    <div className="game-status-banner game-status-banner--danger" style={{ flex: 1 }}>
                      Rodada encerrada. {scoreRegistered ? 'Pontuacao registrada. ' : ''}Amanha tem nova sequencia.
                    </div>
                    <button onClick={handleShare} className="btn-ghost">
                      {shared ? 'Copiado' : 'Compartilhar resultado'}
                    </button>
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="game-stage__aside">
              <section className="game-panel game-panel--soft">
                <p className="game-panel__eyebrow">Estado da tentativa</p>
                <div className={`game-status-banner ${attempts >= 3 && isPlaying ? 'game-status-banner--danger' : 'game-status-banner--success'}`}>
                  {isChecking
                    ? 'Conferindo a ordem escolhida...'
                    : isPlaying
                      ? `Tentativa ${attempts}/3 em andamento.`
                      : gameState === 'won'
                        ? 'Ordem resolvida.'
                        : 'Limite de tentativas atingido.'}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  {[1, 2, 3].map((index) => (
                    <span
                      key={index}
                      style={{
                        flex: 1,
                        height: 10,
                        borderRadius: 999,
                        background: index < attempts ? 'rgba(154,176,190,0.24)' : index === attempts ? 'var(--color-brand-green)' : 'rgba(154,176,190,0.14)',
                      }}
                    />
                  ))}
                </div>
              </section>

              <section className="game-panel game-panel--soft">
                <p className="game-panel__eyebrow">Leitura rapida</p>
                <div className="game-legend-list">
                  <div className="game-legend-item">
                    <span className="game-legend-swatch" style={{ background: 'var(--color-brand-green)' }} />
                    Verde aparece quando a posicao esta correta na checagem.
                  </div>
                  <div className="game-legend-item">
                    <span className="game-legend-swatch" style={{ background: '#f87171' }} />
                    Vermelho sinaliza item fora da ordem certa.
                  </div>
                  <div className="game-legend-item">
                    <span className="game-legend-swatch" style={{ background: 'var(--color-brand-yellow)' }} />
                    Confirme so quando os quatro slots estiverem completos.
                  </div>
                </div>
              </section>
            </aside>
          </div>
        )}
      </GamePageShell>
    </>
  )
}
