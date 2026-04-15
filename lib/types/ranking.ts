// Tipos para o sistema de ranking
export type Score = {
  id: string
  playerId: string
  playerName: string
  playerAvatar?: string
  gameType: 'wordle' | 'jogo-da-velha' | 'quem-e-o-craque' | 'linha-do-tempo'
  points: number
  attempts: number
  date: string
}

export type PlayerRanking = {
  playerId: string
  playerName: string
  playerAvatar?: string
  totalPoints: number
  gamesPlayed: number
  gameBreakdown: {
    wordle: number
    'jogo-da-velha': number
    'quem-e-o-craque': number
    'linha-do-tempo': number
  }
  badges: Badge[]
  streak: number
  lastPlayedDate: string
}

export type Badge = {
  id: string
  name: string
  description: string
  icon: string
  earnedDate: string
}

export const BADGES = {
  FIRST_WIN: {
    id: 'first-win',
    name: 'Primeiro Acerto',
    description: 'Ganhou o primeiro jogo',
    icon: '🏆',
  },
  PERFECT_STREAK_5: {
    id: 'perfect-streak-5',
    name: 'Série de 5',
    description: 'Ganhou 5 jogos seguidos',
    icon: '🔥',
  },
  WORDLE_MASTER: {
    id: 'wordle-master',
    name: 'Mestre do Wordle',
    description: 'Ganhou 10 vezes no Wordle',
    icon: '🎯',
  },
  CRAQUE_EXPERT: {
    id: 'craque-expert',
    name: 'Perito em Craques',
    description: 'Ganhou 10 vezes em "Quem é o Craque?"',
    icon: '👁️',
  },
  GRID_MASTER: {
    id: 'grid-master',
    name: 'Mestre da Malha',
    description: 'Ganhou 10 vezes no Jogo da Velha',
    icon: '⚡',
  },
  TOP_10: {
    id: 'top-10',
    name: 'Top 10 Global',
    description: 'Entrou no Top 10 do ranking global',
    icon: '⭐',
  },
}
