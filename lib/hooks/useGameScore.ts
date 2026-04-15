// Hook para integrar ranking com os games
// Pode ser usado em qualquer página de jogo para registrar scores

import { useRankingStorage } from '@/lib/hooks/useRankingStorage'
import { useEffect, useState } from 'react'

export function useGameScore() {
  const { addScore } = useRankingStorage()
  const [playerId, setPlayerId] = useState<string>('')
  const [playerName, setPlayerName] = useState<string>('Jogador')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedName = localStorage.getItem('futzada-player-name')
    if (savedName) setPlayerName(savedName)

    const savedId = localStorage.getItem('futzada-player-id')
    if (savedId) setPlayerId(savedId)
  }, [])

  const registerGameResult = (
    gameType: 'wordle' | 'jogo-da-velha' | 'quem-e-o-craque' | 'linha-do-tempo',
    won: boolean,
    attempts: number = 1
  ) => {
    if (!playerId) return

    // Sistema de pontos:
    // Wordle: 100 - (tentativas * 10)
    // Jogo da Velha: 100 - (tentativas * 5)
    // Quem é o Craque: 100 - (tentativas * 15)

    let basePoints = 0
    let pointDeduction = 0

    if (gameType === 'wordle') {
      basePoints = 100
      pointDeduction = 10
    } else if (gameType === 'jogo-da-velha') {
      basePoints = 100
      pointDeduction = 5
    } else if (gameType === 'quem-e-o-craque') {
      basePoints = 100
      pointDeduction = 15
    }

    const points = won ? Math.max(10, basePoints - attempts * pointDeduction) : 0

    return addScore(gameType, points, attempts, playerName, playerId)
  }

  return {
    playerId,
    playerName,
    setPlayerName,
    registerGameResult,
  }
}
