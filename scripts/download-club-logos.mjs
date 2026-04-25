// Script para baixar logos de clubes via TheSportsDB (API gratuita)
// Uso: node scripts/download-club-logos.mjs

import { createWriteStream, mkdirSync, existsSync } from 'fs'
import { pipeline } from 'stream/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'clubs')

mkdirSync(OUT_DIR, { recursive: true })

// Mapeamento: nome no jogo → nome de busca no TheSportsDB
const CLUB_SEARCH_MAP = {
  'Ajax': 'Ajax',
  'Al-Hilal': 'Al-Hilal',
  'Al-Ittihad': 'Al-Ittihad',
  'Arsenal': 'Arsenal',
  'Aston Villa': 'Aston Villa',
  'Atletico Madrid': 'Atletico Madrid',
  'Atletico Mineiro': 'Atletico Mineiro',
  'Atletico Paranaense': 'Athletico Paranaense',
  'Barcelona': 'FC Barcelona',
  'Bayer Leverkusen': 'Bayer Leverkusen',
  'Bayern': 'Bayern Munich',
  'Benfica': 'Benfica',
  'Chelsea': 'Chelsea',
  'Corinthians': 'Corinthians',
  'Cruzeiro': 'Cruzeiro',
  'Deportivo': 'Deportivo La Coruna',
  'Everton': 'Everton',
  'FC Porto': 'FC Porto',
  'Fenerbahce': 'Fenerbahce',
  'Figueirense': 'Figueirense',
  'Fiorentina': 'Fiorentina',
  'Flamengo': 'Flamengo',
  'Fluminense': 'Fluminense',
  'Fulham': 'Fulham',
  'Galatasaray': 'Galatasaray',
  'Genoa': 'Genoa',
  'Gremio': 'Gremio',
  'Hebei CFFC': 'Hebei China Fortune',
  'Inter': 'Internazionale',
  'Internacional': 'Internacional',
  'Jubilo Iwata': 'Jubilo Iwata',
  'Juventus': 'Juventus',
  'Lazio': 'Lazio',
  'Leeds': 'Leeds United',
  'Levski Sofia': 'Levski Sofia',
  'Liverpool': 'Liverpool',
  'Lyon': 'Olympique Lyonnais',
  'Manchester City': 'Manchester City',
  'Manchester United': 'Manchester United',
  'Marseille': 'Olympique Marseille',
  'Milan': 'AC Milan',
  'Monaco': 'AS Monaco',
  'New York RB': 'New York Red Bulls',
  'Newcastle': 'Newcastle United',
  'Nottingham': 'Nottingham Forest',
  'Orlando City': 'Orlando City SC',
  'PSG': 'Paris Saint-Germain',
  'PSV': 'PSV Eindhoven',
  'Pafos FC': 'Pafos FC',
  'Palmeiras': 'Palmeiras',
  'Panathinaikos': 'Panathinaikos',
  'Parma': 'Parma',
  'Porto': 'FC Porto',
  'QPR': 'Queens Park Rangers',
  'Real Betis': 'Real Betis',
  'Real Madrid': 'Real Madrid',
  'Rennes': 'Stade Rennais',
  'Roma': 'AS Roma',
  'Santos': 'Santos',
  'Sao Paulo': 'Sao Paulo',
  'Shakhtar': 'Shakhtar Donetsk',
  'Shanghai SIPG': 'Shanghai Port',
  'Stuttgart': 'VfB Stuttgart',
  'Torino': 'Torino',
  'Toronto': 'Toronto FC',
  'Tottenham': 'Tottenham Hotspur',
  'Valencia': 'Valencia',
  'Vasco': 'Vasco da Gama',
  'Vitoria': 'Vitoria',
  'Watford': 'Watford',
  'West Ham': 'West Ham United',
  'Zamalek SC': 'Zamalek',
  'Zaragoza': 'Real Zaragoza',
  'Zenit': 'Zenit Saint Petersburg',
}

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function downloadImage(url, destPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  await pipeline(res.body, createWriteStream(destPath))
}

async function getLogoUrl(searchName) {
  const encoded = encodeURIComponent(searchName)
  const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encoded}`
  const data = await fetchJSON(url)
  if (!data.teams || data.teams.length === 0) return null
  return data.teams[0].strBadge || null
}

async function processClub(gameName, searchName) {
  const filename = `${slug(gameName)}.png`
  const destPath = path.join(OUT_DIR, filename)

  if (existsSync(destPath)) {
    console.log(`✓ ${gameName} (já existe)`)
    return { gameName, filename, ok: true }
  }

  try {
    const logoUrl = await getLogoUrl(searchName)
    if (!logoUrl) {
      console.log(`✗ ${gameName} — não encontrado`)
      return { gameName, filename: null, ok: false }
    }

    // TheSportsDB retorna PNG, adiciona /preview para menor tamanho
    const imgUrl = logoUrl.endsWith('/preview') ? logoUrl : `${logoUrl}/preview`
    await downloadImage(imgUrl, destPath)
    console.log(`↓ ${gameName}`)
    return { gameName, filename, ok: true }
  } catch (err) {
    console.log(`✗ ${gameName} — ${err.message}`)
    return { gameName, filename: null, ok: false }
  }
}

// Processa em paralelo com concorrência limitada
async function runWithConcurrency(tasks, limit) {
  const results = []
  for (let i = 0; i < tasks.length; i += limit) {
    const batch = tasks.slice(i, i + limit)
    const batchResults = await Promise.all(batch.map(t => t()))
    results.push(...batchResults)
    // Pequeno delay entre batches para não sobrecarregar a API
    if (i + limit < tasks.length) await new Promise(r => setTimeout(r, 400))
  }
  return results
}

const tasks = Object.entries(CLUB_SEARCH_MAP).map(
  ([gameName, searchName]) => () => processClub(gameName, searchName)
)

console.log(`Baixando logos de ${tasks.length} clubes...\n`)
const results = await runWithConcurrency(tasks, 4)

const ok = results.filter(r => r.ok)
const fail = results.filter(r => !r.ok)

console.log(`\n✅ ${ok.length} baixados`)
if (fail.length > 0) {
  console.log(`❌ ${fail.length} falhos: ${fail.map(r => r.gameName).join(', ')}`)
}

// Gera o mapeamento para colar em carreira-data.ts
console.log('\n// Cole em carreira-data.ts:')
console.log('export const CLUB_LOGOS: Record<string, string> = {')
for (const r of results) {
  if (r.ok) {
    console.log(`  '${r.gameName}': '/images/clubs/${r.filename}',`)
  }
}
console.log('}')
