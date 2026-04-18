// Hook para registrar scores nos jogos
// - Se logado: salva no banco via API
// - Se não logado: silenciosamente ignora (não aparece no ranking global)

import { useSession } from 'next-auth/react'
import { calculateTimelinePoints } from '@/lib/games/linha-do-tempo-data'
import { calculateConexoesPoints } from '@/lib/games/conexoes-data'

type GameType = 'wordle' | 'jogo-da-velha' | 'quem-e-o-craque' | 'linha-do-tempo' | 'conexoes'

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0] // YYYY-MM-DD
}

function calcPoints(gameType: GameType, won: boolean, attempts: number): number {
  if (gameType === 'linha-do-tempo') return calculateTimelinePoints(attempts, won)
  if (gameType === 'conexoes') return calculateConexoesPoints(attempts, won)

  const config: Record<string, { base: number; deduction: number }> = {
    wordle:           { base: 100, deduction: 10 },
    'jogo-da-velha':  { base: 100, deduction: 5 },
    'quem-e-o-craque':{ base: 100, deduction: 15 },
  }

  const { base, deduction } = config[gameType]
  return won ? Math.max(10, base - attempts * deduction) : 0
}

export function useGameScore() {
  const { data: session } = useSession()

  const registerGameResult = async (
    gameType: GameType,
    won: boolean,
    attempts: number = 1
  ) => {
    if (!session?.user?.id) return // não logado, ignora silenciosamente

    const points = calcPoints(gameType, won, attempts)
    const date = getTodayDate()

    try {
      await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameType, points, attempts, won, date }),
      })
    } catch (err) {
      console.error('Erro ao registrar score:', err)
    }
  }

  return {
    isLoggedIn: !!session?.user,
    user: session?.user ?? null,
    registerGameResult,
  }
}
