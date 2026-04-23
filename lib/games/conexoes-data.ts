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
  // Puzzle 7 — 2026-04-23
  {
    groups: [
      { difficulty: 'yellow', category: 'Revelados pelo Santos', players: ['Pelé', 'Robinho', 'Neymar Jr.', 'Ganso'] },
      { difficulty: 'green',  category: 'Jogaram no Sevilla', players: ['Ivan Rakitic', 'Jesus Navas', 'Carlos Bacca', 'Ever Banega'] },
      { difficulty: 'blue',   category: 'Campeões Copa 1998 com França', players: ['Lilian Thuram', 'Emmanuel Petit', 'Robert Pires', 'Didier Deschamps'] },
      { difficulty: 'purple', category: 'Jogaram no Porto', players: ['Falcao Garcia', 'Deco', 'Fernando', 'Alex Sandro'] },
    ],
  },
  // Puzzle 8 — 2026-04-24
  {
    groups: [
      { difficulty: 'yellow', category: 'Artilheiros históricos da Liga dos Campeões', players: ['Cristiano Ronaldo', 'Lionel Messi', 'Raul', 'Karim Benzema'] },
      { difficulty: 'green',  category: 'Jogaram no Tottenham', players: ['Harry Kane', 'Gareth Bale', 'Dimitar Berbatov', 'Ledley King'] },
      { difficulty: 'blue',   category: 'Revelados pelo Corinthians', players: ['Rivaldo', 'Alexandre Pato', 'Socrates', 'Malcom'] },
      { difficulty: 'purple', category: 'Jogaram no Roma', players: ['Francesco Totti', 'Daniele De Rossi', 'Gabriel Batistuta', 'Radja Nainggolan'] },
    ],
  },
  // Puzzle 9 — 2026-04-25
  {
    groups: [
      { difficulty: 'yellow', category: 'Zagueiros ídolos do Brasil', players: ['Lucio', 'Aldair', 'Thiago Silva', 'Juan'] },
      { difficulty: 'green',  category: 'Jogaram no Olympique de Marselha', players: ['Didier Drogba', 'Samir Nasri', 'Mamadou Niang', 'Andre-Pierre Gignac'] },
      { difficulty: 'blue',   category: 'Campeões Copa do Mundo 2010 com Espanha', players: ['Carles Puyol', 'Gerard Pique', 'Cesc Fabregas', 'Fernando Torres'] },
      { difficulty: 'purple', category: 'Jogaram no Benfica', players: ['Eusebio', 'Rui Costa', 'Angel Di Maria', 'Darwin Nunez'] },
    ],
  },
  // Puzzle 10 — 2026-04-26
  {
    groups: [
      { difficulty: 'yellow', category: 'Artilheiros históricos da Premier League', players: ['Alan Shearer', 'Wayne Rooney', 'Andrew Cole', 'Frank Lampard'] },
      { difficulty: 'green',  category: 'Jogaram no São Paulo FC', players: ['Socrates', 'Rai', 'Hernanes', 'Rogerio Ceni'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2006 com Itália', players: ['Gianluigi Buffon', 'Fabio Cannavaro', 'Andrea Pirlo', 'Francesco Totti'] },
      { difficulty: 'purple', category: 'Jogaram no Shakhtar Donetsk', players: ['Willian', 'Fernandinho', 'Douglas Costa', 'Fred'] },
    ],
  },
  // Puzzle 11 — 2026-04-27
  {
    groups: [
      { difficulty: 'yellow', category: 'Revelados pelo Grêmio', players: ['Ronaldinho Gaucho', 'Lucas Leiva', 'Anderson', 'Ramiro'] },
      { difficulty: 'green',  category: 'Jogaram no Valencia', players: ['David Villa', 'David Silva', 'Pablo Aimar', 'Gaizka Mendieta'] },
      { difficulty: 'blue',   category: 'Ícones da Seleção Portuguesa', players: ['Luis Figo', 'Rui Costa', 'Pauleta', 'Eusebio'] },
      { difficulty: 'purple', category: 'Jogaram no Lazio', players: ['Miroslav Klose', 'Pavel Nedved', 'Alessandro Nesta', 'Ciro Immobile'] },
    ],
  },
  // Puzzle 12 — 2026-04-28
  {
    groups: [
      { difficulty: 'yellow', category: 'Goleiros campeões da Copa 2002 com Brasil', players: ['Marcos', 'Dida', 'Rogerio Ceni', 'Taffarel'] },
      { difficulty: 'green',  category: 'Jogaram no Monaco', players: ['Thierry Henry', 'David Trezeguet', 'Emmanuel Petit', 'Kylian Mbappe'] },
      { difficulty: 'blue',   category: 'Campeões da Copa América com Argentina', players: ['Lionel Messi', 'Sergio Aguero', 'Carlos Tevez', 'Javier Zanetti'] },
      { difficulty: 'purple', category: 'Jogaram no Ajax', players: ['Johan Cruyff', 'Edwin van der Sar', 'Patrick Kluivert', 'Clarence Seedorf'] },
    ],
  },
  // Puzzle 13 — 2026-04-29
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no Fluminense', players: ['Thiago Silva', 'Fred', 'Deco', 'Ronaldinho Gaucho'] },
      { difficulty: 'green',  category: 'Jogaram no Celtic', players: ['Henrik Larsson', 'Chris Sutton', 'Neil Lennon', 'John Hartson'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2014 com Alemanha', players: ['Thomas Muller', 'Manuel Neuer', 'Mesut Ozil', 'Miroslav Klose'] },
      { difficulty: 'purple', category: 'Jogaram no Zenit São Petersburgo', players: ['Hulk', 'Nicolas Lombaerts', 'Axel Witsel', 'Danny'] },
    ],
  },
  // Puzzle 14 — 2026-04-30
  {
    groups: [
      { difficulty: 'yellow', category: 'Maiores artilheiros da história da Copa do Mundo', players: ['Miroslav Klose', 'Ronaldo Fenomeno', 'Gerd Muller', 'Just Fontaine'] },
      { difficulty: 'green',  category: 'Jogaram no Leicester City', players: ['Jamie Vardy', 'Riyad Mahrez', "N'Golo Kante", 'Kasper Schmeichel'] },
      { difficulty: 'blue',   category: 'Jogaram na Seleção Holandesa nos anos 90', players: ['Dennis Bergkamp', 'Ruud van Nistelrooy', 'Edgar Davids', 'Clarence Seedorf'] },
      { difficulty: 'purple', category: 'Jogaram no Galatasaray', players: ['Hakan Sukur', 'Didier Drogba', 'Gheorghe Hagi', 'Nicolas Anelka'] },
    ],
  },
  // Puzzle 15 — 2026-05-01
  {
    groups: [
      { difficulty: 'yellow', category: 'Meias históricos brasileiros', players: ['Zico', 'Socrates', 'Rai', 'Juninho Pernambucano'] },
      { difficulty: 'green',  category: 'Jogaram no Newcastle', players: ['Alan Shearer', 'David Ginola', 'Les Ferdinand', 'Hatem Ben Arfa'] },
      { difficulty: 'blue',   category: 'Campeões Copa 1998 com Brasil (jogadores chave)', players: ['Ronaldo Fenomeno', 'Rivaldo', 'Leonardo', 'Cafu'] },
      { difficulty: 'purple', category: 'Jogaram no Inter Miami', players: ['Lionel Messi', 'Sergio Busquets', 'Jordi Alba', 'Luis Suarez'] },
    ],
  },
  // Puzzle 16 — 2026-05-02
  {
    groups: [
      { difficulty: 'yellow', category: 'Laterais ícones do futebol mundial', players: ['Cafu', 'Roberto Carlos', 'Philipp Lahm', 'Paolo Maldini'] },
      { difficulty: 'green',  category: 'Jogaram no Porto (portugueses)', players: ['Deco', 'Fernando Couto', 'Costinha', 'Pedro Mendes'] },
      { difficulty: 'blue',   category: 'Atacantes da seleção inglesa nos anos 2000', players: ['Michael Owen', 'Emile Heskey', 'Teddy Sheringham', 'Peter Crouch'] },
      { difficulty: 'purple', category: 'Geração de Ouro da Seleção Belga', players: ['Eden Hazard', 'Kevin De Bruyne', 'Romelu Lukaku', 'Axel Witsel'] },
    ],
  },
  // Puzzle 17 — 2026-05-03
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no Cruzeiro', players: ['Ronaldo Fenomeno', 'Alex', 'Edilson', 'Deivid'] },
      { difficulty: 'green',  category: 'Jogaram no Villarreal', players: ['Diego Forlan', 'Santi Cazorla', 'Juan Roman Riquelme', 'Robert Pires'] },
      { difficulty: 'blue',   category: 'Campeões da Eurocopa 2020 (2021) com Itália', players: ['Gianluigi Donnarumma', 'Leonardo Bonucci', 'Jorginho', 'Marco Verratti'] },
      { difficulty: 'purple', category: 'Jogaram no Fenerbahce', players: ['Roberto Carlos', 'Nicolas Anelka', 'Mateja Kezman', 'Pierre van Hooijdonk'] },
    ],
  },
  // Puzzle 18 — 2026-05-04
  {
    groups: [
      { difficulty: 'yellow', category: 'Pontas velozes históricos', players: ['Arjen Robben', 'Franck Ribery', 'Gareth Bale', 'Marc Overmars'] },
      { difficulty: 'green',  category: 'Jogaram no Vasco da Gama', players: ['Romario', 'Edmundo', 'Juninho Pernambucano', 'Mauro Galvao'] },
      { difficulty: 'blue',   category: 'Jogaram no Manchester City (era Guardiola)', players: ['Raheem Sterling', 'Leroy Sane', 'Gabriel Jesus', 'Sergio Aguero'] },
      { difficulty: 'purple', category: 'Jogaram no Olympique de Lyon', players: ['Karim Benzema', 'Samuel Umtiti', 'Nabil Fekir', 'Alexandre Lacazette'] },
    ],
  },
  // Puzzle 19 — 2026-05-05
  {
    groups: [
      { difficulty: 'yellow', category: 'Atacantes ícones do Botafogo', players: ['Garrincha', 'Jairzinho', 'Tulio Maravilha', 'Loco Abreu'] },
      { difficulty: 'green',  category: 'Jogaram no Athletic Club de Bilbao', players: ['Fernando Llorente', 'Aritz Aduriz', 'Javi Martinez', 'Iker Muniain'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2002 com Brasil (meia-atacantes)', players: ['Ronaldinho Gaucho', 'Rivaldo', 'Edilson', 'Kleberson'] },
      { difficulty: 'purple', category: 'Jogaram no Inter de Milão nos anos 2000', players: ['Ronaldo Fenomeno', 'Hernan Crespo', 'Dejan Stankovic', 'Luis Figo'] },
    ],
  },
  // Puzzle 20 — 2026-05-06
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas do futebol brasileiro (décadas 70-80)', players: ['Pelé', 'Zico', 'Socrates', 'Falcao'] },
      { difficulty: 'green',  category: 'Jogaram no Feyenoord', players: ['Robin van Persie', 'Dirk Kuyt', 'Giovanni van Bronckhorst', 'Virgil van Dijk'] },
      { difficulty: 'blue',   category: 'Jogaram no Atlético Mineiro', players: ['Ronaldinho Gaucho', 'Diego Tardelli', 'Bernard', 'Hulk'] },
      { difficulty: 'purple', category: 'Jogaram na MLS (Major League Soccer)', players: ['David Beckham', 'Thierry Henry', 'Kaka', 'Bastian Schweinsteiger'] },
    ],
  },
  // Puzzle 21 — 2026-05-07
  {
    groups: [
      { difficulty: 'yellow', category: 'Campeões Libertadores 2019 com Flamengo', players: ['Gabigol', 'Bruno Henrique', 'Everton Ribeiro', 'Rodrigo Caio'] },
      { difficulty: 'green',  category: 'Jogaram no Palmeiras', players: ['Rivaldo', 'Roberto Carlos', 'Ze Roberto', 'Marcos'] },
      { difficulty: 'blue',   category: 'Copa 2010 — Holanda (finalistas)', players: ['Arjen Robben', 'Robin van Persie', 'Wesley Sneijder', 'Dirk Kuyt'] },
      { difficulty: 'purple', category: 'Foram jogadores E técnicos do mesmo clube', players: ['Zinedine Zidane', 'Pep Guardiola', 'Frank Lampard', 'Didier Deschamps'] },
    ],
  },
  // Puzzle 22 — 2026-05-08
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no Sporting CP', players: ['Cristiano Ronaldo', 'Luis Figo', 'Ricardo Quaresma', 'Nani'] },
      { difficulty: 'green',  category: 'Campeões Copa 1986 com Argentina', players: ['Diego Maradona', 'Jorge Valdano', 'Oscar Ruggeri', 'Jorge Burruchaga'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2018 com França', players: ['Kylian Mbappe', 'Antoine Griezmann', "N'Golo Kante", 'Raphael Varane'] },
      { difficulty: 'purple', category: 'Capitães campeões em Copa do Mundo', players: ['Dunga', 'Diego Maradona', 'Dino Zoff', 'Hugo Lloris'] },
    ],
  },
  // Puzzle 23 — 2026-05-09
  {
    groups: [
      { difficulty: 'yellow', category: 'Usaram a camisa 10 pela Seleção Brasileira', players: ['Pelé', 'Zico', 'Ronaldinho', 'Neymar Jr.'] },
      { difficulty: 'green',  category: 'Ganharam a Bola de Ouro jogando no Real Madrid', players: ['Cristiano Ronaldo', 'Luka Modric', 'Karim Benzema', 'Ronaldo Fenomeno'] },
      { difficulty: 'blue',   category: 'Maiores artilheiros históricos da LaLiga', players: ['Lionel Messi', 'Cristiano Ronaldo', 'Hugo Sanchez', 'Telmo Zarra'] },
      { difficulty: 'purple', category: 'Revelados pelo São Paulo FC', players: ['Cafu', 'Raí', 'Zetti', 'Casemiro'] },
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
