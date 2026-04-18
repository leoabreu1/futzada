'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Score, PlayerRanking, Badge } from '@/lib/types/ranking'
import { BADGES } from '@/lib/types/ranking'

const SCORES_STORAGE_KEY = 'futzada-scores'

export function useRankingStorage() {
  const [scores, setScores] = useState<Score[]>([])
  const [loaded, setLoaded] = useState(false)

  // Carregar scores do localStorage ao iniciar
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem(SCORES_STORAGE_KEY)
      if (saved) {
        setScores(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Erro ao carregar scores:', error)
    }
    setLoaded(true)
  }, [])

  // Salvar score quando um jogo termina
  const addScore = useCallback((
    gameType: 'wordle' | 'jogo-da-velha' | 'quem-e-o-craque' | 'linha-do-tempo' | 'conexoes',
    points: number,
    attempts: number = 1,
    playerName: string = 'Anônimo',
    playerId: string = generatePlayerId()
  ) => {
    const newScore: Score = {
      id: `${Date.now()}-${Math.random()}`,
      playerId,
      playerName,
      gameType,
      points,
      attempts,
      date: new Date().toISOString().split('T')[0],
    }

    setScores(prev => {
      const updated = [...prev, newScore]
      try {
        localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.error('Erro ao salvar scores:', error)
      }
      return updated
    })

    return newScore
  }, [])

  // Obter ranking agregado por jogador
  const getRanking = useCallback((): PlayerRanking[] => {
    const playerMap = new Map<string, PlayerRanking>()

    scores.forEach((score) => {
      if (!playerMap.has(score.playerId)) {
        playerMap.set(score.playerId, {
          playerId: score.playerId,
          playerName: score.playerName,
          playerAvatar: score.playerAvatar,
          totalPoints: 0,
          gamesPlayed: 0,
          gameBreakdown: {
            wordle: 0,
            'jogo-da-velha': 0,
            'quem-e-o-craque': 0,
            'linha-do-tempo': 0,
            conexoes: 0,
          },
          badges: [],
          streak: 0,
          lastPlayedDate: '',
        })
      }

      const player = playerMap.get(score.playerId)!
      player.totalPoints += score.points
      player.gamesPlayed += 1
      player.gameBreakdown[score.gameType] += 1
      player.lastPlayedDate = score.date

      // Calcular streak (dias consecutivos jogando)
      // TODO: Implementar lógica de streak
    })

    // Adicionar badges baseado em conquistas
    playerMap.forEach((player) => {
      const badges: Badge[] = []

      if (player.gamesPlayed >= 1) {
        badges.push({ ...BADGES.FIRST_WIN, earnedDate: new Date().toISOString() })
      }
      if (player.gameBreakdown.wordle >= 10) {
        badges.push({ ...BADGES.WORDLE_MASTER, earnedDate: new Date().toISOString() })
      }
      if (player.gameBreakdown['quem-e-o-craque'] >= 10) {
        badges.push({ ...BADGES.CRAQUE_EXPERT, earnedDate: new Date().toISOString() })
      }
      if (player.gameBreakdown['jogo-da-velha'] >= 10) {
        badges.push({ ...BADGES.GRID_MASTER, earnedDate: new Date().toISOString() })
      }

      player.badges = badges
    })

    // Ordenar por pontos
    return Array.from(playerMap.values()).sort((a, b) => b.totalPoints - a.totalPoints)
  }, [scores])

  return {
    scores,
    loaded,
    addScore,
    getRanking,
  }
}

function generatePlayerId(): string {
  if (typeof window === 'undefined') return 'server-' + Math.random()

  let playerId = localStorage.getItem('futzada-player-id')
  if (!playerId) {
    playerId = 'player-' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('futzada-player-id', playerId)
  }
  return playerId
}
