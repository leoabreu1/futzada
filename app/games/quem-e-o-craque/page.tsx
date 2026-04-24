'use client'

import { useEffect, useRef, useState } from 'react'
import { getDailyCraque, CRAQUE_PLAYERS } from '@/lib/games/quem-e-o-craque-data'
import { useGameScore } from '@/lib/hooks/useGameScore'
import { useGameDailyStorage } from '@/lib/hooks/useGameDailyStorage'
import GamePageShell from '@/components/games/GamePageShell'

const MAX_ATTEMPTS = 5
const PLAYER = getDailyCraque()

const BLUR_LEVELS = [
  'blur(32px) brightness(0.5)',
  'blur(20px) brightness(0.65)',
  'blur(12px) brightness(0.75)',
  'blur(6px) brightness(0.88)',
  'blur(2px) brightness(0.95)',
  'blur(0px) brightness(1)',
]

type CraqueState = {
  attempt: number
  guesses: { name: string; correct: boolean }[]
  gameOver: boolean
  won: boolean
}

export default function QuemEOCraquePage() {
  const { load, save, isReady } = useGameDailyStorage<CraqueState>('craque')
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

  const suggestions =
    query.length >= 2
      ? CRAQUE_PLAYERS.filter(
          (player) =>
            player.name.toLowerCase().includes(query.toLowerCase()) &&
            !guesses.some((guess) => guess.name === player.name),
        ).slice(0, 5)
      : []

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (gameOver && !scoreRegistered) {
      registerGameResult('quem-e-o-craque', won, attempt)
      setScoreRegistered(true)
    }
  }, [attempt, gameOver, registerGameResult, scoreRegistered, won])
  /* eslint-enable react-hooks/set-state-in-effect */

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
        if (won && index === attempt - 1) return '🟩'
        if (index < attempt) return '🟥'
        return '⬛'
      })
      .join('')
    const result = won ? `${attempt}/${MAX_ATTEMPTS}` : `X/${MAX_ATTEMPTS}`
    const text = `Futle Quem e o Craque ${today}\n${result}\n\n${bars}\n\nfutle.vercel.app`

    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
      return
    }

    await navigator.clipboard.writeText(text)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  const filterStyle = gameOver ? BLUR_LEVELS[5] : BLUR_LEVELS[Math.min(attempt, BLUR_LEVELS.length - 2)]
  const remainingAttempts = Math.max(MAX_ATTEMPTS - attempt, 0)
  const wrongGuesses = guesses.filter((guess) => !guess.correct)

  return (
    <GamePageShell
      storageKey="quem-e-o-craque"
      eyebrow="Identidade diaria"
      title="Quem e o Craque?"
      badge={<span className="badge badge-green">Diario</span>}
      description="A foto comeca escondida e abre camada por camada conforme voce erra. A nova tela trata a imagem como protagonista e organiza dicas, palpites e busca em uma sequencia mais clara."
      meta={['5 tentativas', 'Foto progressiva', 'Busca por nome']}
      stats={[
        { label: 'Tentativas usadas', value: attempt, tone: won ? 'green' : 'default' },
        { label: 'Restantes', value: remainingAttempts, tone: remainingAttempts <= 1 && !gameOver ? 'danger' : 'default' },
        { label: 'Nivel de revelacao', value: `${Math.min(attempt + 1, MAX_ATTEMPTS)}/${MAX_ATTEMPTS}` },
      ]}
      asideTitle="Como ler"
      asideDescription="Aqui a imagem manda no ritmo. Cada erro revela mais do craque e libera novas pistas no painel lateral."
      asideNotes={[
        { title: 'Blur progressivo', text: 'A cada tentativa errada a foto ganha definicao.' },
        { title: 'Busca guiada', text: 'O campo de nome sugere atletas possiveis para acelerar o chute.' },
        { title: 'Dicas por camada', text: 'As pistas entram no mesmo compasso da revelacao da imagem.' },
      ]}
    >
      <div className="game-stage game-stage--single">
        <div className="game-stage__main">
          <section className="game-panel game-panel--primary">
            <p className="game-panel__eyebrow">Foto do dia</p>
            <div className="craque-main-grid">
              <div>
                <div className="game-status-banner" style={{ marginBottom: 16 }}>
                  A imagem precisa mandar no jogo. As pistas e o campo de busca ficam ao lado para apoiar o chute, nao para competir com ele.
                </div>

                <div className="craque-reveal">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PLAYER.imageUrl}
                    alt="Jogador misterioso"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      transform: 'scale(1.08)',
                      filter: filterStyle,
                      transition: 'filter 0.8s ease',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      minHeight: 36,
                      padding: '0 14px',
                      borderRadius: 999,
                      border: '1px solid rgba(248,244,235,0.12)',
                      background: 'rgba(5,16,25,0.72)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: remainingAttempts <= 1 && !gameOver ? 'var(--color-brand-yellow)' : 'var(--color-text)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {gameOver ? (won ? 'Acertou' : 'Revelado') : `${remainingAttempts} restante${remainingAttempts !== 1 ? 's' : ''}`}
                  </div>

                  {gameOver ? (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: 20,
                        background: 'linear-gradient(180deg, rgba(5,16,25,0.04) 0%, rgba(5,16,25,0.9) 100%)',
                      }}
                    >
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 0.92 }}>
                        {PLAYER.name}
                      </p>
                      <p style={{ color: 'var(--color-muted)', marginTop: 8 }}>
                        {PLAYER.club} · {PLAYER.position} · {PLAYER.nationality}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="game-stack">
                <section className="game-panel game-panel--soft">
                  <p className="game-panel__eyebrow">Barra de progresso</p>
                  <div className="craque-progress">
                    {Array.from({ length: MAX_ATTEMPTS }).map((_, index) => {
                      const isUsed = index < attempt
                      const isWinSlot = won && index === attempt - 1
                      return (
                        <span
                          key={index}
                          className="craque-progress__bar"
                          style={{
                            background: isWinSlot
                              ? 'var(--color-brand-green)'
                              : isUsed
                                ? 'rgba(239,68,68,0.58)'
                                : 'rgba(154,176,190,0.22)',
                          }}
                        />
                      )
                    })}
                  </div>
                </section>

                {gameOver ? (
                  <section className="game-panel game-panel--soft">
                    <p className="game-panel__eyebrow">Ficha revelada</p>
                    <div className="game-status-banner">
                      {PLAYER.nationality} · {PLAYER.position} · {PLAYER.club}
                    </div>
                  </section>
                ) : (
                  <section className="game-panel game-panel--soft">
                    <p className="game-panel__eyebrow">Buscar nome</p>
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && suggestions.length > 0) guess(suggestions[0].name)
                      }}
                      placeholder="Nome do jogador..."
                      className="input"
                    />
                    {suggestions.length > 0 ? (
                      <div className="game-suggestion-list" style={{ marginTop: 10 }}>
                        {suggestions.map((player) => (
                          <button key={player.id} type="button" onClick={() => guess(player.name)} className="game-suggestion-item">
                            <span style={{ fontSize: '0.9rem' }}>{player.name}</span>
                            <span style={{ color: 'var(--color-muted)', fontSize: '0.74rem' }}>
                              {player.nationality} · {player.position}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : query.length >= 2 ? (
                      <div className="game-empty" style={{ marginTop: 10 }}>Nenhum jogador encontrado nessa busca.</div>
                    ) : null}
                  </section>
                )}
              </div>
            </div>
          </section>

          <div className="game-support-grid">
            {attempt > 0 && !won ? (
              <section className="game-panel game-panel--soft">
                <p className="game-panel__eyebrow">Dicas liberadas</p>
                <div className="game-stack">
                  {PLAYER.hints.slice(0, attempt).map((hint, index) => (
                    <div key={index} className="game-status-banner">
                      {hint}
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <section className="game-panel game-panel--soft">
                <p className="game-panel__eyebrow">Ritmo da rodada</p>
                <div className="game-legend-list">
                  <div className="game-legend-item">
                    <span className="game-legend-swatch" style={{ background: 'var(--color-brand-green)' }} />
                    Cada erro abre mais da foto e te aproxima da resposta.
                  </div>
                  <div className="game-legend-item">
                    <span className="game-legend-swatch" style={{ background: 'var(--color-brand-yellow)' }} />
                    Use a busca quando o rosto ja tiver dado uma pista forte.
                  </div>
                </div>
              </section>
            )}

            {wrongGuesses.length > 0 ? (
              <section className="game-panel game-panel--soft">
                <p className="game-panel__eyebrow">Palpites que ja sairam</p>
                <div className="game-stack">
                  {wrongGuesses.map((guessItem, index) => (
                    <div key={`${guessItem.name}-${index}`} className="game-status-banner game-status-banner--danger">
                      {guessItem.name}
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <section className="game-panel game-panel--soft">
                <p className="game-panel__eyebrow">Leitura rapida</p>
                <div className="game-legend-list">
                  <div className="game-legend-item">
                    <span className="game-legend-swatch" style={{ background: '#f87171' }} />
                    Chutes errados vao ficando registrados para cortar repeticao.
                  </div>
                </div>
              </section>
            )}
          </div>

          {gameOver ? (
            <section className={`game-panel ${won ? 'game-panel--success' : 'game-panel--danger'}`}>
              <p className="game-panel__eyebrow">Fechamento</p>
              <h2 className="game-panel__title">
                {won ? `Acertou em ${attempt} tentativa${attempt > 1 ? 's' : ''}.` : 'Hoje nao foi dessa vez.'}
              </h2>
              <p className="game-panel__copy">
                {scoreRegistered ? 'Pontuacao registrada. ' : ''}
                {PLAYER.nationality} · {PLAYER.position} · {PLAYER.club}. O proximo craque chega amanha.
              </p>
              <div className="game-actions" style={{ marginTop: 18 }}>
                <button type="button" onClick={shareResult} className="btn-ghost">
                  {shared ? 'Copiado' : 'Compartilhar resultado'}
                </button>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </GamePageShell>
  )
}
