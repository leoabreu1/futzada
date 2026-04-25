'use client'

import { useEffect, useRef, useState } from 'react'
import { getDailyCarreiraPlayer, CARREIRA_PLAYERS, CLUB_LOGOS } from '@/lib/games/carreira-data'
import { useGameScore } from '@/lib/hooks/useGameScore'
import { useGameDailyStorage } from '@/lib/hooks/useGameDailyStorage'
import GamePageShell from '@/components/games/GamePageShell'

const MAX_ATTEMPTS = 5
const PLAYER = getDailyCarreiraPlayer()

type CarreiraState = {
  attempt: number
  guesses: { name: string; correct: boolean }[]
  gameOver: boolean
  won: boolean
}

export default function CarreiraPage() {
  const { load, save, isReady } = useGameDailyStorage<CarreiraState>('carreira')
  const { registerGameResult } = useGameScore()
  const inputRef = useRef<HTMLInputElement>(null)

  const [attempt, setAttempt] = useState(0)
  const [query, setQuery] = useState('')
  const [guesses, setGuesses] = useState<{ name: string; correct: boolean }[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [scoreRegistered, setScoreRegistered] = useState(false)
  const [shared, setShared] = useState(false)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isReady) return
    const saved = load()
    if (!saved) return
    setAttempt(saved.attempt)
    setGuesses(saved.guesses)
    setGameOver(saved.gameOver)
    setWon(saved.won)
    if (saved.gameOver) setScoreRegistered(true)
  }, [isReady]) // eslint-disable-line react-hooks/exhaustive-deps
  /* eslint-enable react-hooks/set-state-in-effect */

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (gameOver && !scoreRegistered) {
      registerGameResult('carreira', won, attempt)
      setScoreRegistered(true)
    }
  }, [attempt, gameOver, registerGameResult, scoreRegistered, won])
  /* eslint-enable react-hooks/set-state-in-effect */

  const visibleClubs = PLAYER.clubs.slice(0, Math.min(attempt + 1, PLAYER.clubs.length))
  const hiddenClubs = gameOver ? PLAYER.clubs.slice(visibleClubs.length) : []
  const hiddenCount = gameOver ? 0 : Math.max(0, PLAYER.clubs.length - visibleClubs.length)
  const remainingAttempts = Math.max(MAX_ATTEMPTS - attempt, 0)
  const wrongGuesses = guesses.filter(g => !g.correct)

  const suggestions =
    query.length >= 2
      ? CARREIRA_PLAYERS.filter(
          p =>
            p.name.toLowerCase().includes(query.toLowerCase()) &&
            !guesses.some(g => g.name === p.name),
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
    setWon(newWon)
    setGameOver(newGameOver)
    save({ attempt: newAttempt, guesses: newGuesses, gameOver: newGameOver, won: newWon })
  }

  async function shareResult() {
    const today = new Date().toISOString().split('T')[0]
    const bars = Array.from({ length: MAX_ATTEMPTS })
      .map((_, index) => {
        if (won && index === attempt - 1) return '⚽'
        if (index < attempt) return '❌'
        return '⬛'
      })
      .join('')
    const result = won ? `${attempt}/${MAX_ATTEMPTS}` : `X/${MAX_ATTEMPTS}`
    const text = `Futle Caminho da Carreira ${today}\n${result}\n\n${bars}\n\nfutle.vercel.app`

    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
      return
    }

    await navigator.clipboard.writeText(text)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  return (
    <GamePageShell
      storageKey="carreira"
      eyebrow="Trajetória diária"
      title="Caminho da Carreira"
      badge={<span className="badge badge-green">Diário</span>}
      description="Os clubes da carreira aparecem um a um. Cada chute errado revela o próximo time. Acerte com poucos clubes revelados para somar mais pontos."
      meta={['5 tentativas', 'Clubes revelados', 'Busca por nome']}
      stats={[
        { label: 'Tentativas usadas', value: attempt, tone: won ? 'green' : 'default' },
        { label: 'Restantes', value: remainingAttempts, tone: remainingAttempts <= 1 && !gameOver ? 'danger' : 'default' },
        { label: 'Clubes revelados', value: `${visibleClubs.length}/${PLAYER.clubs.length}` },
      ]}
      asideTitle="Como jogar"
      asideDescription="Os clubes aparecem na ordem da carreira. Quanto antes você acertar, mais pontos."
      asideNotes={[
        { title: 'Uma pista por tentativa', text: 'Cada chute errado revela o próximo clube da trajetória.' },
        { title: 'Busca guiada', text: 'Digite o nome e escolha entre as sugestões.' },
        { title: 'Pontuação decrescente', text: 'Acertar com 1 clube vale 100 pts. Com 5, vale 20 pts.' },
      ]}
    >
      <div className="game-stage game-stage--single">
        <div className="game-stage__main">

          <section className="game-panel game-panel--primary">
            <p className="game-panel__eyebrow">Trajetória revelada</p>
            <div className="carreira-path">
              {visibleClubs.map((club, i) => (
                <div key={`v-${i}`} className="carreira-path__entry">
                  {i > 0 && (
                    <svg className="carreira-path__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  )}
                  <span className="carreira-club carreira-club--visible">
                    {CLUB_LOGOS[club] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={CLUB_LOGOS[club]} alt="" className="carreira-club__logo" />
                    )}
                    {club}
                  </span>
                </div>
              ))}

              {!gameOver && hiddenCount > 0 && (
                <>
                  <div className="carreira-path__entry">
                    <svg className="carreira-path__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <span className="carreira-club carreira-club--hidden">?</span>
                  </div>
                  {hiddenCount > 1 && (
                    <span className="carreira-path__more">+{hiddenCount - 1} clube{hiddenCount - 1 > 1 ? 's' : ''}</span>
                  )}
                </>
              )}

              {gameOver && hiddenClubs.map((club, i) => (
                <div key={`h-${i}`} className="carreira-path__entry">
                  <svg className="carreira-path__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="carreira-club carreira-club--revealed">
                    {CLUB_LOGOS[club] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={CLUB_LOGOS[club]} alt="" className="carreira-club__logo carreira-club__logo--dim" />
                    )}
                    {club}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="game-support-grid">
            <section className="game-panel game-panel--soft">
              <p className="game-panel__eyebrow">Progresso</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => {
                  const isUsed = index < attempt
                  const isWinSlot = won && index === attempt - 1
                  return (
                    <span
                      key={index}
                      style={{
                        flex: 1,
                        height: 6,
                        borderRadius: 3,
                        background: isWinSlot
                          ? 'var(--color-brand-green)'
                          : isUsed
                            ? 'rgba(239,68,68,0.58)'
                            : 'rgba(154,176,190,0.22)',
                        transition: 'background 0.3s ease',
                      }}
                    />
                  )
                })}
              </div>
              <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                {gameOver
                  ? won
                    ? `Acertou em ${attempt} tentativa${attempt !== 1 ? 's' : ''}`
                    : 'Sem tentativas restantes'
                  : `${remainingAttempts} tentativa${remainingAttempts !== 1 ? 's' : ''} restante${remainingAttempts !== 1 ? 's' : ''}`
                }
              </p>
            </section>

            {wrongGuesses.length > 0 ? (
              <section className="game-panel game-panel--soft">
                <p className="game-panel__eyebrow">Chutes errados</p>
                <div className="game-stack">
                  {wrongGuesses.map((g, i) => (
                    <div key={`${g.name}-${i}`} className="game-status-banner game-status-banner--danger">
                      {g.name}
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <section className="game-panel game-panel--soft">
                <p className="game-panel__eyebrow">Dica rápida</p>
                <div className="game-legend-list">
                  <div className="game-legend-item">
                    <span className="game-legend-swatch" style={{ background: 'var(--color-brand-green)' }} />
                    Acertar com poucos clubes revelados vale mais pontos.
                  </div>
                  <div className="game-legend-item">
                    <span className="game-legend-swatch" style={{ background: 'rgba(239,68,68,0.58)' }} />
                    Cada erro revela o próximo clube da trajetória.
                  </div>
                </div>
              </section>
            )}
          </div>

          {!gameOver && (
            <section className="game-panel game-panel--soft">
              <p className="game-panel__eyebrow">Quem é esse jogador?</p>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && suggestions.length > 0) guess(suggestions[0].name)
                }}
                placeholder="Nome do jogador..."
                className="input"
              />
              {suggestions.length > 0 ? (
                <div className="game-suggestion-list" style={{ marginTop: 10 }}>
                  {suggestions.map(p => (
                    <button key={p.id} type="button" onClick={() => guess(p.name)} className="game-suggestion-item">
                      <span style={{ fontSize: '0.9rem' }}>{p.name}</span>
                      <span style={{ color: 'var(--color-muted)', fontSize: '0.74rem' }}>
                        {p.nationality} · {p.position}
                      </span>
                    </button>
                  ))}
                </div>
              ) : query.length >= 2 ? (
                <div className="game-empty" style={{ marginTop: 10 }}>Nenhum jogador encontrado.</div>
              ) : null}
            </section>
          )}

          {gameOver && (
            <section className={`game-panel ${won ? 'game-panel--success' : 'game-panel--danger'}`}>
              <p className="game-panel__eyebrow">Resultado</p>
              <h2 className="game-panel__title">
                {won
                  ? `Acertou em ${attempt} tentativa${attempt !== 1 ? 's' : ''}.`
                  : 'Hoje não foi dessa vez.'
                }
              </h2>
              <p className="game-panel__copy">
                {scoreRegistered ? 'Pontuação registrada. ' : ''}
                {PLAYER.name} · {PLAYER.nationality} · {PLAYER.position}. O próximo jogador chega amanhã.
              </p>
              <div className="game-actions" style={{ marginTop: 18 }}>
                <button type="button" onClick={shareResult} className="btn-ghost">
                  {shared ? 'Copiado' : 'Compartilhar resultado'}
                </button>
              </div>
            </section>
          )}

        </div>
      </div>
    </GamePageShell>
  )
}
