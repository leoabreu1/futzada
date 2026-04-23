'use client'

import { useState, useRef, useEffect, Fragment } from 'react'
import { PLAYERS, getDailyGrid, getValidPlayers, type Player } from '@/lib/games/jogo-da-velha-data'
import { useGameScore } from '@/lib/hooks/useGameScore'
import { useGameDailyStorage } from '@/lib/hooks/useGameDailyStorage'
import GamePageShell from '@/components/games/GamePageShell'

type CellState = { player: Player | null; locked: boolean }
type VelhaState = { cells: CellState[]; guesses: number; gameOver: boolean }

const MAX_GUESSES = 9

export default function JogoDaVelhaPage() {
  const { load, save, isReady } = useGameDailyStorage<VelhaState>('velha')
  const { registerGameResult } = useGameScore()
  const { rows, cols } = getDailyGrid()
  const inputRef = useRef<HTMLInputElement>(null)

  const [cells, setCells] = useState<CellState[]>(Array(9).fill(null).map(() => ({ player: null, locked: false })))
  const [guesses, setGuesses] = useState<number>(MAX_GUESSES)
  const [gameOver, setGameOver] = useState(false)
  const [scoreRegistered, setScoreRegistered] = useState(false)
  const [activeCell, setActiveCell] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [errorCell, setErrorCell] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [shared, setShared] = useState(false)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isReady) return
    const saved = load()
    if (!saved) return
    setCells(saved.cells)
    setGuesses(saved.guesses)
    setGameOver(saved.gameOver)
    if (saved.gameOver) setScoreRegistered(true)
  }, [isReady]) // eslint-disable-line react-hooks/exhaustive-deps
  /* eslint-enable react-hooks/set-state-in-effect */

  const score = cells.filter((cell) => cell.locked).length
  const allCellsLocked = cells.every((cell) => cell.locked)

  const usedPlayerIds = new Set(cells.filter((cell) => cell.locked && cell.player).map((cell) => cell.player!.id))
  const suggestions =
    query.length >= 2
      ? PLAYERS.filter(
          (player) =>
            player.name.toLowerCase().includes(query.toLowerCase()) &&
            !usedPlayerIds.has(player.id),
        ).slice(0, 6)
      : []

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (gameOver && !scoreRegistered) {
      registerGameResult('jogo-da-velha', allCellsLocked, MAX_GUESSES - guesses)
      setScoreRegistered(true)
    }
  }, [allCellsLocked, gameOver, guesses, registerGameResult, scoreRegistered])
  /* eslint-enable react-hooks/set-state-in-effect */

  function openCell(index: number) {
    if (cells[index].locked || gameOver) return
    setActiveCell(index)
    setQuery('')
    setTimeout(() => inputRef.current?.focus(), 40)
  }

  function selectPlayer(player: Player) {
    if (activeCell === null) return

    const row = Math.floor(activeCell / 3)
    const col = activeCell % 3
    const valid = getValidPlayers(rows[row], cols[col])
    const isValid = valid.some((entry) => entry.id === player.id)

    const newCells = [...cells]
    newCells[activeCell] = { player, locked: isValid }

    if (!isValid) {
      setErrorCell(activeCell)
      setTimeout(() => setErrorCell(null), 800)
      const matchesRow = rows[row].match(player)
      const matchesCol = cols[col].match(player)
      let message = `${player.name} nao e `
      if (!matchesRow && !matchesCol) message += `${rows[row].label} nem ${cols[col].label}`
      else if (!matchesRow) message += rows[row].label
      else message += cols[col].label
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(''), 2400)
    }

    const remaining = guesses - 1
    const newGameOver = remaining === 0 || newCells.every((cell) => cell.locked)

    setCells(newCells)
    setGuesses(remaining)
    setActiveCell(null)
    setQuery('')
    setGameOver(newGameOver)
    save({ cells: newCells, guesses: remaining, gameOver: newGameOver })
  }

  async function shareResult() {
    const today = new Date().toISOString().split('T')[0]
    const grid = cells.map((cell) => (cell.locked ? '🟩' : '⬛')).join('')
    const text = `Futle Jogo da Velha ${today}\n${score}/9\n\n${grid.slice(0, 3)}\n${grid.slice(3, 6)}\n${grid.slice(6, 9)}\n\nfutle.vercel.app`

    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
      return
    }

    await navigator.clipboard.writeText(text)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  const activeCategory =
    activeCell !== null
      ? { row: rows[Math.floor(activeCell / 3)], col: cols[activeCell % 3] }
      : null

  return (
    <GamePageShell
      storageKey="jogo-da-velha"
      eyebrow="Cruzamento diario"
      title="Jogo da Velha Futebol"
      badge={<span className="badge badge-green">Diario</span>}
      description="Cruze categorias, encontre o nome certo e complete o tabuleiro sem desperdiçar tentativas. Cada casa aceita um unico jogador valido."
      meta={['3x3 categorias', 'Sem repetir jogador', `${MAX_GUESSES} tentativas totais`]}
      stats={[
        { label: 'Acertos', value: score, tone: score >= 6 ? 'green' : 'default' },
        { label: 'Tentativas', value: guesses, tone: guesses <= 3 && !gameOver ? 'yellow' : 'default' },
        { label: 'Casas abertas', value: 9 - score, tone: gameOver && !allCellsLocked ? 'danger' : 'default' },
      ]}
      asideTitle="Como dominar"
      asideDescription="A leitura agora ficou mais editorial: tabuleiro central, casa ativa destacada e busca sempre pronta para a proxima jogada."
      asideNotes={[
        { title: 'Pense por intersecao', text: 'Cada casa precisa atender linha e coluna ao mesmo tempo.' },
        { title: 'Sem repeticao', text: 'Jogadores usados em casas travadas saem do pool imediatamente.' },
        { title: 'Fez 9', text: 'Tabuleiro completo significa rodada perfeita.' },
      ]}
    >
      {errorMessage ? <div className="game-status-banner game-status-banner--danger" style={{ marginBottom: 18 }}>{errorMessage}</div> : null}

      <div className="game-stage">
        <div className="game-stage__main">
          <section className="game-panel">
            <p className="game-panel__eyebrow">Tabuleiro</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(112px, 0.95fr) repeat(3, minmax(0, 1fr))',
                gap: 8,
              }}
            >
              <div />
              {cols.map((category) => (
                <div
                  key={category.id}
                  style={{
                    minHeight: 90,
                    padding: '14px 10px',
                    borderRadius: 18,
                    border: '1px solid rgba(154,176,190,0.14)',
                    background: 'rgba(8,20,29,0.72)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'var(--color-muted)',
                    fontSize: '0.78rem',
                    lineHeight: 1.45,
                  }}
                >
                  {category.label}
                </div>
              ))}

              {rows.map((rowCategory, rowIndex) => (
                <Fragment key={rowCategory.id}>
                  <div
                    style={{
                      minHeight: 110,
                      padding: '14px 12px',
                      borderRadius: 18,
                      border: '1px solid rgba(154,176,190,0.14)',
                      background: 'rgba(8,20,29,0.72)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: 'var(--color-muted)',
                      fontSize: '0.78rem',
                      lineHeight: 1.45,
                    }}
                  >
                    {rowCategory.label}
                  </div>

                  {cols.map((_, colIndex) => {
                    const index = rowIndex * 3 + colIndex
                    const cell = cells[index]
                    const isActive = activeCell === index
                    const isError = errorCell === index

                    return (
                      <button
                        key={index}
                        onClick={() => openCell(index)}
                        style={{
                          aspectRatio: '1',
                          minHeight: 110,
                          borderRadius: 22,
                          border: `1px solid ${
                            isError
                              ? 'rgba(239,68,68,0.5)'
                              : cell.locked
                                ? 'rgba(108,255,147,0.35)'
                                : isActive
                                  ? 'rgba(255,194,71,0.55)'
                                  : 'rgba(154,176,190,0.16)'
                          }`,
                          background: isError
                            ? 'rgba(239,68,68,0.1)'
                            : cell.locked
                              ? 'rgba(108,255,147,0.08)'
                              : isActive
                                ? 'rgba(255,194,71,0.08)'
                                : 'rgba(6,18,28,0.78)',
                          cursor: cell.locked || gameOver ? 'default' : 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          padding: 12,
                          opacity: gameOver && !cell.locked ? 0.35 : 1,
                          animation: isError ? 'shake 0.4s ease' : undefined,
                        }}
                      >
                        {cell.locked && cell.player ? (
                          <>
                            <span style={{ fontSize: '1rem', color: 'var(--color-brand-green)' }}>✓</span>
                            <span style={{ fontSize: '0.82rem', color: 'var(--color-text)', textAlign: 'center', lineHeight: 1.45 }}>
                              {cell.player.name}
                            </span>
                          </>
                        ) : cell.player && !cell.locked ? (
                          <>
                            <span style={{ fontSize: '1rem', color: '#f87171' }}>×</span>
                            <span style={{ fontSize: '0.8rem', color: '#fca5a5', textAlign: 'center', lineHeight: 1.45 }}>
                              {cell.player.name}
                            </span>
                          </>
                        ) : (
                          <>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.1rem', lineHeight: 0.9, color: isActive ? 'var(--color-brand-yellow)' : 'var(--color-muted-2)' }}>
                              +
                            </span>
                            <span style={{ color: 'var(--color-muted)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                              Escolher
                            </span>
                          </>
                        )}
                      </button>
                    )
                  })}
                </Fragment>
              ))}
            </div>
          </section>

          {gameOver ? (
            <section className={`game-panel ${allCellsLocked ? 'game-panel--success' : 'game-panel--danger'}`}>
              <p className="game-panel__eyebrow">Resultado final</p>
              <h2 className="game-panel__title">
                {score === 9 ? 'Tabuleiro perfeito.' : score >= 7 ? 'Quase impecavel.' : score >= 4 ? 'Boa leitura.' : 'Tem margem para subir.'}
              </h2>
              <p className="game-panel__copy">
                {score}/9 casas travadas. {scoreRegistered ? 'Pontuacao registrada. ' : ''}A proxima combinacao entra amanha.
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
            <p className="game-panel__eyebrow">Casa ativa</p>
            {activeCategory ? (
              <div className="game-stack">
                <div className="game-status-banner game-status-banner--success">
                  Procure um jogador que seja <strong style={{ color: 'var(--color-brand-yellow)' }}>{activeCategory.row.label}</strong> e <strong style={{ color: 'var(--color-brand-yellow)' }}>{activeCategory.col.label}</strong>.
                </div>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Nome do jogador..."
                  className="input"
                />
                {suggestions.length > 0 ? (
                  <div className="game-suggestion-list">
                    {suggestions.map((player) => (
                      <button key={player.id} onClick={() => selectPlayer(player)} className="game-suggestion-item">
                        <span style={{ fontSize: '0.9rem' }}>{player.name}</span>
                        <span style={{ color: 'var(--color-muted)', fontSize: '0.74rem' }}>
                          {player.nationality} · {player.position}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : query.length >= 2 ? (
                  <div className="game-empty">Nenhum jogador encontrado para esta busca.</div>
                ) : null}
              </div>
            ) : (
              <div className="game-empty">Clique em uma casa vazia para abrir a busca contextual.</div>
            )}
          </section>

          <section className="game-panel game-panel--soft">
            <p className="game-panel__eyebrow">Leitura de estado</p>
            <div className="game-legend-list">
              <div className="game-legend-item">
                <span className="game-legend-swatch" style={{ background: 'rgba(108,255,147,0.9)' }} />
                Verde significa casa travada com jogador valido.
              </div>
              <div className="game-legend-item">
                <span className="game-legend-swatch" style={{ background: 'rgba(255,194,71,0.9)' }} />
                Dourado mostra a casa selecionada para a jogada atual.
              </div>
              <div className="game-legend-item">
                <span className="game-legend-swatch" style={{ background: 'rgba(239,68,68,0.9)' }} />
                Vermelho indica tentativa errada e gasta uma chance.
              </div>
            </div>
          </section>
        </aside>
      </div>
    </GamePageShell>
  )
}
