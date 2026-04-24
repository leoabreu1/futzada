'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { getDailyWord, evaluateGuess, WORD_LIST, type LetterState } from '@/lib/games/wordle-data'
import { useGameScore } from '@/lib/hooks/useGameScore'
import { useGameDailyStorage } from '@/lib/hooks/useGameDailyStorage'
import GamePageShell from '@/components/games/GamePageShell'

const MAX_GUESSES = 6
const DAILY_WORD = getDailyWord()
const WORD_LENGTH = DAILY_WORD.length
const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

type GuessRow = { letters: string[]; states: LetterState[] }
type WordleState = { guesses: GuessRow[]; gameOver: boolean; won: boolean }

const CELL_STYLE: Record<LetterState, React.CSSProperties> = {
  correct: { background: 'rgba(16,185,129,0.16)', border: '1px solid rgba(16,185,129,0.4)', color: '#6cff93' },
  present: { background: 'rgba(255,194,71,0.14)', border: '1px solid rgba(255,194,71,0.34)', color: '#ffc247' },
  absent: { background: 'rgba(8,20,29,0.82)', border: '1px solid rgba(154,176,190,0.12)', color: 'var(--color-muted-2)' },
  empty: { background: 'transparent', border: '1px solid rgba(154,176,190,0.18)', color: 'var(--color-text)' },
}

export default function WordlePage() {
  const { load, save, isReady } = useGameDailyStorage<WordleState>('wordle')
  const { registerGameResult } = useGameScore()
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const [guesses, setGuesses] = useState<GuessRow[]>([])
  const [current, setCurrent] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [shake, setShake] = useState(false)
  const [error, setError] = useState('')
  const [scoreRegistered, setScoreRegistered] = useState(false)
  const [shared, setShared] = useState(false)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isReady) return
    const saved = load()
    if (!saved) return
    setGuesses(saved.guesses)
    setGameOver(saved.gameOver)
    setWon(saved.won)
    if (saved.gameOver) setScoreRegistered(true)
  }, [isReady]) // eslint-disable-line react-hooks/exhaustive-deps
  /* eslint-enable react-hooks/set-state-in-effect */

  const usedLetters = guesses.reduce<Record<string, LetterState>>((acc, row) => {
    row.letters.forEach((letter, index) => {
      const previous = acc[letter]
      const next = row.states[index]
      if (!previous || next === 'correct' || (next === 'present' && previous === 'absent')) {
        acc[letter] = next
      }
    })
    return acc
  }, {})

  const submit = useCallback(() => {
    if (current.length !== WORD_LENGTH) {
      setError(`A palavra deve ter ${WORD_LENGTH} letras.`)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    if (!WORD_LIST.includes(current)) {
      setError('Jogador nao encontrado na lista.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(''), 1800)
      return
    }

    setError('')
    const states = evaluateGuess(current, DAILY_WORD)
    const newGuesses = [...guesses, { letters: current.split(''), states }]
    const newWon = current === DAILY_WORD
    const newGameOver = newWon || newGuesses.length >= MAX_GUESSES

    setGuesses(newGuesses)
    setCurrent('')
    setWon(newWon)
    setGameOver(newGameOver)
    save({ guesses: newGuesses, gameOver: newGameOver, won: newWon })
  }, [current, guesses, save])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (gameOver) return
      if (event.key === 'Enter') {
        submit()
        return
      }
      if (event.key === 'Backspace') {
        setCurrent((value) => value.slice(0, -1))
        return
      }
      if (/^[A-Za-z]$/.test(event.key) && current.length < WORD_LENGTH) {
        setCurrent((value) => value + event.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [gameOver, current.length, submit])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (gameOver && !scoreRegistered) {
      registerGameResult('wordle', won, guesses.length)
      setScoreRegistered(true)
    }
  }, [gameOver, guesses.length, registerGameResult, scoreRegistered, won])
  /* eslint-enable react-hooks/set-state-in-effect */

  function pressKey(key: string) {
    if (gameOver) return
    if (key === 'DEL') {
      setCurrent((value) => value.slice(0, -1))
      return
    }
    if (key === 'ENT') {
      submit()
      return
    }
    if (current.length < WORD_LENGTH) {
      setCurrent((value) => value + key)
    }
  }

  async function shareResult() {
    const today = new Date().toISOString().split('T')[0]
    const emoji = (state: LetterState) => {
      if (state === 'correct') return '🟩'
      if (state === 'present') return '🟨'
      return '⬛'
    }
    const grid = guesses.map((guess) => guess.states.map(emoji).join('')).join('\n')
    const result = won ? `${guesses.length}/${MAX_GUESSES}` : 'X/6'
    const text = `Futle Wordle ${today}\n${result}\n\n${grid}\n\nfutle.vercel.app`

    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
      return
    }

    await navigator.clipboard.writeText(text)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  const rows = Array.from({ length: MAX_GUESSES }, (_, index) => {
    if (index < guesses.length) return { ...guesses[index], isActive: false, isShaking: false }
    if (index === guesses.length && !gameOver) {
      const letters = [...current.split(''), ...Array(WORD_LENGTH - current.length).fill('')]
      return {
        letters,
        states: Array(WORD_LENGTH).fill('empty') as LetterState[],
        isActive: true,
        isShaking: shake,
      }
    }

    return {
      letters: Array(WORD_LENGTH).fill(''),
      states: Array(WORD_LENGTH).fill('empty') as LetterState[],
      isActive: false,
      isShaking: false,
    }
  })

  const keyStyle = (key: string): React.CSSProperties => {
    const state = usedLetters[key]
    if (state === 'correct') {
      return { background: 'rgba(16,185,129,0.22)', border: '1px solid rgba(16,185,129,0.42)', color: '#6cff93' }
    }
    if (state === 'present') {
      return { background: 'rgba(255,194,71,0.18)', border: '1px solid rgba(255,194,71,0.34)', color: '#ffc247' }
    }
    if (state === 'absent') {
      return { background: 'rgba(8,20,29,0.82)', border: '1px solid rgba(154,176,190,0.12)', color: 'var(--color-muted-2)' }
    }
    return { background: 'rgba(9,24,36,0.76)', border: '1px solid rgba(154,176,190,0.16)', color: 'var(--color-text)' }
  }

  const cellSize = Math.max(42, Math.min(58, Math.floor(392 / WORD_LENGTH) - 8))
  const attemptsLeft = Math.max(MAX_GUESSES - guesses.length, 0)

  return (
    <GamePageShell
      storageKey="wordle"
      eyebrow="Rodada diaria"
      title="Wordle do Futebol"
      badge={<span className="badge badge-green">Diario</span>}
      description="Descubra o sobrenome escondido em ate seis tentativas. Cada cor revela o quanto voce esta perto da resposta."
      meta={[`${WORD_LENGTH} letras`, `${MAX_GUESSES} tentativas`, 'Sobrenome de jogador']}
      stats={[
        { label: 'Tentativas restantes', value: attemptsLeft, tone: attemptsLeft <= 2 && !gameOver ? 'yellow' : 'green' },
        { label: 'Linhas preenchidas', value: `${guesses.length}/${MAX_GUESSES}` },
        { label: 'Status', value: gameOver ? (won ? 'Acertou' : 'Fechou') : 'Ao vivo', tone: gameOver && !won ? 'danger' : 'default' },
      ]}
      asideTitle="Leitura rapida"
      asideDescription="O novo layout deixa o jogo mais claro: tabuleiro no centro, legenda sempre visivel e teclado com feedback forte."
      asideNotes={[
        { title: 'Verde', text: 'Letra no lugar certo e confirmada no nome do jogador.' },
        { title: 'Amarelo', text: 'Letra existe, mas ainda esta na casa errada.' },
        { title: 'Escuro', text: 'Letra fora da resposta de hoje.' },
      ]}
    >
      {error ? <div className="game-status-banner game-status-banner--danger" style={{ marginBottom: 18 }}>{error}</div> : null}

      <div className="game-stage">
        <div className="game-stage__main">
          <section className="game-panel">
            <p className="game-panel__eyebrow">Tabuleiro</p>
            <div
              className="game-board-wrap"
              style={{ alignItems: 'center', cursor: 'text' }}
              onClick={() => {
                if (!gameOver) hiddenInputRef.current?.focus()
              }}
            >
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: 'flex',
                    gap: 8,
                    animation: row.isShaking ? 'shake 0.4s ease' : undefined,
                  }}
                >
                  {row.letters.map((letter, letterIndex) => (
                    <div
                      key={`${rowIndex}-${letterIndex}`}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        borderRadius: 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                        letterSpacing: '0.05em',
                        transition: 'transform 0.18s ease, border-color 0.18s ease',
                        ...CELL_STYLE[row.states[letterIndex]],
                        ...(row.isActive && letter ? { transform: 'translateY(-2px)', borderColor: 'rgba(248,244,235,0.28)' } : {}),
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {gameOver ? (
            <section className={`game-panel ${won ? 'game-panel--success' : 'game-panel--danger'}`}>
              <p className="game-panel__eyebrow">{won ? 'Resultado' : 'Encerrado'}</p>
              <h2 className="game-panel__title">
                {won ? `Acertou em ${guesses.length} tentativa${guesses.length > 1 ? 's' : ''}.` : `A resposta era ${DAILY_WORD}.`}
              </h2>
              <p className="game-panel__copy">
                {scoreRegistered ? 'Pontuacao registrada. ' : ''}
                O proximo desafio entra amanha com um novo sobrenome.
              </p>
              <div className="game-actions" style={{ marginTop: 18 }}>
                <button onClick={shareResult} className="btn-ghost">
                  {shared ? 'Copiado' : 'Compartilhar resultado'}
                </button>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="game-stage__aside">
          <section className="game-panel game-panel--soft">
            <p className="game-panel__eyebrow">Teclado</p>
            <div className="wordle-keyboard" onClick={() => hiddenInputRef.current?.focus()}>
              {KEY_ROWS.map((row) => (
                <div key={row} className="wordle-keyboard__row">
                  {row.split('').map((key) => (
                    <button
                      key={key}
                      onClick={(event) => {
                        event.stopPropagation()
                        pressKey(key)
                      }}
                      className="wordle-keyboard__key"
                      style={{
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease, opacity 0.15s ease',
                        ...keyStyle(key),
                      }}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}

              <div className="game-actions" style={{ width: '100%' }}>
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    pressKey('DEL')
                  }}
                  className="btn-ghost wordle-keyboard__action"
                >
                  Apagar
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    pressKey('ENT')
                  }}
                  className="btn-primary wordle-keyboard__action"
                >
                  Enter
                </button>
              </div>
            </div>
          </section>

          <section className="game-panel game-panel--soft">
            <p className="game-panel__eyebrow">Ritmo do jogo</p>
            <div className="game-legend-list">
              <div className="game-legend-item">
                <span className="game-legend-swatch" style={{ background: 'rgba(108,255,147,0.82)' }} />
                Trabalhe letra por letra e use as cores para cortar opcoes rapidamente.
              </div>
              <div className="game-legend-item">
                <span className="game-legend-swatch" style={{ background: 'rgba(255,194,71,0.82)' }} />
                O teclado lateral concentra o historico para voce nao perder informacao.
              </div>
            </div>
          </section>
        </aside>
      </div>

      <input
        ref={hiddenInputRef}
        value={current}
        onChange={(event) => {
          const value = event.target.value.toUpperCase().replace(/[^A-Z]/g, '')
          if (value.length <= WORD_LENGTH) setCurrent(value)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') submit()
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
    </GamePageShell>
  )
}
