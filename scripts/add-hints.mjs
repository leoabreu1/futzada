#!/usr/bin/env node

/**
 * Script para adicionar hints automaticamente aos jogadores
 * Baseado em: posição, nacionalidade, clubes históricos, títulos
 */

const HINTS_DB = {
  // Brasileiros Lendas
  'neymar': ['Começou no Santos aos 11 anos', 'Ganhou 2 Copa America pela seleção', 'Sempre usa cabelo colorido'],
  'ronaldo': ['Ganhou 2 Copas do Mundo', 'Teve uma grave lesão no joelho', 'Apelidado de "Fenômeno"'],
  'ronaldinho': ['Conhecido por seus dribles mágicos', 'Ganhou a Champions League pelo Barcelona', 'Apelidado "Ronaldinho Gaúcho"'],
  'pelé': ['Jogou pelo Santos e Cosmos', 'É considerado o "Rei do Futebol"', 'Ganhou 3 Copas do Mundo'],
  'maradona': ['Dono da mão de Deus contra a Inglaterra', 'Levou a Argentina à final em 1990', 'É argentino'],
  'zidane': ['Ganhou a Copa do Mundo de 1998', 'Fez gol de cabeça na Champions League', 'É francês'],
  'messi': ['Venceu a Copa do Mundo em 2022', 'Ganhou 8 Bolas de Ouro', 'Começou no Barcelona'],
  'cristiano': ['Português, nascido na Madeira', 'Ganhou 5 Bolas de Ouro', 'Marca muitos gols de cabeça'],
  'benzema': ['Ganhou 4 Champions League pelo Real Madrid', 'Francês que jogou na La Liga', 'Tetracampeão europeu'],
  'lewandowski': ['Polaco que marcou muitos gols', 'Ganhou a Champions League pelo Bayern', 'Atuou em 5 ligas diferentes'],

  // Brasileiros Atuais
  'vinicius-jr': ['Originário do Flamengo', 'Extremo rápido da esquerda', 'Ganhou a Champions League pelo Real Madrid'],
  'rodri': ['Meio-campista de defesa', 'Jogou pela Seleção Espanhola', 'Venceu a Euro 2024'],
  'bellingham': ['Chegou ao Real Madrid em 2023', 'Jovem talento inglês', 'Meia que gosta de atacar'],

  // Posições (fallback)
  'GOL': ['Defende o gol', 'Um dos únicos que pode usar as mãos', 'Essencial para não levar gols'],
  'ZAG': ['Zagueiro de defesa', 'Protege a área do próprio time', 'Geralmente o mais alto do time'],
  'LAT': ['Lateral que corre pelas laterais', 'Pode defender e atacar', 'Importante na criação do jogo'],
  'VOL': ['Volante de defesa', 'Fica entre a defesa e o ataque', 'Importante para recuperar a bola'],
  'MEI': ['Meia de criação', 'Distribui o jogo ofensivo', 'Responsável pelas assistências'],
  'ATA': ['Atacante que marca gols', 'Fica na frente do time', 'O "9" tradicional do futebol'],
}

// Mapeia características dos jogadores
const getHintsForPlayer = (player) => {
  const hints = HINTS_DB[player.id] || HINTS_DB[player.position] || []

  // Se não tem hints específicos, cria genéricos
  if (hints.length === 0) {
    return [
      `Jogador ${player.position === 'ATA' ? 'atacante' : 'de defesa'} ${player.nationality}`,
      `Jogou pelo ${player.clubs[0]}`,
      `Posição: ${player.position}`,
    ]
  }

  return hints.slice(0, 3) // Máximo 3 hints
}

export { getHintsForPlayer, HINTS_DB }
