export interface ConexoesGroup {
  category: string
  difficulty: 'yellow' | 'green' | 'blue' | 'purple'
  players: string[]
}

export interface DailyConexoes {
  groups: ConexoesGroup[]
}

const PUZZLES: DailyConexoes[] = [
  // Puzzle 0 — 2026-04-16
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no Milan', players: ['Kaka', 'Paolo Maldini', 'Andrea Pirlo', 'Filippo Inzaghi'] },
      { difficulty: 'green',  category: 'Campeões Copa 2002 com Brasil', players: ['Ronaldo Fenomeno', 'Cafu', 'Roberto Carlos', 'Gilberto Silva'] },
      { difficulty: 'blue',   category: 'Jogaram no PSG', players: ['Neymar Jr.', 'Kylian Mbappe', 'Thiago Silva', 'Marquinhos'] },
      { difficulty: 'purple', category: 'Campeões da Champions pelo Real Madrid', players: ['Zinedine Zidane', 'Luka Modric', 'Cristiano Ronaldo', 'Sergio Ramos'] },
    ],
  },
  // Puzzle 1 — 2026-04-17
  {
    groups: [
      { difficulty: 'yellow', category: 'Campeões Copa 1994 com Brasil', players: ['Romario', 'Bebeto', 'Taffarel', 'Dunga'] },
      { difficulty: 'green',  category: 'Jogaram no Arsenal', players: ['Thierry Henry', 'Dennis Bergkamp', 'Gilberto Silva', 'Gabriel Jesus'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2010 com Espanha', players: ['Xavi Hernandez', 'Andres Iniesta', 'Sergio Busquets', 'David Villa'] },
      { difficulty: 'purple', category: 'Ganharam a Bola de Ouro', players: ['Lionel Messi', 'Cristiano Ronaldo', 'Ronaldinho', 'Karim Benzema'] },
    ],
  },
  // Puzzle 2 — 2026-04-18
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no Liverpool', players: ['Mohamed Salah', 'Virgil van Dijk', 'Fabinho', 'Roberto Firmino'] },
      { difficulty: 'green',  category: 'Jogaram no Inter de Milão', players: ['Zlatan Ibrahimovic', 'Adriano Imperador', 'Wesley Sneijder', 'Marco Materazzi'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2022 com Argentina', players: ['Lionel Messi', 'Julian Alvarez', 'Alexis Mac Allister', 'Lautaro Martinez'] },
      { difficulty: 'purple', category: 'Jogaram no Bayern de Munique', players: ['Toni Kroos', 'Arjen Robben', 'Bastian Schweinsteiger', 'Miroslav Klose'] },
    ],
  },
  // Puzzle 3 — 2026-04-19
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes Goleiros', players: ['Gianluigi Buffon', 'Manuel Neuer', 'Iker Casillas', 'Thibaut Courtois'] },
      { difficulty: 'green',  category: 'Jogaram no Chelsea', players: ['Didier Drogba', 'Frank Lampard', 'Eden Hazard', 'Romelu Lukaku'] },
      { difficulty: 'blue',   category: 'Bola de Ouro antes de 1990', players: ['Johan Cruyff', 'Ruud Gullit', 'Marco van Basten', 'Michel Platini'] },
      { difficulty: 'purple', category: 'Jogaram no Manchester City', players: ['Sergio Aguero', 'Kevin De Bruyne', 'Bernardo Silva', 'Vincent Kompany'] },
    ],
  },
  // Puzzle 4 — 2026-04-20
  {
    groups: [
      { difficulty: 'yellow', category: 'Ativos no Real Madrid', players: ['Vinicius Jr.', 'Rodrygo', 'Jude Bellingham', 'Eder Militao'] },
      { difficulty: 'green',  category: 'Jogaram no Barcelona', players: ['Rivaldo', 'Luis Figo', 'Lamine Yamal', 'Gavi'] },
      { difficulty: 'blue',   category: 'Copa 2022 Argentina (defensores e goleiro)', players: ['Angel Di Maria', 'Nicolas Otamendi', 'Cristian Romero', 'Emiliano Martinez'] },
      { difficulty: 'purple', category: 'Jogaram no Atlético de Madrid', players: ['Antoine Griezmann', 'Diego Forlan', 'Alvaro Morata', 'Rodrigo De Paul'] },
    ],
  },
  // Puzzle 5 — 2026-04-21
  {
    groups: [
      { difficulty: 'yellow', category: 'Revelados pelo Flamengo', players: ['Zico', 'Lucas Paqueta', 'Julio Cesar', 'Adriano Imperador'] },
      { difficulty: 'green',  category: 'Jogaram no Napoli', players: ['Edinson Cavani', 'Fabio Cannavaro', 'Fabian Ruiz', 'Kevin De Bruyne'] },
      { difficulty: 'blue',   category: 'Jogaram no Manchester United', players: ['Cristiano Ronaldo', 'Wayne Rooney', 'Paul Scholes', 'Ryan Giggs'] },
      { difficulty: 'purple', category: 'Jogaram na Arábia Saudita', players: ['Neymar Jr.', 'Karim Benzema', "N'Golo Kante", 'Sadio Mane'] },
    ],
  },
  // Puzzle 6 — 2026-04-22
  {
    groups: [
      { difficulty: 'yellow', category: 'Campeões com a França em 1998', players: ['Zinedine Zidane', 'Thierry Henry', 'Marcel Desailly', 'Patrick Vieira'] },
      { difficulty: 'green',  category: 'Jogaram no Borussia Dortmund', players: ['Erling Haaland', 'Robert Lewandowski', 'Shinji Kagawa', 'Ousmane Dembele'] },
      { difficulty: 'blue',   category: 'Jogaram na Juventus', players: ['Alessandro Del Piero', 'Carlos Tevez', 'Paul Pogba', 'Hernanes'] },
      { difficulty: 'purple', category: 'Jogaram no Bayer Leverkusen', players: ['Florian Wirtz', 'Lucio', 'Toni Kroos', 'Juan'] },
    ],
  },
]

const BASE_DATE = new Date('2026-04-16').getTime()
const MS_PER_DAY = 1000 * 60 * 60 * 24

export function getDailyConexoes(): DailyConexoes {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayIndex = Math.floor((today.getTime() - BASE_DATE) / MS_PER_DAY)
  const idx = Math.max(0, dayIndex) % PUZZLES.length
  return PUZZLES[idx]
}

export function calculateConexoesPoints(errors: number, won: boolean): number {
  if (!won) return 0
  return Math.max(10, 100 - errors * 20)
}
