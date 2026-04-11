/**
 * Gera schedule do Quem é o Craque com todos os 161 jogadores únicos
 * De 2026-04-09 até 2026-12-31 = 266 dias
 * 161 jogadores: primeira passagem completa, depois segunda passagem embaralhada
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../lib/games/players-db.ts')

// Extrai todos os IDs que têm imageUrl E hints
const content = fs.readFileSync(dbPath, 'utf-8')
const allWithBoth = []

for (const match of content.matchAll(/\{ id: '([^']+)',[^}]+imageUrl:[^}]+hints:/g)) {
  allWithBoth.push(match[1])
}
// Também captura ordem imageUrl antes de hints
for (const match of content.matchAll(/\{ id: '([^']+)',[^}]+hints:[^}]+imageUrl:/g)) {
  if (!allWithBoth.includes(match[1])) allWithBoth.push(match[1])
}

console.log('Jogadores disponíveis:', allWithBoth.length)

// Tiers: top (muito famosos), mid (famosos), semi (menos conhecidos)
const TOP = ['messi','cristiano','pele','ronaldinho','ronaldo-fenomeno','zidane','beckham','cruyff',
  'maldini','buffon','van-basten','gullit','kaka','henry','ribery','ronaldo-fenomeno']
const MID = ['neymar','haaland','mbappe','salah','modric','vinicius','benzema','xavi','iniesta',
  'ramos','cafu','roberto-carlos','zico','rivaldo','romario','drogba','suarez','lewandowski',
  'ibrahimovic','tevez','griezmann','rooney','gerrard','lampard','beckenbauer','scholes','giggs',
  'shearer','del-piero','cannavaro','nesta','baggio','totti','pirlo','sneijder','bergkamp',
  'robben','de-bruyne','hazard','platini','vieira','eusebio','matthaus','klose']

// Fisher-Yates com seed
function seededShuffle(arr, seed) {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Remove duplicatas mantendo ordem
const available = [...new Set(allWithBoth)]
console.log('Únicos disponíveis:', available.length)

// Embaralha em 3 grupos: top, mid, rest - misturados
const top = available.filter(id => TOP.includes(id))
const mid = available.filter(id => MID.includes(id) && !TOP.includes(id))
const rest = available.filter(id => !TOP.includes(id) && !MID.includes(id))

console.log('Top:', top.length, '| Mid:', mid.length, '| Rest:', rest.length)

// Embaralha cada grupo com seeds diferentes
const topShuffled = seededShuffle(top, 42)
const midShuffled = seededShuffle(mid, 137)
const restShuffled = seededShuffle(rest, 999)

// Intercala: 1 top, 2 mid, 3 rest, repetindo
function interleave(...arrays) {
  const result = []
  const iters = arrays.map(a => [...a])
  while (iters.some(a => a.length > 0)) {
    for (const arr of iters) {
      if (arr.length > 0) result.push(arr.shift())
    }
  }
  return result
}

// Primeira passagem: intercala todos os 161
const firstPass = interleave(topShuffled, midShuffled, midShuffled.slice(), restShuffled, restShuffled.slice())
// Remove duplicatas mantendo primeira ocorrência
const seen = new Set()
const firstPassUnique = []
for (const id of firstPass) {
  if (!seen.has(id)) { seen.add(id); firstPassUnique.push(id) }
}

console.log('Primeira passagem única:', firstPassUnique.length)

// Segunda passagem: embaralha novamente com seed diferente
const secondPass = seededShuffle(available, 2718)

// Gera datas de 2026-04-09 até 2026-12-31
function getDates(start, end) {
  const dates = []
  const cur = new Date(start)
  const endDate = new Date(end)
  while (cur <= endDate) {
    dates.push(cur.toISOString().split('T')[0])
    cur.setDate(cur.getDate() + 1)
  }
  return dates
}

const dates = getDates('2026-04-09', '2026-12-31')
console.log('Dias no schedule:', dates.length)

// Combina as duas passagens para cobrir todos os dias
const fullSequence = [...firstPassUnique, ...secondPass]
const schedule = {}
for (let i = 0; i < dates.length; i++) {
  schedule[dates[i]] = fullSequence[i % fullSequence.length]
}

// Gera o código TypeScript
const entries = Object.entries(schedule).map(([date, id]) => `  '${date}': '${id}',`).join('\n')
const code = `// Schedule fixo até 31/12/2026 — ${dates.length} dias, ${available.length} jogadores únicos\nconst DAILY_SCHEDULE: Record<string, string> = {\n${entries}\n}`

console.log('\nPrimeiras 5 entradas:')
Object.entries(schedule).slice(0, 5).forEach(([d, id]) => console.log(' ', d, '->', id))
console.log('...')
console.log('Últimas 5:')
Object.entries(schedule).slice(-5).forEach(([d, id]) => console.log(' ', d, '->', id))

// Salva o código gerado
fs.writeFileSync(path.join(__dirname, 'craque-schedule-output.ts'), code)
console.log('\nSalvo em scripts/craque-schedule-output.ts')
