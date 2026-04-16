// Dados para o game "Linha do Tempo"
// Eventos históricos do futebol para ordenar cronologicamente

export type TimelineEvent = {
  id: string
  title: string
  description: string
  year: number
  emoji: string
}

// Gerador de números pseudo-aleatórios determinístico (algoritmo mulberry32)
// Garante que o mesmo seed sempre produz a mesma sequência de números
function createRNG(seed: number) {
  let s = seed >>> 0
  return function () {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Fisher-Yates shuffle com RNG determinístico
function seededShuffle<T>(array: T[], seed: number): T[] {
  const rng = createRNG(seed)
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// Base de eventos — cada dia seleciona 4 aleatórios em ordem embaralhada
export const TIMELINE_EVENTS: TimelineEvent[] = [
  // ── Copas do Mundo ──
  {
    id: 'copa-1930',
    title: 'Primeira Copa do Mundo',
    description: 'Uruguai sedia e vence a 1ª Copa do Mundo da FIFA na história',
    year: 1930,
    emoji: '🏆',
  },
  {
    id: 'maracanazo-1950',
    title: 'Maracanazo',
    description: 'Uruguai derrota o Brasil 2-1 na final da Copa, no próprio Maracanã',
    year: 1950,
    emoji: '💔',
  },
  {
    id: 'brasil-1958',
    title: 'Brasil campeão com Pelé de 17 anos',
    description: 'Brasil vence primeira Copa do Mundo na Suécia com Pelé ainda adolescente',
    year: 1958,
    emoji: '⭐',
  },
  {
    id: 'brasil-1962',
    title: 'Brasil bicampeão com Garrincha',
    description: 'Brasil vence Copa do Chile com brilho de Garrincha (Pelé se lesionou cedo)',
    year: 1962,
    emoji: '🦺',
  },
  {
    id: 'pele-nascimento',
    title: 'Pelé nasce',
    description: 'Edson Arantes do Nascimento (Pelé) nasce em Três Corações, Brasil',
    year: 1940,
    emoji: '👶',
  },
  {
    id: 'england-1966',
    title: 'Inglaterra campeã em casa',
    description: 'Inglaterra vence sua única Copa do Mundo, em Wembley, com Bobby Moore',
    year: 1966,
    emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
  {
    id: 'argentina-1978',
    title: 'Argentina primeira Copa',
    description: 'Argentina conquista sua primeira Copa do Mundo em casa, com Kempes artilheiro',
    year: 1978,
    emoji: '🇦🇷',
  },
  {
    id: 'brasil-1970',
    title: 'Brasil tricampeão',
    description: 'Brasil ganha Copa do Mundo 1970 no México com Pelé e Jairzinho',
    year: 1970,
    emoji: '🏆',
  },
  {
    id: 'maradona-1986',
    title: 'Maradona mão de Deus',
    description: 'Argentina campeã com gol da "mão de Deus" e drible do século de Maradona',
    year: 1986,
    emoji: '✋',
  },
  {
    id: 'brasil-1994',
    title: 'Brasil tetracampeão',
    description: 'Brasil vence Copa dos EUA com Romário e Bebeto, o famoso gol do bebê',
    year: 1994,
    emoji: '🇧🇷',
  },
  {
    id: 'france-1998',
    title: 'França campeã em casa',
    description: 'França vence Copa do Mundo 1998 com Zidane marcando 2 gols na final',
    year: 1998,
    emoji: '🇫🇷',
  },
  {
    id: 'ronaldo-2002',
    title: 'Ronaldo 2 gols em final',
    description: 'Ronaldo marca 2 gols na final da Copa 2002 contra a Alemanha',
    year: 2002,
    emoji: '⚽',
  },
  {
    id: 'italy-2006',
    title: 'Itália tetracampeã',
    description: 'Itália vence Copa 2006 na Alemanha com Buffon e Cannavaro na defesa',
    year: 2006,
    emoji: '🇮🇹',
  },
  {
    id: 'spain-2010',
    title: 'Espanha campeã',
    description: 'Espanha ganha Copa 2010 na África do Sul com Iniesta decidindo na prorrogação',
    year: 2010,
    emoji: '🇪🇸',
  },
  {
    id: 'germany-2014',
    title: 'Alemanha tetracampeã',
    description: 'Alemanha vence Copa 2014 no Brasil com Müller (5 gols) e gol de Götze na prorrogação',
    year: 2014,
    emoji: '🇩🇪',
  },
  {
    id: 'france-2018',
    title: 'França bicampeã',
    description: 'França vence Copa 2018 na Rússia com Mbappé em destaque e Modric como melhor jogador',
    year: 2018,
    emoji: '🇫🇷',
  },
  {
    id: 'argentina-2022',
    title: 'Argentina tricampeã',
    description: 'Argentina vence Copa 2022 no Qatar com Messi campeão e Martínez herói nos pênaltis',
    year: 2022,
    emoji: '🇦🇷',
  },

  // ── Nascimentos de ídolos ──
  {
    id: 'ronaldinho-born',
    title: 'Ronaldinho Gaúcho nasce',
    description: 'Ronaldo de Assis Moreira (Ronaldinho) nasce em Porto Alegre, Brasil',
    year: 1980,
    emoji: '😁',
  },
  {
    id: 'cr7-born',
    title: 'Cristiano Ronaldo nasce',
    description: 'Cristiano Ronaldo nasce na Ilha da Madeira, Portugal',
    year: 1985,
    emoji: '🔥',
  },
  {
    id: 'messi-naci',
    title: 'Messi nasce',
    description: 'Lionel Andrés Messi nasce em Rosário, Argentina',
    year: 1987,
    emoji: '🌟',
  },
  {
    id: 'neymar-born',
    title: 'Neymar nasce',
    description: 'Neymar da Silva Santos Júnior nasce em Mogi das Cruzes, São Paulo',
    year: 1992,
    emoji: '✨',
  },
  {
    id: 'ronaldo-1994',
    title: 'Ronaldo Fenômeno nasce',
    description: 'Ronaldo Nazário (Fenômeno) nasce no Rio de Janeiro, Brasil',
    year: 1976,
    emoji: '⚡',
  },
  {
    id: 'mbappé-born',
    title: 'Mbappé nasce',
    description: 'Kylian Mbappé nasce em Bondy, na região metropolitana de Paris',
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

  // ── Champions League e clubes ──
  {
    id: 'champions-1992',
    title: 'Champions League moderna criada',
    description: 'UEFA reformula a Copa dos Campeões e nasce a Liga dos Campeões moderna',
    year: 1992,
    emoji: '🏅',
  },
  {
    id: 'istanbul-2005',
    title: 'Milagre de Istambul',
    description: 'Liverpool vira de 0-3 para 3-3 contra o Milan e vence a Champions League na prorrogação',
    year: 2005,
    emoji: '🔴',
  },
  {
    id: 'champions-2009',
    title: 'Barcelona era Messi',
    description: 'Barcelona de Pep Guardiola vence a Champions League com Messi no auge',
    year: 2009,
    emoji: '🔵',
  },
  {
    id: 'real-2016',
    title: 'Real Madrid bicampeão consecutivo',
    description: 'Real Madrid vence Champions 2016 sobre o Atlético, segunda consecutiva',
    year: 2016,
    emoji: '👑',
  },
  {
    id: 'vinicius-jr',
    title: 'Vinícius Jr. decisivo na Champions',
    description: 'Vinícius Jr. é eleito melhor jogador da Champions League pelo Real Madrid',
    year: 2024,
    emoji: '⚪',
  },

  // ── Transferências recordes ──
  {
    id: 'zidane-madrid',
    title: 'Zidane vai ao Real Madrid',
    description: 'Zidane transfere-se da Juventus para o Real Madrid por €75 mi, então recorde mundial',
    year: 2001,
    emoji: '💰',
  },
  {
    id: 'neymar-psg',
    title: 'Neymar bate recorde ao ir ao PSG',
    description: 'Neymar é transferido do Barcelona ao PSG por €222 milhões — maior da história',
    year: 2017,
    emoji: '💸',
  },

  // ── Brasil e América do Sul ──
  {
    id: 'libertadores-1960',
    title: 'Libertadores criada',
    description: 'Primeira Copa Libertadores da América é disputada — vencida pelo Peñarol do Uruguai',
    year: 1960,
    emoji: '🏆',
  },
  {
    id: 'pelé-1000',
    title: 'Pelé marca 1000 gols',
    description: 'Pelé marca seu milésimo gol em jogos oficiais de pênalti pelo Santos, no Maracanã',
    year: 1969,
    emoji: '🎯',
  },
  {
    id: 'flamengo-1981',
    title: 'Flamengo campeão da Libertadores',
    description: 'Flamengo vence sua primeira Libertadores com Zico, Adílio e Nunes',
    year: 1981,
    emoji: '🔴',
  },
  {
    id: 'brasileirao-1959',
    title: 'Brasileirão criado',
    description: 'Primeiro Campeonato Brasileiro de Futebol Profissional é organizado pela CBD',
    year: 1959,
    emoji: '🇧🇷',
  },
  {
    id: 'brasil-1982',
    title: 'Brasil encanta, mas cai na Copa',
    description: 'Seleção de Zico, Sócrates e Falcão joga futebol arte na Espanha, mas perde para Itália',
    year: 1982,
    emoji: '😢',
  },
  {
    id: 'flamengo-2019',
    title: 'Flamengo bicampeão da Libertadores',
    description: 'Flamengo vence Libertadores após 38 anos com virada épica sobre o River Plate',
    year: 2019,
    emoji: '🔴',
  },
  {
    id: 'libertadores-2023',
    title: 'Fluminense campeão',
    description: 'Fluminense vence sua primeira Libertadores da América após 111 anos de clube',
    year: 2023,
    emoji: '⭐',
  },

  // ── Momentos marcantes ──
  {
    id: 'zidane-headbutt',
    title: 'Cabeçada de Zidane na final',
    description: 'Zidane recebe cartão vermelho por cabeçada em Materazzi na final da Copa 2006',
    year: 2006,
    emoji: '😤',
  },
  {
    id: 'riquelme-boca',
    title: 'Riquelme volta ao Boca',
    description: 'Juan Román Riquelme retorna ao Boca Juniors após 10 anos na Europa',
    year: 2009,
    emoji: '🔵',
  },
  {
    id: 'covid-2020',
    title: 'Futebol parado pela pandemia',
    description: 'COVID-19 paralisa o futebol mundial por meses — ligas canceladas ou suspensas',
    year: 2020,
    emoji: '😷',
  },
  {
    id: 'greece-euro-2004',
    title: 'Grécia vence a Eurocopa',
    description: 'Grécia elimina Portugal e vence a Euro 2004 na maior zebra da história do torneio',
    year: 2004,
    emoji: '🇬🇷',
  },
  {
    id: 'cr7-ballon-2008',
    title: 'Cristiano Ronaldo conquista primeiro Ballon d\'Or',
    description: 'Após liderar o Manchester United ao título inglês e europeu, CR7 vence seu 1º Ballon d\'Or',
    year: 2008,
    emoji: '🥇',
  },
  {
    id: 'primeira-tv',
    title: 'Primeira Copa televisionada',
    description: 'Copa do Mundo de 1954 na Suíça é a primeira a ser transmitida ao vivo pela televisão',
    year: 1954,
    emoji: '📺',
  },
]

// Função para pegar eventos do dia (verdadeiramente determinístico baseado na data)
// Todos os jogadores no mesmo dia verão exatamente os mesmos 4 eventos
export function getDailyTimelineEvents(): TimelineEvent[] {
  const today = new Date().toISOString().split('T')[0]
  const [year, month, day] = today.split('-').map(Number)

  // Seed único por data: ex. 2026-04-16 → 20260416
  const seed = year * 10000 + month * 100 + day

  const shuffled = seededShuffle(TIMELINE_EVENTS, seed)

  // Garantir que nenhum dos 4 eventos selecionados tenha o mesmo ano
  // (anos duplicados tornariam a ordenação ambígua)
  const selected: TimelineEvent[] = []
  const usedYears = new Set<number>()

  for (const event of shuffled) {
    if (!usedYears.has(event.year) && selected.length < 4) {
      selected.push(event)
      usedYears.add(event.year)
    }
  }

  // Fallback (improvável com 40+ eventos de anos variados)
  if (selected.length < 4) {
    return shuffled.slice(0, 4)
  }

  return selected
}

// Função para ordenar eventos corretamente (do mais antigo ao mais recente)
export function getCorrectOrder(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => a.year - b.year)
}

// Função para calcular pontos com base no número de tentativas
export function calculateTimelinePoints(attempts: number, won: boolean): number {
  if (!won) return 0

  // 100 pontos base - (tentativas - 1) * 20
  // 1ª tentativa = 100 pts | 2ª = 80 pts | 3ª = 60 pts
  return Math.max(20, 100 - (attempts - 1) * 20)
}
