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

  // ── Copas do Mundo adicionais ──
  {
    id: 'italy-1934',
    title: 'Itália campeã em casa',
    description: 'Itália vence Copa do Mundo de 1934 em seu próprio território com Schiavio artilheiro',
    year: 1934,
    emoji: '🇮🇹',
  },
  {
    id: 'italy-1938',
    title: 'Itália bicampeã mundial',
    description: 'Itália defende o título e vence a Copa de 1938 na França, tornando-se bicampeã consecutiva',
    year: 1938,
    emoji: '🇮🇹',
  },
  {
    id: 'west-germany-1954',
    title: 'Milagre de Berna',
    description: 'Alemanha Ocidental derrota a favorita Hungria na final da Copa 1954 na Suíça',
    year: 1954,
    emoji: '🇩🇪',
  },
  {
    id: 'west-germany-1974',
    title: 'Alemanha Ocidental campeã em casa',
    description: 'Alemanha Ocidental vence Copa de 1974 em seu território com Beckenbauer capitão',
    year: 1974,
    emoji: '🇩🇪',
  },
  {
    id: 'brasil-1990',
    title: 'Brasil eliminado pela Argentina',
    description: 'Brasil perde para a Argentina de Maradona nas oitavas da Copa 1990 na Itália',
    year: 1990,
    emoji: '😢',
  },
  {
    id: 'mineirazo-2014',
    title: 'Mineirazo — Brasil 1x7 Alemanha',
    description: 'Brasil é goleado pela Alemanha por 7 a 1 na semifinal da Copa 2014, em Belo Horizonte',
    year: 2014,
    emoji: '😱',
  },
  {
    id: 'maracana-abertura',
    title: 'Maracanã é inaugurado',
    description: 'Estádio Jornalista Mário Filho (Maracanã) é inaugurado no Rio de Janeiro para a Copa de 1950',
    year: 1950,
    emoji: '🏟️',
  },
  {
    id: 'pele-primeiro-gol-copa',
    title: 'Pelé marca primeiro gol em Copas',
    description: 'Com apenas 17 anos, Pelé marca seu primeiro gol em Copa do Mundo na Suécia de 1958',
    year: 1958,
    emoji: '⚽',
  },

  // ── Nascimentos de ídolos ──
  {
    id: 'garrincha-born',
    title: 'Garrincha nasce',
    description: 'Manuel Francisco dos Santos (Garrincha), o "Anjo das Pernas Tortas", nasce em Pau Grande, RJ',
    year: 1933,
    emoji: '🦺',
  },
  {
    id: 'maradona-born',
    title: 'Maradona nasce',
    description: 'Diego Armando Maradona nasce em Lanús, Buenos Aires, Argentina',
    year: 1960,
    emoji: '🇦🇷',
  },
  {
    id: 'zico-born',
    title: 'Zico nasce',
    description: 'Arthur Antunes Coimbra (Zico), o "Galinho de Quintino", nasce no Rio de Janeiro',
    year: 1953,
    emoji: '⚽',
  },
  {
    id: 'romario-born',
    title: 'Romário nasce',
    description: 'Romário de Souza Faria, goleador lendário do futebol brasileiro, nasce no Rio de Janeiro',
    year: 1966,
    emoji: '🎯',
  },
  {
    id: 'bebeto-born',
    title: 'Bebeto nasce',
    description: 'José Roberto Gama de Oliveira (Bebeto), parceiro de Romário no tetracampeonato, nasce na Bahia',
    year: 1964,
    emoji: '👶',
  },
  {
    id: 'roberto-carlos-born',
    title: 'Roberto Carlos nasce',
    description: 'Roberto Carlos da Silva, lateral-esquerdo lendário do Brasil e Real Madrid, nasce em Garça, SP',
    year: 1973,
    emoji: '⚡',
  },
  {
    id: 'cafu-born',
    title: 'Cafu nasce',
    description: 'Marcos Evangelista de Morais (Cafu), capitão do penta e da Roma, nasce em São Paulo',
    year: 1970,
    emoji: '🛡️',
  },
  {
    id: 'kaka-born',
    title: 'Kaká nasce',
    description: 'Ricardo Izecson dos Santos Leite (Kaká), Bola de Ouro 2007, nasce em Brasília, Brasil',
    year: 1982,
    emoji: '🙏',
  },
  {
    id: 'beckham-born',
    title: 'David Beckham nasce',
    description: 'David Robert Joseph Beckham, ícone do Manchester United e da seleção inglesa, nasce em Londres',
    year: 1975,
    emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
  {
    id: 'zidane-born',
    title: 'Zinedine Zidane nasce',
    description: 'Zinedine Zidane nasce em Marselha, França, filho de imigrantes argelinos',
    year: 1972,
    emoji: '🇫🇷',
  },
  {
    id: 'henry-born',
    title: 'Thierry Henry nasce',
    description: 'Thierry Daniel Henry, artilheiro lendário do Arsenal e da França, nasce em Les Ulis, Paris',
    year: 1977,
    emoji: '🇫🇷',
  },
  {
    id: 'iniesta-born',
    title: 'Andrés Iniesta nasce',
    description: 'Andrés Iniesta Luján, ídolo do Barcelona e campeão mundial em 2010, nasce em Fuentealbilla, Espanha',
    year: 1984,
    emoji: '🇪🇸',
  },
  {
    id: 'xavi-born',
    title: 'Xavi Hernández nasce',
    description: 'Xavier Hernández Creus (Xavi), maestro do meio-campo do Barcelona e da Espanha, nasce em Terrassa',
    year: 1980,
    emoji: '🇪🇸',
  },
  {
    id: 'lewandowski-born',
    title: 'Robert Lewandowski nasce',
    description: 'Robert Lewandowski, artilheiro do Bayern de Munique e da Polônia, nasce em Varsóvia',
    year: 1988,
    emoji: '🎯',
  },
  {
    id: 'salah-born',
    title: 'Mohamed Salah nasce',
    description: 'Mohamed Salah, estrela do Liverpool e da seleção egípcia, nasce em Nagrig, Egito',
    year: 1992,
    emoji: '🌙',
  },
  {
    id: 'modric-born',
    title: 'Luka Modrić nasce',
    description: 'Luka Modrić, melhor jogador da Copa 2018 e ídolo do Real Madrid, nasce em Zadar, Croácia',
    year: 1985,
    emoji: '🇭🇷',
  },
  {
    id: 'vinicius-born',
    title: 'Vinícius Jr. nasce',
    description: 'Vinícius José Paixão de Oliveira Júnior (Vinícius Jr.) nasce em São Gonçalo, Rio de Janeiro',
    year: 2000,
    emoji: '🇧🇷',
  },
  {
    id: 'bellingham-born',
    title: 'Jude Bellingham nasce',
    description: 'Jude Victor William Bellingham, meia prodígio do Real Madrid e da Inglaterra, nasce em Stourbridge',
    year: 2003,
    emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },

  // ── Falecimentos ──
  {
    id: 'pele-falecimento',
    title: 'Pelé morre',
    description: 'Edson Arantes do Nascimento (Pelé), o maior jogador da história, morre aos 82 anos em São Paulo',
    year: 2022,
    emoji: '🕊️',
  },
  {
    id: 'maradona-falecimento',
    title: 'Maradona morre',
    description: 'Diego Armando Maradona, ídolo mundial do futebol, morre aos 60 anos em Buenos Aires',
    year: 2020,
    emoji: '🕊️',
  },

  // ── Champions League adicional ──
  {
    id: 'real-1956',
    title: 'Real Madrid vence primeira Copa dos Campeões',
    description: 'Real Madrid conquista a primeira edição da Copa dos Campeões da Europa em 1956 com Di Stéfano',
    year: 1956,
    emoji: '👑',
  },
  {
    id: 'ajax-1995',
    title: 'Ajax campeão europeu com Kluivert',
    description: 'Ajax vence a Champions League de 1995 com Patrick Kluivert marcando o gol da vitória na final',
    year: 1995,
    emoji: '🇳🇱',
  },
  {
    id: 'manchester-united-1999',
    title: 'Manchester United vence a tríplice coroa',
    description: 'Manchester United vence Premier League, FA Cup e Champions League em 1999 com Fergie',
    year: 1999,
    emoji: '🔴',
  },
  {
    id: 'real-2002',
    title: 'Zidane voleio decide Champions',
    description: 'Real Madrid vence Champions 2002 com o voleio de Zidane eleito o melhor gol da história da competição',
    year: 2002,
    emoji: '👑',
  },
  {
    id: 'ac-milan-2003',
    title: 'AC Milan campeão europeu',
    description: 'AC Milan vence Champions League 2003 sobre a Juventus nos pênaltis em Old Trafford',
    year: 2003,
    emoji: '⚫🔴',
  },
  {
    id: 'barca-2006',
    title: 'Barcelona campeão europeu com Ronaldinho',
    description: 'Barcelona de Ronaldinho e Eto\'o vence a Champions League de 2006 contra o Arsenal',
    year: 2006,
    emoji: '🔵🔴',
  },
  {
    id: 'manchester-united-2008',
    title: 'Manchester United campeão europeu com CR7',
    description: 'Manchester United vence Champions 2008 sobre o Chelsea nos pênaltis, com CR7 no auge',
    year: 2008,
    emoji: '🔴',
  },
  {
    id: 'barca-2011',
    title: 'Barcelona domina a Europa',
    description: 'Barcelona de Guardiola vence Champions 2011 sobre o Manchester United por 3-1 em Wembley',
    year: 2011,
    emoji: '🔵🔴',
  },
  {
    id: 'real-2014',
    title: 'Real Madrid La Décima',
    description: 'Real Madrid conquista sua 10ª Champions League em 2014 sobre o Atlético de Madrid na prorrogação',
    year: 2014,
    emoji: '👑',
  },
  {
    id: 'real-2017',
    title: 'Real Madrid tricampeão consecutivo',
    description: 'Real Madrid vence a Champions 2017 em Cardiff, terceiro título europeu seguido com CR7 e Zidane técnico',
    year: 2017,
    emoji: '👑',
  },
  {
    id: 'liverpool-2019',
    title: 'Liverpool campeão europeu',
    description: 'Liverpool vence Champions League 2019 sobre o Tottenham com Divock Origi decidindo',
    year: 2019,
    emoji: '🔴',
  },
  {
    id: 'chelsea-2021',
    title: 'Chelsea campeão europeu',
    description: 'Chelsea vence Champions League 2021 sobre o Manchester City com gol de Kai Havertz',
    year: 2021,
    emoji: '🔵',
  },

  // ── Libertadores adicional ──
  {
    id: 'santos-1962',
    title: 'Santos vence primeira Libertadores',
    description: 'Santos de Pelé conquista sua primeira Copa Libertadores da América em 1962',
    year: 1962,
    emoji: '⚽',
  },
  {
    id: 'santos-1963',
    title: 'Santos bicampeão da Libertadores',
    description: 'Santos de Pelé vence sua segunda Libertadores consecutiva em 1963, bicampeão continental',
    year: 1963,
    emoji: '⚽',
  },
  {
    id: 'gremio-1983',
    title: 'Grêmio vence primeira Libertadores',
    description: 'Grêmio conquista sua primeira Copa Libertadores da América em 1983 com Renato Gaúcho',
    year: 1983,
    emoji: '⚫🔵',
  },
  {
    id: 'sao-paulo-1992',
    title: 'São Paulo vence Libertadores',
    description: 'São Paulo FC conquista sua primeira Copa Libertadores da América em 1992 com Telê Santana',
    year: 1992,
    emoji: '🔴',
  },
  {
    id: 'sao-paulo-1993',
    title: 'São Paulo bicampeão da Libertadores',
    description: 'São Paulo vence sua segunda Libertadores consecutiva em 1993, bicampeão continental',
    year: 1993,
    emoji: '🔴',
  },
  {
    id: 'gremio-1995',
    title: 'Grêmio bicampeão da Libertadores',
    description: 'Grêmio vence sua segunda Copa Libertadores em 1995 com Ronaldinho Gaúcho jovem no elenco',
    year: 1995,
    emoji: '⚫🔵',
  },
  {
    id: 'inter-libertadores-2006',
    title: 'Internacional campeão da Libertadores',
    description: 'Sport Club Internacional vence sua primeira Libertadores em 2006 com Adriano artilheiro',
    year: 2006,
    emoji: '🔴',
  },
  {
    id: 'atletico-mg-libertadores',
    title: 'Atlético Mineiro campeão da Libertadores',
    description: 'Atlético Mineiro vence sua primeira Copa Libertadores em 2013 com Ronaldinho Gaúcho no elenco',
    year: 2013,
    emoji: '⚫⚽',
  },

  // ── Copa América ──
  {
    id: 'copa-america-criada',
    title: 'Copa América criada',
    description: 'Primeira edição da Copa América (então chamada Campeonato Sul-Americano) é disputada na Argentina',
    year: 1916,
    emoji: '🌎',
  },
  {
    id: 'brasil-copa-america-1989',
    title: 'Brasil campeão da Copa América',
    description: 'Brasil vence a Copa América de 1989 no Brasil com Romário e Bebeto em grande fase',
    year: 1989,
    emoji: '🇧🇷',
  },
  {
    id: 'brasil-copa-america-1997',
    title: 'Brasil bicampeão da Copa América',
    description: 'Brasil vence Copa América de 1997 na Bolívia, segundo título consecutivo',
    year: 1997,
    emoji: '🇧🇷',
  },
  {
    id: 'brasil-copa-america-2019',
    title: 'Brasil vence Copa América em casa',
    description: 'Brasil conquista Copa América de 2019 em seu território, vencendo o Peru na final',
    year: 2019,
    emoji: '🇧🇷',
  },

  // ── Eurocopa ──
  {
    id: 'euro-1960',
    title: 'Primeira Eurocopa disputada',
    description: 'Primeira edição da Eurocopa é realizada na França e vencida pela União Soviética',
    year: 1960,
    emoji: '🇷🇺',
  },
  {
    id: 'france-euro-1984',
    title: 'França vence Eurocopa com Platini',
    description: 'França de Platini (9 gols no torneio) vence a Eurocopa de 1984 em casa',
    year: 1984,
    emoji: '🇫🇷',
  },
  {
    id: 'netherlands-euro-1988',
    title: 'Holanda vence Eurocopa',
    description: 'Holanda de Van Basten e Gullit vence a Eurocopa de 1988 com o famoso voleio de Van Basten na final',
    year: 1988,
    emoji: '🇳🇱',
  },
  {
    id: 'denmark-euro-1992',
    title: 'Dinamarca vence Eurocopa de surpresa',
    description: 'Dinamarca vence Eurocopa 1992 mesmo sem ter se classificado originalmente, maior zebra do torneio',
    year: 1992,
    emoji: '🇩🇰',
  },
  {
    id: 'germany-euro-1996',
    title: 'Alemanha vence Eurocopa na Inglaterra',
    description: 'Alemanha vence Eurocopa 1996 com gol de ouro de Bierhoff na prorrogação da final contra a República Tcheca',
    year: 1996,
    emoji: '🇩🇪',
  },
  {
    id: 'france-euro-2000',
    title: 'França bicampeã — Copa e Eurocopa',
    description: 'França vence Eurocopa 2000 com gol de ouro de Trezeguet, tornando-se bicampeã mundial e europeia',
    year: 2000,
    emoji: '🇫🇷',
  },
  {
    id: 'spain-euro-2008',
    title: 'Espanha vence Eurocopa',
    description: 'Espanha inicia era de dominância vencendo Eurocopa 2008 na Áustria/Suíça com Fernando Torres',
    year: 2008,
    emoji: '🇪🇸',
  },
  {
    id: 'spain-euro-2012',
    title: 'Espanha tricampeã — segunda Eurocopa',
    description: 'Espanha vence Eurocopa 2012 goleando a Itália por 4-0 na final, tornando-se tricampeã',
    year: 2012,
    emoji: '🇪🇸',
  },
  {
    id: 'portugal-euro-2016',
    title: 'Portugal vence primeira Eurocopa',
    description: 'Portugal vence Eurocopa 2016 na França com gol de Eder na prorrogação, apesar de Messi estar lesionado',
    year: 2016,
    emoji: '🇵🇹',
  },
  {
    id: 'italy-euro-2021',
    title: 'Itália vence Eurocopa nos pênaltis',
    description: 'Itália vence a Eurocopa 2020 (realizada em 2021) em Wembley batendo a Inglaterra nos pênaltis',
    year: 2021,
    emoji: '🇮🇹',
  },
  {
    id: 'spain-euro-2024',
    title: 'Espanha tetracampeã europeia',
    description: 'Espanha vence a Eurocopa 2024 na Alemanha com Lamine Yamal de apenas 16 anos em destaque',
    year: 2024,
    emoji: '🇪🇸',
  },

  // ── Transferências e carreiras ──
  {
    id: 'ronaldo-inter-1997',
    title: 'Ronaldo Fenômeno vai à Europa',
    description: 'Ronaldo Nazário transfere-se para a Internazionale de Milão em 1997 tornando-se o jogador mais caro do mundo',
    year: 1997,
    emoji: '⚡',
  },
  {
    id: 'beckham-real-2003',
    title: 'Beckham vai ao Real Madrid',
    description: 'David Beckham deixa o Manchester United e vai ao Real Madrid, tornando-se um dos galácticos',
    year: 2003,
    emoji: '💫',
  },
  {
    id: 'messi-barca-debut',
    title: 'Messi estreia no Barcelona',
    description: 'Lionel Messi faz sua estreia no time principal do Barcelona na La Liga aos 17 anos',
    year: 2004,
    emoji: '🌟',
  },
  {
    id: 'cr7-juventus',
    title: 'Cristiano Ronaldo vai à Juventus',
    description: 'CR7 deixa o Real Madrid após 9 anos e transfere-se para a Juventus por €112 milhões',
    year: 2018,
    emoji: '🔥',
  },
  {
    id: 'messi-psg',
    title: 'Messi deixa o Barcelona e vai ao PSG',
    description: 'Messi deixa o Barcelona após 21 anos por problemas financeiros do clube e assina com o PSG',
    year: 2021,
    emoji: '🌟',
  },
  {
    id: 'mbappe-real-madrid',
    title: 'Mbappé vai ao Real Madrid',
    description: 'Kylian Mbappé deixa o PSG e assina com o Real Madrid após anos de negociação frustrada',
    year: 2024,
    emoji: '⚡',
  },

  // ── Prêmios e recordes ──
  {
    id: 'ronaldinho-ballon-2005',
    title: 'Ronaldinho vence Ballon d\'Or',
    description: 'Ronaldinho Gaúcho vence o prêmio Ballon d\'Or de 2005 no auge de sua fase gloriosa no Barcelona',
    year: 2005,
    emoji: '😁',
  },
  {
    id: 'kaka-ballon-2007',
    title: 'Kaká vence Ballon d\'Or',
    description: 'Kaká vence o Ballon d\'Or de 2007 após levar o Milan à Champions, único não-europeu a vencer o prêmio nessa era',
    year: 2007,
    emoji: '🙏',
  },
  {
    id: 'messi-ballon-2009',
    title: 'Messi vence primeiro Ballon d\'Or',
    description: 'Lionel Messi conquista seu primeiro Ballon d\'Or em 2009, iniciando uma série histórica de premiações',
    year: 2009,
    emoji: '🌟',
  },
  {
    id: 'messi-octavo-ballon',
    title: 'Messi vence 8º Ballon d\'Or',
    description: 'Lionel Messi conquista seu 8º Ballon d\'Or em 2023, após vencer a Copa do Mundo com a Argentina',
    year: 2023,
    emoji: '🏆',
  },
  {
    id: 'var-copa-2018',
    title: 'VAR chega à Copa do Mundo',
    description: 'O árbitro de vídeo (VAR) é utilizado pela primeira vez em uma Copa do Mundo na Rússia em 2018',
    year: 2018,
    emoji: '📺',
  },

  // ── Futebol brasileiro adicional ──
  {
    id: 'corinthians-mundial-2000',
    title: 'Corinthians campeão mundial de clubes',
    description: 'Corinthians vence o primeiro FIFA Club World Cup em 2000, eliminando o Real Madrid nas semifinais',
    year: 2000,
    emoji: '⚫⬜',
  },
  {
    id: 'corinthians-libertadores-2012',
    title: 'Corinthians campeão da Libertadores',
    description: 'Corinthians vence sua primeira Copa Libertadores em 2012 com Tite no comando técnico',
    year: 2012,
    emoji: '⚫⬜',
  },
  {
    id: 'neymar-ouro-olimpico',
    title: 'Brasil conquista ouro olímpico no futebol',
    description: 'Brasil vence a Alemanha nos pênaltis nos Jogos Olímpicos do Rio 2016, conquistando o primeiro ouro olímpico no futebol',
    year: 2016,
    emoji: '🥇',
  },
  {
    id: 'sao-paulo-mundial-1992',
    title: 'São Paulo campeão mundial de clubes',
    description: 'São Paulo FC vence o Campeonato Mundial Intercontinental de 1992 contra o Barcelona',
    year: 1992,
    emoji: '🔴',
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
