// Script para popular localStorage com dados de exemplo
// Execute no console do navegador para testar o ranking

const mockScores = [
  // Jogador 1 - Craque
  { id: '1', playerId: 'leo', playerName: 'Leo Abreu', gameType: 'wordle', points: 90, attempts: 1, date: '2024-04-15' },
  { id: '2', playerId: 'leo', playerName: 'Leo Abreu', gameType: 'wordle', points: 80, attempts: 2, date: '2024-04-14' },
  { id: '3', playerId: 'leo', playerName: 'Leo Abreu', gameType: 'jogo-da-velha', points: 95, attempts: 1, date: '2024-04-15' },
  { id: '4', playerId: 'leo', playerName: 'Leo Abreu', gameType: 'quem-e-o-craque', points: 85, attempts: 1, date: '2024-04-15' },
  
  // Jogador 2
  { id: '5', playerId: 'carlos', playerName: 'Carlos Silva', gameType: 'wordle', points: 70, attempts: 3, date: '2024-04-15' },
  { id: '6', playerId: 'carlos', playerName: 'Carlos Silva', gameType: 'wordle', points: 60, attempts: 4, date: '2024-04-14' },
  { id: '7', playerId: 'carlos', playerName: 'Carlos Silva', gameType: 'jogo-da-velha', points: 85, attempts: 2, date: '2024-04-15' },
  
  // Jogador 3
  { id: '8', playerId: 'maria', playerName: 'Maria Santos', gameType: 'quem-e-o-craque', points: 70, attempts: 2, date: '2024-04-15' },
  { id: '9', playerId: 'maria', playerName: 'Maria Santos', gameType: 'quem-e-o-craque', points: 85, attempts: 1, date: '2024-04-14' },
  { id: '10', playerId: 'maria', playerName: 'Maria Santos', gameType: 'wordle', points: 75, attempts: 2, date: '2024-04-15' },
  
  // Jogador 4
  { id: '11', playerId: 'lucas', playerName: 'Lucas Costa', gameType: 'jogo-da-velha', points: 90, attempts: 1, date: '2024-04-15' },
  { id: '12', playerId: 'lucas', playerName: 'Lucas Costa', gameType: 'jogo-da-velha', points: 85, attempts: 2, date: '2024-04-14' },
  
  // Jogador 5
  { id: '13', playerId: 'ana', playerName: 'Ana Oliveira', gameType: 'wordle', points: 55, attempts: 5, date: '2024-04-15' },
  { id: '14', playerId: 'ana', playerName: 'Ana Oliveira', gameType: 'quem-e-o-craque', points: 40, attempts: 4, date: '2024-04-15' },
]

export function seedMockData() {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('futzada-scores', JSON.stringify(mockScores))
  localStorage.setItem('futzada-player-id', 'leo')
  localStorage.setItem('futzada-player-name', 'Leo Abreu')
  
  console.log('✅ Dados de exemplo carregados!')
  console.log('Acesse http://localhost:3000/ranking para ver o leaderboard')
}

// Export para uso no console
if (typeof window !== 'undefined') {
  (window as any).seedFutzadaMockData = seedMockData
}
