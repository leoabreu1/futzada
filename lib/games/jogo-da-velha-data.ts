import { PLAYERS_DB, type Player } from './players-db'
export type { Player }

export type Category = {
  id: string
  label: string
  match: (player: Player) => boolean
}

// Re-exporta PLAYERS do banco central
export const PLAYERS = PLAYERS_DB

export const CATEGORIES: Category[] = [
  { id: 'br', label: 'Brasileiro', match: (p) => p.nationality === 'Brasil' },
  { id: 'arg', label: 'Argentino', match: (p) => p.nationality === 'Argentina' },
  { id: 'fra', label: 'Frances', match: (p) => p.nationality === 'Franca' },
  { id: 'esp', label: 'Espanhol', match: (p) => p.nationality === 'Espanha' },
  { id: 'ing', label: 'Ingles', match: (p) => p.nationality === 'Inglaterra' },
  { id: 'ata', label: 'Atacante', match: (p) => p.position === 'ATA' },
  { id: 'mei', label: 'Meia', match: (p) => p.position === 'MEI' },
  { id: 'zag', label: 'Zagueiro', match: (p) => p.position === 'ZAG' },
  { id: 'gol', label: 'Goleiro', match: (p) => p.position === 'GOL' },
  { id: 'vol', label: 'Volante', match: (p) => p.position === 'VOL' },
  { id: 'lat', label: 'Lateral', match: (p) => p.position === 'LAT' },
  { id: 'laliga', label: 'La Liga', match: (p) => p.league.includes('La Liga') },
  { id: 'pl', label: 'Premier League', match: (p) => p.league.includes('Premier League') },
  { id: 'ligue1', label: 'Ligue 1', match: (p) => p.league.includes('Ligue 1') },
  { id: 'seriea', label: 'Serie A', match: (p) => p.league.includes('Serie A') },
  { id: 'bundesliga', label: 'Bundesliga', match: (p) => p.league.includes('Bundesliga') },
  { id: 'brasileirao', label: 'Brasileirao', match: (p) => p.league.includes('Brasileirao') },
  { id: 'realmadrid', label: 'Real Madrid', match: (p) => p.clubs.includes('Real Madrid') },
  { id: 'barcelona', label: 'Barcelona', match: (p) => p.clubs.includes('Barcelona') },
  { id: 'psg', label: 'PSG', match: (p) => p.clubs.includes('PSG') },
  { id: 'liverpool', label: 'Liverpool', match: (p) => p.clubs.includes('Liverpool') },
  { id: 'mancity', label: 'Manchester City', match: (p) => p.clubs.includes('Manchester City') },
  { id: 'bayernm', label: 'Bayern Munich', match: (p) => p.clubs.includes('Bayern') },
  { id: 'juventus', label: 'Juventus', match: (p) => p.clubs.includes('Juventus') },
  { id: 'legend', label: 'Lenda', match: (p) => !!p.isLegend },
]

// Filtra categorias que têm pelo menos 3 jogadores válidos em combinação com outras
function getCategoriesWithEnoughPlayers(): Category[] {
  return CATEGORIES.filter(cat => {
    const count = PLAYERS.filter(p => cat.match(p)).length
    return count >= 3
  })
}

// Gera grid 3x3 diário — garante que cada célula tem pelo menos 1 jogador válido
export function getDailyGrid(): { rows: Category[]; cols: Category[] } {
  const today = new Date().toISOString().split('T')[0]
  let seed = today.split('-').reduce((acc, n) => acc + parseInt(n), 0)

  const rng = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }

  const validCats = getCategoriesWithEnoughPlayers()

  const shuffle = (arr: Category[]) => {
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  // Tenta encontrar combinações válidas (cada interseção tem ao menos 1 jogador)
  for (let attempt = 0; attempt < 20; attempt++) {
    const shuffled = shuffle(validCats)
    const rows = shuffled.slice(0, 3)
    const cols = shuffled.slice(3, 6)

    const allValid = rows.every(r =>
      cols.every(c => PLAYERS.filter(p => r.match(p) && c.match(p)).length >= 1)
    )

    if (allValid) return { rows, cols }
    // Muda seed ligeiramente para próxima tentativa
    seed = (seed + attempt * 7919) & 0x7fffffff
  }

  // Fallback seguro: posições x ligas
  return {
    rows: [
      CATEGORIES.find(c => c.id === 'ata')!,
      CATEGORIES.find(c => c.id === 'mei')!,
      CATEGORIES.find(c => c.id === 'zag')!,
    ],
    cols: [
      CATEGORIES.find(c => c.id === 'br')!,
      CATEGORIES.find(c => c.id === 'pl')!,
      CATEGORIES.find(c => c.id === 'laliga')!,
    ],
  }
}

export function getValidPlayers(rowCat: Category, colCat: Category): Player[] {
  return PLAYERS.filter((p) => rowCat.match(p) && colCat.match(p))
}
