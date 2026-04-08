#!/usr/bin/env node

/**
 * Script para adicionar hints automaticamente aos jogadores
 * Gera 3 dicas padrão baseado na posição, nacionalidade e clubes
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../lib/games/players-db.ts')

function generateHints(player) {
  const hints = []

  // Dica 1: Posição
  const positionHints = {
    'GOL': 'Goleiro da seleção brasileira',
    'ZAG': 'Zagueiro que defendeu muitos times',
    'LAT': 'Lateral rápido que subiu o campo',
    'VOL': 'Volante defensivo do meio',
    'MEI': 'Meia criativo que faz assistências',
    'ATA': 'Atacante marcador de gols',
  }
  hints.push(positionHints[player.position])

  // Dica 2: Clube mais famoso
  if (player.clubs.length > 0) {
    const famouClub = player.clubs[Math.min(1, player.clubs.length - 1)] // geralmente o 2º clube
    hints.push(`Jogou pelo ${famouClub}`)
  }

  // Dica 3: Nacionalidade
  hints.push(`Jogador da seleção ${player.nationality}`)

  return hints
}

// Lê o arquivo
let content = fs.readFileSync(dbPath, 'utf-8')

// Regex para encontrar jogadores SEM hints
const playerRegex = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]\s*,\s*surname:\s*['"]([^'"]+)['"]\s*,\s*nationality:\s*['"]([^'"]+)['"]\s*,\s*position:\s*['"](\w+)['"]\s*,\s*clubs:\s*\[([^\]]+)\][^}]*(?!hints:)[^}]*\}/g

let updated = 0

const newContent = content.replace(playerRegex, (match) => {
  // Se já tem hints, ignora
  if (match.includes('hints:')) {
    return match
  }

  // Extrai dados do jogador
  const idMatch = match.match(/id:\s*['"]([^'"]+)['"]/)
  const nameMatch = match.match(/name:\s*['"]([^'"]+)['"]/)
  const posMatch = match.match(/position:\s*['"](\w+)['"]/)
  const natMatch = match.match(/nationality:\s*['"]([^'"]+)['"]/)
  const clubsMatch = match.match(/clubs:\s*\[([^\]]+)\]/)

  if (!idMatch || !nameMatch) return match

  const player = {
    id: idMatch[1],
    name: nameMatch[1],
    position: posMatch ? posMatch[1] : 'MEI',
    nationality: natMatch ? natMatch[1] : 'Brasil',
    clubs: clubsMatch ? clubsMatch[1].split(',').map(c => c.trim().replace(/['"]/g, '')) : [],
  }

  const hints = generateHints(player)
  const hintsStr = JSON.stringify(hints)

  // Adiciona hints antes do último }
  const updated_match = match.replace(/(\s*)\}$/, `, hints: ${hintsStr} }`)
  updated++

  return updated_match
})

// Escreve de volta
fs.writeFileSync(dbPath, newContent, 'utf-8')

console.log(`✓ Script executado!`)
console.log(`  • ${updated} jogadores atualizados com hints automaticamente`)
