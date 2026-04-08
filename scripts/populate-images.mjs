#!/usr/bin/env node

/**
 * Script para popular imageUrl dos jogadores via Transfermarkt
 * Usa IDs do Transfermarkt (extraído de URLs públicas)
 * Formato: https://img.a.transfermarkt.technology/portrait/header/{ID}-{TIMESTAMP}.jpg
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../lib/games/players-db.ts')

// Mapping de IDs Transfermarkt (públicos, sem API)
// Formato: { id_jogador: 'id_transfermarkt' }
const TRANSFERMARKT_IDS = {
  'thiago-silva': '44819',
  'casemiro': '50679',
  'neymar': '68702',
  'vinicius-jr': '342229',
  'rodri': '446514',
  'bellingham': '595223',
  'messi': '28003',
  'cristiano': '5885',
  'mbappe': '342229',
  'haaland': '418735',
  'kane': '38253',
  'benzema': '14210',
  'modric': '17905',
  'iniesta': '14275',
  'xavi': '7572',
  'busquets': '87533',
  'pique': '23657',
  'ramos': '44768',
  'ronaldinho': '6479',
  'ronaldo': '6426',
  'pele': '58',
  'maradona': '32872',
  'carlos-alberto': '31949',
  'zidane': '7572',
  'raul': '8451',
  'shevchenko': '5617',
  'nedved': '8247',
  'figo': '8209',
  'van-basten': '5618',
  'van-dijk': '203114',
  'salah': '148455',
  'alisson': '182506',
  'ederson': '233453',
  'kylian-mbappe': '342229',
  'haaland-erling': '418735',
  'vinícius': '342229',
  'rodrygo': '530697',
  'bellingham-jude': '595223',
  'vini': '342229',
  'lewa': '8044',
  'suarez': '176580',
  'griezmann': '125243',
  'cavani': '40373',
  'lewandowski': '8044',
  'higuain': '95012',
  'dybala': '206050',
}

// Função para gerar URL do Transfermarkt
function getTransfermarktImageUrl(id) {
  if (!id) return null
  const timestamp = Math.floor(Date.now() / 1000)
  return `https://img.a.transfermarkt.technology/portrait/header/${id}-${timestamp}.jpg`
}

// Função para extrair ID do Transfermarkt (fallback com busca)
function findTransfermarktId(playerName, position) {
  const normalized = playerName.toLowerCase().replace(/\s+/g, '-')
  return TRANSFERMARKT_IDS[normalized] || TRANSFERMARKT_IDS[playerName.toLowerCase()] || null
}

// Lê o arquivo
let content = fs.readFileSync(dbPath, 'utf-8')

// Regex para encontrar cada jogador
const playerRegex = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]\s*,\s*surname:\s*['"]([^'"]+)['"]\s*,\s*nationality:\s*['"]([^'"]+)['"]\s*,\s*position:\s*['"](\w+)['"]\s*,.*?(?=\n\s*\})|(?=\n\s*//)/gs

let updated = 0
let skipped = 0

// Para cada jogador, tenta encontrar e adicionar imageUrl
const newContent = content.replace(playerRegex, (match) => {
  const idMatch = match.match(/id:\s*['"]([^'"]+)['"]/)
  const nameMatch = match.match(/name:\s*['"]([^'"]+)['"]/)
  const posMatch = match.match(/position:\s*['"](\w+)['"]/)

  if (!idMatch || !nameMatch || !posMatch) return match

  const playerId = idMatch[1]
  const playerName = nameMatch[1]
  const position = posMatch[1]

  // Já tem imageUrl?
  if (match.includes('imageUrl:')) {
    skipped++
    return match
  }

  // Busca ID do Transfermarkt
  const tmId = findTransfermarktId(playerName, position)
  if (!tmId) {
    skipped++
    return match
  }

  const imageUrl = getTransfermarktImageUrl(tmId)

  // Adiciona imageUrl antes do último }
  const updated_match = match.replace(/(\s*)\}$/, `, imageUrl: '${imageUrl}' }`)
  updated++

  return updated_match
})

// Escreve de volta
fs.writeFileSync(dbPath, newContent, 'utf-8')

console.log(`✓ Script executado!`)
console.log(`  • ${updated} jogadores atualizados`)
console.log(`  • ${skipped} ignorados (já têm imageUrl ou ID não encontrado)`)
console.log(`\nPróximo passo: Adicione manualmente os IDs do Transfermarkt em TRANSFERMARKT_IDS`)
console.log(`para mais jogadores. Você pode extrair IDs de: https://transfermarkt.com/`)
