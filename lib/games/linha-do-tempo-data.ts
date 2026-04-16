// Dados para o game "Linha do Tempo"
// Eventos históricos do futebol para ordenar cronologicamente

export type TimelineEvent = {
  id: string
  title: string
  description: string
  year: number
  emoji: string
}

// Base de eventos - cada dia pega 4 aleatorios em ordem shuffled
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'pele-nascimento',
    title: 'Pelé nasce',
    description: 'Edson Arantes do Nascimento (Pelé) nasce em Três Corações, Brasil',
    year: 1940,
    emoji: '👶',
  },
  {
    id: 'brasil-1970',
    title: 'Brasil tricampeão',
    description: 'Brasil ganha Copa do Mundo 1970 no México com Pelé',
    year: 1970,
    emoji: '🏆',
  },
  {
    id: 'maradona-1986',
    title: 'Maradona mão de Deus',
    description: 'Argentina campeã com gol da "mão de Deus" de Maradona',
    year: 1986,
    emoji: '✋',
  },
  {
    id: 'france-1998',
    title: 'França campeã em casa',
    description: 'França vence Copa do Mundo 1998 com Zidane (2 gols)',
    year: 1998,
    emoji: '🇫🇷',
  },
  {
    id: 'italy-2006',
    title: 'Itália tricampeã',
    description: 'Itália vence Copa 2006 na Alemanha com Buffon na defesa',
    year: 2006,
    emoji: '🇮🇹',
  },
  {
    id: 'spain-2010',
    title: 'Espanha campeã',
    description: 'Espanha ganha Copa 2010 na África do Sul',
    year: 2010,
    emoji: '🇪🇸',
  },
  {
    id: 'germany-2014',
    title: 'Alemanha tetracampeã',
    description: 'Alemanha vence Copa 2014 no Brasil com Müller (5 gols)',
    year: 2014,
    emoji: '🇩🇪',
  },
  {
    id: 'france-2018',
    title: 'França bicampeã',
    description: 'França vence Copa 2018 na Rússia com Mbappé em destaque',
    year: 2018,
    emoji: '🇫🇷',
  },
  {
    id: 'argentina-2022',
    title: 'Argentina tricampeã',
    description: 'Argentina vence Copa 2022 no Qatar com Messi e Martínez (herói)',
    year: 2022,
    emoji: '🇦🇷',
  },
  {
    id: 'messi-naci',
    title: 'Messi nasce',
    description: 'Lionel Andrés Messi nasce em Rosário, Argentina',
    year: 1987,
    emoji: '🌟',
  },
  {
    id: 'ronaldo-1994',
    title: 'Ronaldo nasce',
    description: 'Ronaldo Nazário (Fenômeno) nasce em Rio de Janeiro',
    year: 1976,
    emoji: '⚡',
  },
  {
    id: 'ronaldo-2002',
    title: 'Ronaldo 2 gols em final',
    description: 'Ronaldo marca 2 gols na final da Copa 2002 contra Alemanha',
    year: 2002,
    emoji: '⚽',
  },
  {
    id: 'champions-1992',
    title: 'Champions League moderna',
    description: 'Barcelona ganha primeiro título da Liga dos Campeões moderna',
    year: 1992,
    emoji: '🏅',
  },
  {
    id: 'champions-2009',
    title: 'Barcelona era Messi',
    description: 'Barcelona ganha Champions com Messi no auge',
    year: 2009,
    emoji: '🔵',
  },
  {
    id: 'real-2016',
    title: 'Real tricampeã de Champions',
    description: 'Real Madrid ganha Champions 2016, terceira consecutiva',
    year: 2016,
    emoji: '👑',
  },
  {
    id: 'libertadores-1960',
    title: 'Libertadores criada',
    description: 'Primeira Copa Libertadores da América é realizada',
    year: 1960,
    emoji: '🏆',
  },
  {
    id: 'flamengo-1981',
    title: 'Flamengo campeão',
    description: 'Flamengo vence Libertadores com Zé Maria e Adílio',
    year: 1981,
    emoji: '🔴',
  },
  {
    id: 'libertadores-2023',
    title: 'Fluminense campeão',
    description: 'Fluminense vence Libertadores após 54 anos',
    year: 2023,
    emoji: '⭐',
  },
  {
    id: 'brasileirao-1959',
    title: 'Brasileirão criado',
    description: 'Primeiro Campeonato Brasileiro de Futebol é criado',
    year: 1959,
    emoji: '🇧🇷',
  },
  {
    id: 'pelé-1000',
    title: 'Pelé 1000 gols',
    description: 'Pelé marca seu milésimo gol em carreira',
    year: 1969,
    emoji: '🎯',
  },
  {
    id: 'zidane-headbutt',
    title: 'Headbutt de Zidane',
    description: 'Zidane recebe vermelho por headbutt em Materazzi na final 2006',
    year: 2006,
    emoji: '😤',
  },
  {
    id: 'cr7-born',
    title: 'Cristiano Ronaldo nasce',
    description: 'Cristiano Ronaldo nasce na Madeira, Portugal',
    year: 1985,
    emoji: '🔥',
  },
  {
    id: 'neymar-born',
    title: 'Neymar nasce',
    description: 'Neymar da Silva Santos Júnior nasce em Mogi Cruzes, São Paulo',
    year: 1992,
    emoji: '✨',
  },
  {
    id: 'covid-2020',
    title: 'Futebol em pandemia',
    description: 'Futebol mundial é paralisado por causa da COVID-19',
    year: 2020,
    emoji: '😷',
  },
  {
    id: 'mbappé-born',
    title: 'Mbappé nasce',
    description: 'Kylian Mbappé nasce em Bondy, França',
    year: 1998,
    emoji: '⚡',
  },
  {
    id: 'haaland-born',
    title: 'Haaland nasce',
    description: 'Erling Haaland nasce em Bryne, Noruega',
    year: 2000,
    emoji: '🎯',
  },
  {
    id: 'riquelme-boca',
    title: 'Riquelme volta ao Boca',
    description: 'Juan Román Riquelme retorna ao Boca Juniors após 10 anos',
    year: 2009,
    emoji: '🔵',
  },
  {
    id: 'vinicius-jr',
    title: 'Vinícius Jr na Champions',
    description: 'Vinícius Jr é decisivo na Champions do Real Madrid',
    year: 2024,
    emoji: '⚪',
  },
  {
    id: 'primeira-tv',
    title: 'Primeira Copa televisionada',
    description: 'Copa do Mundo 1954 é primeira transmitida ao vivo na TV',
    year: 1954,
    emoji: '📺',
  },
]

// Função para pegar eventos do dia (determinístico baseado na data)
export function getDailyTimelineEvents(): TimelineEvent[] {
  const today = new Date().toISOString().split('T')[0]
  
  // Seed determinístico baseado na data
  const seed = today.split('-').reduce((acc, val) => acc + parseInt(val), 0)
  const shuffled = [...TIMELINE_EVENTS].sort(() => {
    // Simple seeded shuffle
    return Math.sin(seed * Math.random()) - 0.5
  })

  // Pega 4 eventos aleatórios
  return shuffled.slice(0, 4)
}

// Função para ordenar eventos corretamente
export function getCorrectOrder(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => a.year - b.year)
}

// Função para calcular pontos
export function calculateTimelinePoints(attempts: number, won: boolean): number {
  if (!won) return 0
  
  // 100 pontos base - (tentativas - 1) * 20
  // 1 tentativa = 100
  // 2 tentativas = 80
  // 3 tentativas = 60
  // 4+ = 40 ou menos
  return Math.max(20, 100 - (attempts - 1) * 20)
}
