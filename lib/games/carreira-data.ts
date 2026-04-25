import { PLAYERS_DB } from './players-db'
export { CLUB_LOGOS } from './club-logos'

export type CarreiraPlayer = {
  id: string
  name: string
  nationality: string
  position: string
  clubs: string[]
}

function dedupeClubs(clubs: string[]): string[] {
  const seen = new Set<string>()
  return clubs.filter(c => {
    const key = c.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export const CARREIRA_PLAYERS: CarreiraPlayer[] = PLAYERS_DB
  .filter(p => {
    const real = dedupeClubs(p.clubs.filter(c => c !== 'No team'))
    return real.length >= 3
  })
  .map(p => ({
    id: p.id,
    name: p.name,
    nationality: p.nationality,
    position: p.position,
    clubs: dedupeClubs(p.clubs.filter(c => c !== 'No team')),
  }))

const DAILY_SCHEDULE: Record<string, string> = {
  '2026-04-24': 'danilo',
  '2026-04-25': 'ronaldinho',
  '2026-04-26': 'thiago-silva',
  '2026-04-27': 'neymar',
  '2026-04-28': 'kaka',
  '2026-04-29': 'rivaldo',
  '2026-04-30': 'casemiro',
  '2026-05-01': 'coutinho',
  '2026-05-02': 'roberto-carlos',
  '2026-05-03': 'cafu',
  '2026-05-04': 'ronaldo-fenomeno',
  '2026-05-05': 'alex-sandro',
  '2026-05-06': 'alisson',
  '2026-05-07': 'hulk',
  '2026-05-08': 'hernanes',
  '2026-05-09': 'oscar',
  '2026-05-10': 'fabinho',
  '2026-05-11': 'filipe-luis',
  '2026-05-12': 'paqueta',
  '2026-05-13': 'richarlison',
  '2026-05-14': 'antony',
  '2026-05-15': 'gabriel-jesus',
  '2026-05-16': 'militao',
  '2026-05-17': 'aldair',
  '2026-05-18': 'lucio',
  '2026-05-19': 'romario',
  '2026-05-20': 'taffarel',
  '2026-05-21': 'renan-lodi',
  '2026-05-22': 'bremer',
  '2026-05-23': 'bruno-guimaraes',
  '2026-05-24': 'raphinha',
  '2026-05-25': 'marquinhos',
  '2026-05-26': 'dida',
  '2026-05-27': 'julio-cesar',
  '2026-05-28': 'david-luiz',
  '2026-05-29': 'juan',
  '2026-05-30': 'fred-br',
  '2026-05-31': 'dunga',
  '2026-06-01': 'gilberto-silva',
  '2026-06-02': 'ederson',
  '2026-06-03': 'danilo',
  '2026-06-04': 'thiago-silva',
  '2026-06-05': 'coutinho',
  '2026-06-06': 'ronaldinho',
  '2026-06-07': 'neymar',
  '2026-06-08': 'rivaldo',
  '2026-06-09': 'ronaldo-fenomeno',
  '2026-06-10': 'kaka',
  '2026-06-11': 'alex-sandro',
  '2026-06-12': 'hulk',
  '2026-06-13': 'filipe-luis',
  '2026-06-14': 'alisson',
  '2026-06-15': 'hernanes',
  '2026-06-16': 'oscar',
  '2026-06-17': 'fabinho',
  '2026-06-18': 'lucio',
  '2026-06-19': 'romario',
  '2026-06-20': 'cafu',
  '2026-06-21': 'roberto-carlos',
  '2026-06-22': 'casemiro',
  '2026-06-23': 'paqueta',
  '2026-06-24': 'richarlison',
  '2026-06-25': 'antony',
  '2026-06-26': 'gabriel-jesus',
  '2026-06-27': 'aldair',
  '2026-06-28': 'bremer',
  '2026-06-29': 'taffarel',
  '2026-06-30': 'renan-lodi',
  '2026-07-01': 'dida',
  '2026-07-02': 'julio-cesar',
  '2026-07-03': 'david-luiz',
  '2026-07-04': 'juan',
  '2026-07-05': 'fred-br',
  '2026-07-06': 'dunga',
  '2026-07-07': 'gilberto-silva',
  '2026-07-08': 'ederson',
  '2026-07-09': 'militao',
  '2026-07-10': 'marquinhos',
  '2026-07-11': 'bruno-guimaraes',
  '2026-07-12': 'raphinha',
}

export function getDailyCarreiraPlayer(): CarreiraPlayer {
  const today = new Date().toISOString().split('T')[0]
  const scheduledId = DAILY_SCHEDULE[today]

  if (scheduledId) {
    const player = CARREIRA_PLAYERS.find(p => p.id === scheduledId)
    if (player) return player
  }

  const seed = today.split('-').reduce((acc, n) => acc + parseInt(n), 0)
  return CARREIRA_PLAYERS[seed % CARREIRA_PLAYERS.length]
}
