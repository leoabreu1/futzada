'use client'

import { useState, useEffect } from 'react'
import { getDailyConexoes, type ConexoesGroup } from '@/lib/games/conexoes-data'
import { useGameScore } from '@/lib/hooks/useGameScore'
import { useGameDailyStorage } from '@/lib/hooks/useGameDailyStorage'
import GamePageShell from '@/components/games/GamePageShell'

const PUZZLE = getDailyConexoes()

type ConexoesState = {
  foundGroups: ConexoesGroup[]
  errors: number
  shuffledPlayers: string[]
  gameState: 'playing' | 'won' | 'lost'
}

const DIFF_STYLE: Record<ConexoesGroup['difficulty'], { bg: string; border: string; text: string; label: string }> = {
  yellow: { bg: 'rgba(255,194,71,0.12)', border: 'rgba(255,194,71,0.34)', text: 'var(--color-brand-yellow)', label: 'Mais direta' },
  green: { bg: 'rgba(108,255,147,0.12)', border: 'rgba(108,255,147,0.28)', text: 'var(--color-brand-green)', label: 'Intermediaria' },
  blue: { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.28)', text: '#93c5fd', label: 'Mais esperta' },
  purple: { bg: 'rgba(196,132,252,0.12)', border: 'rgba(196,132,252,0.28)', text: '#d8b4fe', label: 'Pegadinha final' },
}

const DIFF_EMOJI: Record<ConexoesGroup['difficulty'], string> = {
  yellow: '🟨',
  green: '🟩',
  blue: '🟦',
  purple: '🟪',
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr]
  let state = seed
  for (let index = result.length - 1; index > 0; index--) {
    state = (state * 1664525 + 1013904223) & 0xffffffff
    const otherIndex = Math.abs(state) % (index + 1)
    ;[result[index], result[otherIndex]] = [result[otherIndex], result[index]]
  }
  return result
}

export default function ConexoesPage() {
  const { load, save, today, isReady } = useGameDailyStorage<ConexoesState>('conexoes')
  const { registerGameResult } = useGameScore()

  const [scoreRegistered, setScoreRegistered] = useState(false)
  const [shared, setShared] = useState(false)

  const allPlayers = PUZZLE.groups.flatMap((group) => group.players)
  const seed = today.split('-').reduce((accumulator, entry) => accumulator + parseInt(entry, 10), 0)

  const [foundGroups, setFoundGroups] = useState<ConexoesGroup[]>([])
  const [errors, setErrors] = useState(0)
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing')
  const [shuffledPlayers, setShuffledPlayers] = useState<string[]>(seededShuffle(allPlayers, seed))
  const [selected, setSelected] = useState<string[]>([])
  const [shaking, setShaking] = useState(false)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isReady) return
    const saved = load()
    if (!saved) return
    setFoundGroups(saved.foundGroups)
    setErrors(saved.errors)
    setGameState(saved.gameState)
    setShuffledPlayers(saved.shuffledPlayers)
    if (saved.gameState !== 'playing') setScoreRegistered(true)
  }, [isReady]) // eslint-disable-line react-hooks/exhaustive-deps
  /* eslint-enable react-hooks/set-state-in-effect */

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if ((gameState === 'won' || gameState === 'lost') && !scoreRegistered) {
      registerGameResult('conexoes', gameState === 'won', errors)
      setScoreRegistered(true)
    }
  }, [errors, gameState, registerGameResult, scoreRegistered])
  /* eslint-enable react-hooks/set-state-in-effect */

  function toggleSelect(player: string) {
    if (gameState !== 'playing') return
    if (selected.includes(player)) {
      setSelected(selected.filter((entry) => entry !== player))
    } else if (selected.length < 4) {
      setSelected([...selected, player])
    }
  }

  function submit() {
    if (selected.length !== 4 || gameState !== 'playing') return

    const matched = PUZZLE.groups.find(
      (group) =>
        group.players.every((player) => selected.includes(player)) &&
        selected.every((player) => group.players.includes(player)),
    )

    if (matched) {
      const newFound = [...foundGroups, matched]
      const remaining = shuffledPlayers.filter((player) => !selected.includes(player))
      const newState = newFound.length === 4 ? 'won' : 'playing'

      setFoundGroups(newFound)
      setShuffledPlayers(remaining)
      setSelected([])
      setGameState(newState)
      save({ foundGroups: newFound, errors, shuffledPlayers: remaining, gameState: newState })
      return
    }

    const newErrors = errors + 1
    const newState = newErrors >= 4 ? 'lost' : 'playing'
    setShaking(true)
    setTimeout(() => {
      setShaking(false)
      setSelected([])
    }, 600)
    setErrors(newErrors)
    setGameState(newState)
    save({ foundGroups, errors: newErrors, shuffledPlayers, gameState: newState })
  }

  async function shareResult() {
    const rows = [
      ...foundGroups.map((group) => DIFF_EMOJI[group.difficulty].repeat(4)),
      ...(gameState === 'lost' ? Array(unfoundGroups.length).fill('🟥🟥🟥🟥') : []),
    ].join('\n')

    const result =
      gameState === 'won'
        ? errors === 0
          ? 'Sem erros'
          : `${errors} erro${errors !== 1 ? 's' : ''}`
        : `${foundGroups.length}/4 grupos`

    const text = `Futle Conexoes ${today}\n${result}\n\n${rows}\n\nfutle.vercel.app`

    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
      return
    }

    await navigator.clipboard.writeText(text)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  const unfoundGroups = PUZZLE.groups.filter((group) => !foundGroups.some((found) => found.category === group.category))
  const remainingLives = Math.max(4 - errors, 0)

  return (
    <GamePageShell
      storageKey="conexoes"
      eyebrow="Leitura de padroes"
      title="Conexoes Futebol"
      badge={<span className="badge badge-green">Diario</span>}
      description="Encontre quatro grupos secretos de jogadores com algo em comum. A nova tela privilegia leitura rapida, blocos encontrados e pressao visual quando voce erra."
      meta={['4 grupos de 4', 'Ate 4 erros', 'Selecione e confirme']}
      stats={[
        { label: 'Grupos fechados', value: foundGroups.length, tone: foundGroups.length >= 2 ? 'green' : 'default' },
        { label: 'Erros', value: errors, tone: errors >= 3 ? 'danger' : errors > 0 ? 'yellow' : 'default' },
        { label: 'Restantes', value: remainingLives, tone: remainingLives <= 1 && gameState === 'playing' ? 'danger' : 'default' },
      ]}
      asideTitle="Leitura de dificuldade"
      asideDescription="Cada grupo encontrado sobe para o topo e limpa o tabuleiro. O lado direito explica o grau de risco de cada cor."
      asideNotes={[
        { title: 'Amarelo', text: 'Grupo mais direto, geralmente com relacao mais obvia.' },
        { title: 'Azul e roxo', text: 'Entram quando o jogo quer testar repertorio e leitura fina.' },
        { title: 'Quatro exatos', text: 'So vale confirmar quando tiver exatamente quatro nomes selecionados.' },
      ]}
    >
      <div className="game-stage">
        <div className="game-stage__main">
          {foundGroups.length > 0 ? (
            <section className="game-panel game-panel--soft">
              <p className="game-panel__eyebrow">Grupos encontrados</p>
              <div className="game-stack">
                {foundGroups.map((group) => {
                  const style = DIFF_STYLE[group.difficulty]
                  return (
                    <div
                      key={group.category}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 18,
                        background: style.bg,
                        border: `1px solid ${style.border}`,
                      }}
                    >
                      <p style={{ color: style.text, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>
                        {group.category}
                      </p>
                      <p style={{ color: 'var(--color-text)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                        {group.players.join(' · ')}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>
          ) : null}

          <section className="game-panel">
            <p className="game-panel__eyebrow">Tabuleiro de nomes</p>
            {gameState !== 'lost' && shuffledPlayers.length > 0 ? (
              <div className="connections-grid" style={{ animation: shaking ? 'shake 0.45s ease' : undefined }}>
                {shuffledPlayers.map((player) => {
                  const isSelected = selected.includes(player)
                  return (
                    <button
                      key={player}
                      onClick={() => toggleSelect(player)}
                      className="connections-grid__tile"
                      style={{
                        border: `1px solid ${isSelected ? 'rgba(255,194,71,0.45)' : 'rgba(154,176,190,0.16)'}`,
                        background: isSelected ? 'rgba(255,194,71,0.12)' : 'rgba(6,18,28,0.78)',
                        color: isSelected ? 'var(--color-brand-yellow)' : 'var(--color-text)',
                        cursor: 'pointer',
                        transition: 'transform 0.14s ease, border-color 0.14s ease, background 0.14s ease',
                        transform: isSelected ? 'translateY(-1px)' : 'translateY(0)',
                      }}
                    >
                      {player}
                    </button>
                  )
                })}
              </div>
            ) : null}

            {gameState === 'playing' ? (
              <div className="game-actions" style={{ marginTop: 18 }}>
                <button onClick={() => setSelected([])} disabled={selected.length === 0} className="btn-ghost" style={{ flex: 1, opacity: selected.length === 0 ? 0.45 : 1 }}>
                  Limpar
                </button>
                <button onClick={submit} disabled={selected.length !== 4} className="btn-primary" style={{ flex: 1.4, opacity: selected.length !== 4 ? 0.55 : 1 }}>
                  Confirmar {selected.length}/4
                </button>
              </div>
            ) : null}
          </section>

          {gameState === 'lost' && unfoundGroups.length > 0 ? (
            <section className="game-panel game-panel--danger">
              <p className="game-panel__eyebrow">Grupos que faltaram</p>
              <div className="game-stack">
                {unfoundGroups.map((group) => {
                  const style = DIFF_STYLE[group.difficulty]
                  return (
                    <div key={group.category} style={{ padding: '14px 16px', borderRadius: 18, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.16)' }}>
                      <p style={{ color: style.text, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>
                        {group.category}
                      </p>
                      <p style={{ color: 'var(--color-text)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                        {group.players.join(' · ')}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>
          ) : null}

          {(gameState === 'won' || gameState === 'lost') ? (
            <section className={`game-panel ${gameState === 'won' ? 'game-panel--success' : 'game-panel--danger'}`}>
              <p className="game-panel__eyebrow">Resultado final</p>
              <h2 className="game-panel__title">
                {gameState === 'won'
                  ? errors === 0
                    ? 'Leitura perfeita.'
                    : errors === 1
                      ? 'Acertou com sobras.'
                      : 'Conseguiu fechar.'
                  : 'Hoje escapou no detalhe.'}
              </h2>
              <p className="game-panel__copy">
                {gameState === 'won'
                  ? `${errors} erro${errors !== 1 ? 's' : ''}. ${scoreRegistered ? 'Pontuacao registrada. ' : ''}A proxima grade chega amanha.`
                  : `${foundGroups.length}/4 grupos encontrados. ${scoreRegistered ? 'Pontuacao registrada. ' : ''}Volta no proximo desafio.`}
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
            <p className="game-panel__eyebrow">Pressao da rodada</p>
            <div className="game-stack">
              <div className={`game-status-banner ${remainingLives <= 1 && gameState === 'playing' ? 'game-status-banner--danger' : 'game-status-banner--success'}`}>
                {remainingLives > 0
                  ? `${remainingLives} margem${remainingLives !== 1 ? 'ens' : ''} antes de revelar tudo.`
                  : 'Sem margem restante.'}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <span
                    key={index}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      background: index < errors ? '#f87171' : 'rgba(154,176,190,0.22)',
                      border: `1px solid ${index < errors ? 'rgba(239,68,68,0.5)' : 'rgba(154,176,190,0.18)'}`,
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="game-panel game-panel--soft">
            <p className="game-panel__eyebrow">Escala de cores</p>
            <div className="game-legend-list">
              {Object.entries(DIFF_STYLE).map(([difficulty, style]) => (
                <div key={difficulty} className="game-legend-item">
                  <span className="game-legend-swatch" style={{ background: style.text }} />
                  <span>
                    <strong style={{ color: 'var(--color-text)' }}>{difficulty}</strong> · {style.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </GamePageShell>
  )
}
