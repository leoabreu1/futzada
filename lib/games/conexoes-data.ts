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
      { difficulty: 'purple', category: 'Capitães campeões em Copa do Mundo', players: ['Dunga', 'Franz Beckenbauer', 'Dino Zoff', 'Hugo Lloris'] },
    ],
  },
  // Puzzle 23 — 2026-05-09
  {
    groups: [
      { difficulty: 'yellow', category: 'Usaram a camisa 10 pela Seleção Brasileira', players: ['Pelé', 'Zico', 'Ronaldinho', 'Neymar Jr.'] },
      { difficulty: 'green',  category: 'Ganharam a Bola de Ouro jogando no Real Madrid', players: ['Cristiano Ronaldo', 'Luka Modric', 'Karim Benzema', 'Ronaldo Fenomeno'] },
      { difficulty: 'blue',   category: 'Maiores artilheiros históricos da LaLiga', players: ['Lionel Messi', 'Raul Gonzalez', 'Hugo Sanchez', 'Telmo Zarra'] },
      { difficulty: 'purple', category: 'Revelados pelo São Paulo FC', players: ['Cafu', 'Raí', 'Zetti', 'Casemiro'] },
    ],
  },
  // Puzzle 24 — 2026-05-10
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no Galatasaray', players: ['Didier Drogba', 'Ryan Babel', 'Radamel Falcao', 'Lukas Podolski'] },
      { difficulty: 'green',  category: 'Jogaram na Juventus (anos 2010)', players: ['Carlos Tevez', 'Paul Pogba', 'Gonzalo Higuain', 'Arturo Vidal'] },
      { difficulty: 'blue',   category: 'Copa 2014 com Alemanha', players: ['Toni Kroos', 'Thomas Muller', 'Manuel Neuer', 'Mesut Ozil'] },
      { difficulty: 'purple', category: 'Revelados pelo Benfica', players: ['Eusebio', 'Rui Costa', 'Joao Felix', 'Bernardo Silva'] },
    ],
  },
  // Puzzle 25 — 2026-05-11
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no AS Roma', players: ['Francesco Totti', 'Daniele De Rossi', 'Gabriel Batistuta', 'Mohamed Salah'] },
      { difficulty: 'green',  category: 'Jogaram no Corinthians', players: ['Ronaldo Fenomeno', 'Roberto Carlos', 'Adriano Imperador', 'Socrates'] },
      { difficulty: 'blue',   category: 'Artilheiros históricos da Champions League', players: ['Raul Gonzalez', 'Ruud van Nistelrooy', 'Andriy Shevchenko', 'Filippo Inzaghi'] },
      { difficulty: 'purple', category: 'Campeões da Champions 2015 com o Barcelona', players: ['Neymar Jr.', 'Luis Suarez', 'Ivan Rakitic', 'Sergio Busquets'] },
    ],
  },
  // Puzzle 26 — 2026-05-12
  {
    groups: [
      { difficulty: 'yellow', category: 'Ídolos históricos de Portugal', players: ['Cristiano Ronaldo', 'Luis Figo', 'Eusebio', 'Rui Costa'] },
      { difficulty: 'green',  category: 'Jogaram no Sevilla', players: ['Frederic Kanoute', 'Jose Antonio Reyes', 'Ivan Rakitic', 'Diego Forlan'] },
      { difficulty: 'blue',   category: 'Capitães do Brasil em Copas do Mundo', players: ['Dunga', 'Thiago Silva', 'Carlos Alberto Torres', 'Mauro Silva'] },
      { difficulty: 'purple', category: 'Top-4 artilheiros de todos os tempos em Copas', players: ['Miroslav Klose', 'Ronaldo Fenomeno', 'Gerd Muller', 'Just Fontaine'] },
    ],
  },
  // Puzzle 27 — 2026-05-13
  {
    groups: [
      { difficulty: 'yellow', category: 'Ídolos históricos do São Paulo FC', players: ['Cafu', 'Raí', 'Müller', 'Zetti'] },
      { difficulty: 'green',  category: 'Campeões Copa 2006 com Itália', players: ['Gianluigi Buffon', 'Fabio Cannavaro', 'Andrea Pirlo', 'Luca Toni'] },
      { difficulty: 'blue',   category: 'Jogaram no Manchester United (era Ferguson)', players: ['Ryan Giggs', 'Roy Keane', 'Peter Schmeichel', 'Ole Gunnar Solskjaer'] },
      { difficulty: 'purple', category: 'Jogaram no Napoli na era Maradona', players: ['Diego Maradona', 'Careca', 'Bruno Giordano', 'Ciro Ferrara'] },
    ],
  },
  // Puzzle 28 — 2026-05-14
  {
    groups: [
      { difficulty: 'yellow', category: 'Ídolos do Flamengo', players: ['Zico', 'Ronaldinho', 'Gabigol', 'Everton Ribeiro'] },
      { difficulty: 'green',  category: 'Campeões Eurocopa 2012 com Espanha', players: ['Andres Iniesta', 'Fernando Torres', 'David Silva', 'Cesc Fabregas'] },
      { difficulty: 'blue',   category: 'Jogaram no Borussia Dortmund', players: ['Robert Lewandowski', 'Mario Gotze', 'Marco Reus', 'Mats Hummels'] },
      { difficulty: 'purple', category: 'Saíram do Santos FC para o mundo', players: ['Pelé', 'Neymar Jr.', 'Robinho', 'Diego Ribas'] },
    ],
  },
  // Puzzle 29 — 2026-05-15
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no Grêmio', players: ['Ronaldinho', 'Renato Gaucho', 'Lucas Barrios', 'Anderson'] },
      { difficulty: 'green',  category: 'Copa América 2019 com Brasil', players: ['Dani Alves', 'Roberto Firmino', 'Everton Cebolinha', 'Arthur'] },
      { difficulty: 'blue',   category: 'Capitães vencedores de Copa do Mundo', players: ['Dunga', 'Diego Maradona', 'Didier Deschamps', 'Franz Beckenbauer'] },
      { difficulty: 'purple', category: 'Brasileiros campeões da Copa do Mundo E da Champions', players: ['Ronaldo Fenomeno', 'Roberto Carlos', 'Kaka', 'Cafu'] },
    ],
  },
  // Puzzle 30 — 2026-05-16
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas do Botafogo', players: ['Garrincha', 'Jairzinho', 'Nilton Santos', 'Tulio Maravilha'] },
      { difficulty: 'green',  category: 'Jogaram no Monaco', players: ['Thierry Henry', 'Kylian Mbappe', 'Bernardo Silva', 'Dimitar Berbatov'] },
      { difficulty: 'blue',   category: 'Jogaram no Valencia CF', players: ['David Silva', 'David Villa', 'Gaizka Mendieta', 'Juan Mata'] },
      { difficulty: 'purple', category: 'Brasileiros que jogaram no Barcelona', players: ['Ronaldo Fenomeno', 'Ronaldinho', 'Neymar Jr.', 'Dani Alves'] },
    ],
  },
  // Puzzle 31 — 2026-05-17
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no FC Porto', players: ['Deco', 'Hulk', 'Radamel Falcao', 'Diego Ribas'] },
      { difficulty: 'green',  category: 'Jogaram no PSG (era moderna)', players: ['Thiago Silva', 'Zlatan Ibrahimovic', 'Lucas Moura', 'Edinson Cavani'] },
      { difficulty: 'blue',   category: 'Campeões Copa América 2021 com Argentina', players: ['Lionel Messi', 'Angel Di Maria', 'Lautaro Martinez', 'Emiliano Martinez'] },
      { difficulty: 'purple', category: 'Campeões olímpicos no futebol pelo Brasil', players: ['Neymar Jr.', 'Dani Alves', 'Richarlison', 'Everton Cebolinha'] },
    ],
  },
  // Puzzle 32 — 2026-05-18
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas do Internacional (RS)', players: ["Falcao", "D'Alessandro", "Tinga", "Fernandao"] },
      { difficulty: 'green',  category: 'Jogaram no Everton FC', players: ['Tim Cahill', 'Wayne Rooney', 'Mikel Arteta', 'Romelu Lukaku'] },
      { difficulty: 'blue',   category: 'Campeões Copa 1966 com Inglaterra', players: ['Bobby Charlton', 'Geoff Hurst', 'Bobby Moore', 'Gordon Banks'] },
      { difficulty: 'purple', category: 'Campeões da Champions 2012 com Chelsea', players: ['Didier Drogba', 'Frank Lampard', 'John Terry', 'Ashley Cole'] },
    ],
  },
  // Puzzle 33 — 2026-05-19
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes centroavantes da Argentina', players: ['Gabriel Batistuta', 'Hernan Crespo', 'Sergio Aguero', 'Carlos Tevez'] },
      { difficulty: 'green',  category: 'Jogaram no Wolverhampton', players: ['Raul Jimenez', 'Diogo Jota', 'Joao Moutinho', 'Ruben Neves'] },
      { difficulty: 'blue',   category: 'Jogaram no Schalke 04', players: ['Mesut Ozil', 'Raul Gonzalez', 'Klaas-Jan Huntelaar', 'Jefferson Farfan'] },
      { difficulty: 'purple', category: 'Artilheiros históricos da Serie A italiana', players: ['Francesco Totti', 'Giuseppe Meazza', 'Silvio Piola', 'Gunnar Nordahl'] },
    ],
  },
  // Puzzle 34 — 2026-05-20
  {
    groups: [
      { difficulty: 'yellow', category: 'Meias de elite da geração 2000', players: ['Xavi Hernandez', 'Andrea Pirlo', 'Steven Gerrard', 'Frank Lampard'] },
      { difficulty: 'green',  category: 'Jogaram no West Ham', players: ['Paolo Di Canio', 'Dimitri Payet', 'Joe Cole', 'Carlos Tevez'] },
      { difficulty: 'blue',   category: 'Artilheiros de Copa do Mundo por edição', players: ['Just Fontaine', 'Eusebio', 'Gerd Muller', 'Salvatore Schillaci'] },
      { difficulty: 'purple', category: 'Ganharam o Golden Ball na Copa do Mundo', players: ['Zinedine Zidane', 'Luka Modric', 'Diego Maradona', 'Romario'] },
    ],
  },
  // Puzzle 35 — 2026-05-21
  {
    groups: [
      { difficulty: 'yellow', category: 'Revelados pela La Masia (Barcelona)', players: ['Xavi Hernandez', 'Andres Iniesta', 'Carles Puyol', 'Gerard Pique'] },
      { difficulty: 'green',  category: 'Jogaram no Leeds United', players: ['Eric Cantona', 'Gordon Strachan', 'Mark Viduka', 'Rio Ferdinand'] },
      { difficulty: 'blue',   category: 'Jogaram no Besiktas', players: ['Ricardo Quaresma', 'Demba Ba', 'Mario Gomez', 'Lorik Cana'] },
      { difficulty: 'purple', category: 'Jogaram no Inter de Milão E no AC Milan', players: ['Ronaldo Fenomeno', 'Clarence Seedorf', 'Zlatan Ibrahimovic', 'Hernan Crespo'] },
    ],
  },
  // Puzzle 36 — 2026-05-22
  {
    groups: [
      { difficulty: 'yellow', category: 'Ídolos históricos do Grêmio', players: ['Renato Gaucho', 'Ronaldinho Gaucho', 'Lucas Leiva', 'Anderson'] },
      { difficulty: 'green',  category: 'Jogaram no Stoke City', players: ['Peter Crouch', 'Marko Arnautovic', 'Bojan Krkic', 'Asmir Begovic'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2018 com França (outros)', players: ['Hugo Lloris', 'Paul Pogba', 'Benjamin Pavard', 'Olivier Giroud'] },
      { difficulty: 'purple', category: 'Jogaram no Red Bull Leipzig', players: ['Timo Werner', 'Marcel Sabitzer', 'Emil Forsberg', 'Naby Keita'] },
    ],
  },
  // Puzzle 37 — 2026-05-23
  {
    groups: [
      { difficulty: 'yellow', category: 'Zagueiros históricos da Alemanha', players: ['Franz Beckenbauer', 'Mats Hummels', 'Per Mertesacker', 'Jurgen Kohler'] },
      { difficulty: 'green',  category: 'Jogaram no Olympique de Lyon', players: ['Juninho Pernambucano', 'Michael Essien', 'Hatem Ben Arfa', 'Nabil Fekir'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2014 com Alemanha (outros)', players: ['Mario Gotze', 'Philipp Lahm', 'Jerome Boateng', 'Sami Khedira'] },
      { difficulty: 'purple', category: 'Ídolos do Internazionale de Milão', players: ['Javier Zanetti', 'Christian Vieri', 'Adriano Imperador', "Samuel Eto'o"] },
    ],
  },
  // Puzzle 38 — 2026-05-24
  {
    groups: [
      { difficulty: 'yellow', category: 'Ídolos históricos do Vasco da Gama', players: ['Romario', 'Edmundo', 'Roberto Dinamite', 'Juninho Pernambucano'] },
      { difficulty: 'green',  category: 'Jogaram no Fulham', players: ['Luis Boa Morte', 'Steed Malbranque', 'Brian McBride', 'Clint Dempsey'] },
      { difficulty: 'blue',   category: 'Campeões Eurocopa 2016 com Portugal', players: ['Cristiano Ronaldo', 'Joao Moutinho', 'Renato Sanches', 'Pepe'] },
      { difficulty: 'purple', category: 'Jogaram no Manchester City E no Arsenal', players: ['Patrick Vieira', 'Nicolas Anelka', 'Sylvinho', 'Emmanuel Adebayor'] },
    ],
  },
  // Puzzle 39 — 2026-05-25
  {
    groups: [
      { difficulty: 'yellow', category: 'Goleiros lendários dos anos 90', players: ['Peter Schmeichel', 'Fabien Barthez', 'Dida', 'Oliver Kahn'] },
      { difficulty: 'green',  category: 'Jogaram no Atlético de Madrid moderno', players: ['Radamel Falcao', 'Diego Godin', 'Koke', 'Fernando Torres'] },
      { difficulty: 'blue',   category: 'Jogaram no Napoli (pós-Maradona)', players: ['Lorenzo Insigne', 'Dries Mertens', 'Marek Hamsik', 'Kalidou Koulibaly'] },
      { difficulty: 'purple', category: 'Foram capitães campeões da Champions League', players: ['Carles Puyol', 'John Terry', 'Philipp Lahm', 'Sergio Ramos'] },
    ],
  },
  // Puzzle 40 — 2026-05-26
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram na Fiorentina', players: ['Gabriel Batistuta', 'Roberto Baggio', 'Adrian Mutu', 'Luca Toni'] },
      { difficulty: 'green',  category: 'Jogaram no Middlesbrough', players: ['Juninho Pernambucano', 'Emerson', 'Fabrizio Ravanelli', 'Gareth Southgate'] },
      { difficulty: 'blue',   category: 'Copa 2002 com Brasil (meias e atacantes)', players: ['Ronaldinho Gaucho', 'Rivaldo', 'Juninho Paulista', 'Kleberson'] },
      { difficulty: 'purple', category: 'Foram para a MLS no fim da carreira', players: ['David Beckham', 'Thierry Henry', 'Kaka', 'Andrea Pirlo'] },
    ],
  },
  // Puzzle 41 — 2026-05-27
  {
    groups: [
      { difficulty: 'yellow', category: 'Meias e fantasistas históricos da Itália', players: ['Andrea Pirlo', 'Roberto Baggio', 'Alessandro Del Piero', 'Francesco Totti'] },
      { difficulty: 'green',  category: 'Jogaram no Werder Bremen', players: ['Miroslav Klose', 'Claudio Pizarro', 'Johan Micoud', 'Diego Ribas'] },
      { difficulty: 'blue',   category: 'Copa 1994 Brasil (defensores e volantes)', players: ['Mauro Silva', 'Marcio Santos', 'Aldair', 'Mazinho'] },
      { difficulty: 'purple', category: 'Jogaram no New York Red Bulls', players: ['Thierry Henry', 'Tim Cahill', 'Rafa Marquez', 'Jozy Altidore'] },
    ],
  },
  // Puzzle 42 — 2026-05-28
  {
    groups: [
      { difficulty: 'yellow', category: 'Atacantes da Seleção Francesa nos anos 2000', players: ['Thierry Henry', 'Nicolas Anelka', 'David Trezeguet', 'Sylvain Wiltord'] },
      { difficulty: 'green',  category: 'Jogaram no Sampdoria', players: ['Gianluca Vialli', 'Roberto Mancini', 'Graeme Souness', 'David Platt'] },
      { difficulty: 'blue',   category: 'Jogaram na Celtic FC (era moderna)', players: ['Henrik Larsson', 'Stilian Petrov', 'Robbie Keane', 'Virgil van Dijk'] },
      { difficulty: 'purple', category: 'Jogaram no Barcelona E no Real Madrid', players: ['Luis Figo', 'Michael Laudrup', 'Bernd Schuster', 'Samuel Eto\'o'] },
    ],
  },
  // Puzzle 43 — 2026-05-29
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes volantes brasileiros', players: ['Gilberto Silva', 'Mauro Silva', 'Fernandinho', 'Casemiro'] },
      { difficulty: 'green',  category: 'Jogaram no Villarreal (outros)', players: ['Juan Roman Riquelme', 'Marcos Senna', 'Giuseppe Rossi', 'Bruno Soriano'] },
      { difficulty: 'blue',   category: 'Jogaram no Paris Saint-Germain nos anos 90', players: ['George Weah', 'Youri Djorkaeff', 'Valdo', 'Rai'] },
      { difficulty: 'purple', category: 'Definiram finais de Copa do Mundo com um gol', players: ['Geoff Hurst', 'Mario Gotze', 'Andres Iniesta', 'Mario Kempes'] },
    ],
  },
  // Puzzle 44 — 2026-05-30
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas do Palmeiras', players: ['Rivaldo', 'Ze Roberto', 'Marcos', 'Edmundo'] },
      { difficulty: 'green',  category: 'Jogaram no Aston Villa', players: ['Paul McGrath', 'Dwight Yorke', 'Gareth Barry', 'Christian Benteke'] },
      { difficulty: 'blue',   category: 'Campeões Copa 1970 com Brasil', players: ['Pelé', 'Rivelino', 'Jairzinho', 'Tostao'] },
      { difficulty: 'purple', category: 'Jogaram no Trabzonspor', players: ['Shota Arveladze', 'Hami Mandirali', 'Didier Zokora', 'Fatih Tekke'] },
    ],
  },
  // Puzzle 45 — 2026-05-31
  {
    groups: [
      { difficulty: 'yellow', category: 'Zagueiros da Seleção Brasileira anos 2000', players: ['Lucio', 'Roque Junior', 'Juan', 'Miranda'] },
      { difficulty: 'green',  category: 'Jogaram no Southampton', players: ['Matthew Le Tissier', 'Alan Shearer', 'Rickie Lambert', 'Sadio Mane'] },
      { difficulty: 'blue',   category: 'Copa 1982 — Brasil que encantou', players: ['Zico', 'Socrates', 'Falcao', 'Eder'] },
      { difficulty: 'purple', category: 'Jogaram no Kaiserslautern', players: ['Miroslav Klose', 'Michael Ballack', 'Youri Djorkaeff', 'Karl-Heinz Riedle'] },
    ],
  },
  // Puzzle 46 — 2026-06-01
  {
    groups: [
      { difficulty: 'yellow', category: 'Campeões da Champions 2005 com Liverpool', players: ['Steven Gerrard', 'Xabi Alonso', 'Luis Garcia', 'Djibril Cisse'] },
      { difficulty: 'green',  category: 'Jogaram no Celta de Vigo', players: ['Iago Aspas', 'Gustavo Lopez', 'Bebeto', 'Benni McCarthy'] },
      { difficulty: 'blue',   category: 'Jogaram no PSV Eindhoven', players: ['Ruud van Nistelrooy', 'Romario', 'Mark van Bommel', 'Arjen Robben'] },
      { difficulty: 'purple', category: 'Jogaram no Boca Juniors', players: ['Diego Maradona', 'Juan Roman Riquelme', 'Martin Palermo', 'Carlos Tevez'] },
    ],
  },
  // Puzzle 47 — 2026-06-02
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram na Udinese', players: ['Alexis Sanchez', 'Juan Cuadrado', 'Antonio Di Natale', 'Oliver Bierhoff'] },
      { difficulty: 'green',  category: 'Jogaram no Parma FC', players: ['Gianluigi Buffon', 'Hernan Crespo', 'Fabio Cannavaro', 'Lilian Thuram'] },
      { difficulty: 'blue',   category: 'Copa 1958 — Brasil no Mundial', players: ['Pelé', 'Garrincha', 'Didi', 'Vava'] },
      { difficulty: 'purple', category: 'Jogaram no Napoli moderno (Higuain, Cavani era)', players: ['Gonzalo Higuain', 'Edinson Cavani', 'Ezequiel Lavezzi', 'Goran Pandev'] },
    ],
  },
  // Puzzle 48 — 2026-06-03
  {
    groups: [
      { difficulty: 'yellow', category: 'Meias-atacantes históricos do Brasil', players: ['Zico', 'Ronaldinho Gaucho', 'Rivaldo', 'Kaka'] },
      { difficulty: 'green',  category: 'Jogaram no Hamburger SV', players: ['Uwe Seeler', 'Kevin Keegan', 'Ruud van Nistelrooy', 'Rafael van der Vaart'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2006 com Itália (menos famosos)', players: ['Alberto Gilardino', 'Vincenzo Iaquinta', 'Mauro Camoranesi', 'Simone Perrotta'] },
      { difficulty: 'purple', category: 'Jogaram no Borussia Monchengladbach', players: ['Gunter Netzer', 'Berti Vogts', 'Lothar Matthaus', 'Granit Xhaka'] },
    ],
  },
  // Puzzle 49 — 2026-06-04
  {
    groups: [
      { difficulty: 'yellow', category: 'Atacantes históricos da Holanda', players: ['Marco van Basten', 'Ruud van Nistelrooy', 'Robin van Persie', 'Patrick Kluivert'] },
      { difficulty: 'green',  category: 'Jogaram no Deportivo La Coruña', players: ['Roy Makaay', 'Diego Tristan', 'Djalminha', 'Juan Carlos Valeron'] },
      { difficulty: 'blue',   category: 'Campeões Eurocopa 2008 com Espanha', players: ['Xavi Hernandez', 'Andres Iniesta', 'David Villa', 'David Silva'] },
      { difficulty: 'purple', category: 'Jogaram no Galatasaray (era moderna)', players: ['Wesley Sneijder', 'Radamel Falcao', 'Lukas Podolski', 'Ryan Babel'] },
    ],
  },
  // Puzzle 50 — 2026-06-05
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no Cruzeiro (modernos)', players: ['Alex', 'Fred', 'Robinho', 'Willian'] },
      { difficulty: 'green',  category: 'Jogaram no Sporting CP (modernos)', players: ['Rui Patricio', 'William Carvalho', 'Bruno Fernandes', 'Bas Dost'] },
      { difficulty: 'blue',   category: 'Copa 1974 com Alemanha Ocidental', players: ['Gerd Muller', 'Franz Beckenbauer', 'Paul Breitner', 'Sepp Maier'] },
      { difficulty: 'purple', category: 'Jogaram no River Plate', players: ['Marcelo Gallardo', 'Ariel Ortega', 'Hernan Crespo', 'Mario Kempes'] },
    ],
  },
  // Puzzle 51 — 2026-06-06
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no Santos FC (geração 2010)', players: ['Neymar Jr.', 'Ganso', 'Elano', 'Robinho'] },
      { difficulty: 'green',  category: 'Jogaram no CSKA Moscou', players: ['Vagner Love', 'Seydou Doumbia', 'Alan Dzagoev', 'Sergei Ignashevich'] },
      { difficulty: 'blue',   category: 'Copa 1994 Brasil (atacantes e meias)', players: ['Romario', 'Bebeto', 'Mauro Silva', 'Mazinho'] },
      { difficulty: 'purple', category: 'Jogaram no Rayo Vallecano', players: ['Roberto Trashorras', 'Michu', 'Lass Diarra', 'Diego Costa'] },
    ],
  },
  // Puzzle 52 — 2026-06-07
  {
    groups: [
      { difficulty: 'yellow', category: 'Laterais-direitos históricos do Brasil', players: ['Cafu', 'Maicon', 'Dani Alves', 'Carlos Alberto Torres'] },
      { difficulty: 'green',  category: 'Jogaram no Sunderland', players: ['Kevin Phillips', 'Niall Quinn', 'Jordan Henderson', 'Darren Bent'] },
      { difficulty: 'blue',   category: 'Heróis menos lembrados da Copa 2014 Alemanha', players: ['Andre Schurrle', 'Christoph Kramer', 'Benedikt Howedes', 'Shkodran Mustafi'] },
      { difficulty: 'purple', category: 'Jogaram no Girondins de Bordeaux', players: ['Yoann Gourcuff', 'Marouane Chamakh', 'Alou Diarra', 'Johan Micoud'] },
    ],
  },
  // Puzzle 53 — 2026-06-08
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes atacantes africanos', players: ['Didier Drogba', "Samuel Eto'o", 'Sadio Mane', 'Mohamed Salah'] },
      { difficulty: 'green',  category: 'Jogaram no Atletico Nacional (Colômbia)', players: ['Faustino Asprilla', 'Victor Aristizabal', 'Ivan Cordoba', 'Leonel Alvarez'] },
      { difficulty: 'blue',   category: 'Campeões Copa 1978 com Argentina', players: ['Mario Kempes', 'Daniel Passarella', 'Leopoldo Luque', 'Ossie Ardiles'] },
      { difficulty: 'purple', category: 'Ícones históricos do Boca Juniors', players: ['Diego Maradona', 'Juan Roman Riquelme', 'Roberto Abbondanzieri', 'Oscar Ruggeri'] },
    ],
  },
  // Puzzle 54 — 2026-06-09
  {
    groups: [
      { difficulty: 'yellow', category: 'Goleiros históricos da Alemanha', players: ['Oliver Kahn', 'Sepp Maier', 'Jens Lehmann', 'Manuel Neuer'] },
      { difficulty: 'green',  category: 'Jogaram no Espanyol', players: ['Ivan de la Peña', 'Sergio Garcia', 'Tamudo', 'Joan Capdevila'] },
      { difficulty: 'blue',   category: 'Campeões da Champions 2005 Liverpool (outros)', players: ['Jamie Carragher', 'Sami Hyypia', 'Milan Baros', 'Harry Kewell'] },
      { difficulty: 'purple', category: 'Ídolos históricos do Hajduk Split', players: ['Slaven Bilic', 'Robert Prosinecki', 'Alen Boksic', 'Igor Stimac'] },
    ],
  },
  // Puzzle 55 — 2026-06-10
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas históricas do futebol africano', players: ['Didier Drogba', 'George Weah', 'Abedi Pele', 'Roger Milla'] },
      { difficulty: 'green',  category: 'Jogaram no Torino FC', players: ['Andrea Belotti', 'Ciro Immobile', 'Nicolas Burdisso', 'Emiliano Moretti'] },
      { difficulty: 'blue',   category: 'Campeões Copa 1982 com Itália', players: ['Paolo Rossi', 'Dino Zoff', 'Marco Tardelli', 'Bruno Conti'] },
      { difficulty: 'purple', category: 'Jogaram no Zaragoza', players: ['Juan Esnaider', 'Milosevic', 'Gus Poyet', 'Fernando Hierro'] },
    ],
  },
  // Puzzle 56 — 2026-06-11
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas históricas da Suécia', players: ['Zlatan Ibrahimovic', 'Henrik Larsson', 'Freddie Ljungberg', 'Thomas Ravelli'] },
      { difficulty: 'green',  category: 'Jogaram no Ajax moderno', players: ['Luis Suarez', 'Christian Eriksen', 'Frenkie de Jong', 'Matthijs de Ligt'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2006 Itália (defensores)', players: ['Marco Materazzi', 'Gianluca Zambrotta', 'Alessandro Nesta', 'Cristian Zaccardo'] },
      { difficulty: 'purple', category: 'Campeões Europeus que jogaram na Turquia', players: ['Roberto Carlos', 'Nicolas Anelka', 'Patrick Kluivert', 'Emre Belozoglu'] },
    ],
  },
  // Puzzle 57 — 2026-06-12
  {
    groups: [
      { difficulty: 'yellow', category: 'Atacantes históricos da Seleção Inglesa', players: ['Gary Lineker', 'Alan Shearer', 'Michael Owen', 'Emile Heskey'] },
      { difficulty: 'green',  category: 'Jogaram no Nice FC', players: ['Mario Balotelli', 'Hatem Ben Arfa', 'Kasper Dolberg', 'Alassane Plea'] },
      { difficulty: 'blue',   category: 'Copa 1970 com Brasil (outros campeões)', players: ['Gerson', 'Clodoaldo', 'Carlos Alberto Torres', 'Everaldo'] },
      { difficulty: 'purple', category: 'Artilheiros históricos da Bundesliga', players: ['Gerd Muller', 'Klaus Fischer', 'Jupp Heynckes', 'Karl-Heinz Rummenigge'] },
    ],
  },
  // Puzzle 58 — 2026-06-13
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes defensores da Seleção Espanhola', players: ['Carles Puyol', 'Gerard Pique', 'Sergio Ramos', 'Fernando Hierro'] },
      { difficulty: 'green',  category: 'Jogaram no Sporting de Lisboa (modernos)', players: ['Rui Patricio', 'William Carvalho', 'Bruno Fernandes', 'Joao Mario'] },
      { difficulty: 'blue',   category: 'Copa 2010 Espanha (outros campeões)', players: ['Joan Capdevila', 'Pedro Rodriguez', 'Jesus Navas', 'Alvaro Arbeloa'] },
      { difficulty: 'purple', category: 'Ídolos históricos da Turquia', players: ['Hakan Sukur', 'Arda Turan', 'Emre Belozoglu', 'Tugay Kerimoglu'] },
    ],
  },
  // Puzzle 59 — 2026-06-14
  {
    groups: [
      { difficulty: 'yellow', category: 'Laterais-esquerdos históricos do futebol', players: ['Roberto Carlos', 'Paolo Maldini', 'Ashley Cole', 'Bixente Lizarazu'] },
      { difficulty: 'green',  category: 'Jogaram no Rennes', players: ['Ousmane Dembele', 'Edouard Mendy', 'Eduardo Camavinga', 'Nayef Aguerd'] },
      { difficulty: 'blue',   category: 'Copa 1994 Brasil (defensores e goleiro)', players: ['Taffarel', 'Branco', 'Marcio Santos', 'Aldair'] },
      { difficulty: 'purple', category: 'Lendas históricas do Croácia', players: ['Davor Suker', 'Zvonimir Boban', 'Robert Prosinecki', 'Slaven Bilic'] },
    ],
  },
  // Puzzle 60 — 2026-06-15
  {
    groups: [
      { difficulty: 'yellow', category: 'Ídolos do Flamengo (várias eras)', players: ['Zico', 'Adriano Imperador', 'Gabigol', 'Julio Cesar'] },
      { difficulty: 'green',  category: 'Jogaram no Benfica (modernos)', players: ['Ruben Dias', 'Nicolas Otamendi', 'Rafa Silva', 'Goncalo Ramos'] },
      { difficulty: 'blue',   category: 'Campeões Eurocopa 2020 com Itália', players: ['Gianluigi Donnarumma', 'Giorgio Chiellini', 'Lorenzo Insigne', 'Federico Chiesa'] },
      { difficulty: 'purple', category: 'Lendas do futebol escocês', players: ['Kenny Dalglish', 'Denis Law', 'Graeme Souness', 'Jim Baxter'] },
    ],
  },
  // Puzzle 61 — 2026-06-16
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes atacantes históricos da Alemanha', players: ['Gerd Muller', 'Rudi Voller', 'Jurgen Klinsmann', 'Miroslav Klose'] },
      { difficulty: 'green',  category: 'Jogaram no Olympique de Marselha (modernos)', players: ['Florian Thauvin', 'Andre-Pierre Gignac', 'Samir Nasri', 'Franck Ribery'] },
      { difficulty: 'blue',   category: 'Copa 2010 Holanda finalistas (outros)', players: ['Joris Mathijsen', 'Gregory van der Wiel', 'Mark van Bommel', 'Rafael van der Vaart'] },
      { difficulty: 'purple', category: 'Lendas do River Plate', players: ['Enzo Francescoli', 'Marcelo Gallardo', 'Ariel Ortega', 'Alfredo Di Stefano'] },
    ],
  },
  // Puzzle 62 — 2026-06-17
  {
    groups: [
      { difficulty: 'yellow', category: 'Campeões com o Boca Juniors (Libertadores)', players: ['Juan Roman Riquelme', 'Martin Palermo', 'Guillermo Barros Schelotto', 'Hugo Ibarra'] },
      { difficulty: 'green',  category: 'Jogaram no Nacional de Montevideo', players: ['Enzo Francescoli', 'Alvaro Recoba', 'Diego Forlan', 'Luis Suarez'] },
      { difficulty: 'blue',   category: 'Copa 1986 Argentina (outros campeões)', players: ['Nery Pumpido', 'Julio Olarticoechea', 'Sergio Batista', 'Claudio Borghi'] },
      { difficulty: 'purple', category: 'Lendas do futebol colombiano', players: ['Carlos Valderrama', 'Faustino Asprilla', 'Rene Higuita', 'Radamel Falcao'] },
    ],
  },
  // Puzzle 63 — 2026-06-18
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas do Ajax (era dourada)', players: ['Johan Cruyff', 'Marco van Basten', 'Frank Rijkaard', 'Edwin van der Sar'] },
      { difficulty: 'green',  category: 'Jogaram no Lazio (era gloriosa)', players: ['Marcelo Salas', 'Juan Sebastian Veron', 'Claudio Lopez', 'Hernanes'] },
      { difficulty: 'blue',   category: 'Campeões da Champions 2019 com Liverpool', players: ['Mohamed Salah', 'Virgil van Dijk', 'Alisson Becker', 'Georginio Wijnaldum'] },
      { difficulty: 'purple', category: 'Jogaram no Dinamo Zagreb', players: ['Eduardo da Silva', 'Luka Modric', 'Mateo Kovacic', 'Ivan Perisic'] },
    ],
  },
  // Puzzle 64 — 2026-06-19
  {
    groups: [
      { difficulty: 'yellow', category: 'Ídolos históricos do Fluminense', players: ['Thiago Silva', 'Fred', 'Osvaldo', 'Conca'] },
      { difficulty: 'green',  category: 'Jogaram no PSG (anos 90)', players: ['George Weah', 'Youri Djorkaeff', 'Leonardo', 'Nicolas Anelka'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2002 Brasil (os 23 menos lembrados)', players: ['Gilberto', 'Kleberson', 'Roque Junior', 'Edmilson'] },
      { difficulty: 'purple', category: 'Jogaram no Lokomotiv Moscou', players: ['Dmitri Loskov', 'Sergei Gurenko', 'Marek Saganowski', 'Dmitri Sychev'] },
    ],
  },
  // Puzzle 65 — 2026-06-20
  {
    groups: [
      { difficulty: 'yellow', category: 'Ídolos históricos do Corinthians', players: ['Socrates', 'Ronaldo Fenomeno', 'Marcelinho Carioca', 'Carlos Tevez'] },
      { difficulty: 'green',  category: 'Jogaram no Botafogo (várias eras)', players: ['Garrincha', 'Jairzinho', 'Clarence Seedorf', 'Bruno Lazaroni'] },
      { difficulty: 'blue',   category: 'Jogaram no Bayer Leverkusen (outros)', players: ['Michael Ballack', 'Dimitar Berbatov', 'Rudi Voller', 'Ze Roberto'] },
      { difficulty: 'purple', category: 'Jogaram na China (Super Liga)', players: ['Hulk', 'Oscar', 'Didier Drogba', 'Nicolas Anelka'] },
    ],
  },
  // Puzzle 66 — 2026-06-21
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas históricas do futebol holandês', players: ['Johan Cruyff', 'Marco van Basten', 'Ruud Gullit', 'Dennis Bergkamp'] },
      { difficulty: 'green',  category: 'Jogaram no Club Brugge', players: ['Franky van der Elst', 'Gert Verheyen', 'Benito Carbone', 'Ivan Leko'] },
      { difficulty: 'blue',   category: 'Copa 1962 — Brasil bicampeão', players: ['Garrincha', 'Vava', 'Amarildo', 'Zito'] },
      { difficulty: 'purple', category: 'Jogaram no Al Hilal', players: ['Neymar Jr.', 'Ruben Neves', 'Malcom', 'Sergej Milinkovic-Savic'] },
    ],
  },
  // Puzzle 67 — 2026-06-22
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes pontas velozes do Brasil', players: ['Garrincha', 'Robinho', 'Ronaldinho Gaucho', 'Neymar Jr.'] },
      { difficulty: 'green',  category: 'Jogaram no Girondins de Bordeaux', players: ['Pauleta', 'Sylvain Wiltord', 'Christophe Dugarry', 'Johan Micoud'] },
      { difficulty: 'blue',   category: 'Eurocopa 2004 Portugal (finalistas)', players: ['Luis Figo', 'Rui Costa', 'Maniche', 'Ricardo Carvalho'] },
      { difficulty: 'purple', category: 'Jogaram na J-League japonesa', players: ['Zico', 'Dunga', 'Luizao', 'Alex'] },
    ],
  },
  // Puzzle 68 — 2026-06-23
  {
    groups: [
      { difficulty: 'yellow', category: 'Artilheiros históricos da Eurocopa', players: ['Cristiano Ronaldo', 'Michel Platini', 'Alan Shearer', 'Nuno Gomes'] },
      { difficulty: 'green',  category: 'Jogaram no Shakhtar (geração dos anos 2010)', players: ['Bernard', 'Taison', 'Henrikh Mkhitaryan', 'Fernandinho'] },
      { difficulty: 'blue',   category: 'Campeões Copa 2014 Alemanha (titulares do ataque)', players: ['Thomas Muller', 'Miroslav Klose', 'Mario Gotze', 'Andre Schurrle'] },
      { difficulty: 'purple', category: 'Jogaram no Real Betis', players: ['Joaquin', 'Denilson', 'Edu', 'Sergio Canales'] },
    ],
  },
  // Puzzle 69 — 2026-06-24
  {
    groups: [
      { difficulty: 'yellow', category: 'Revelados no Internazionale de Milão', players: ['Javier Zanetti', 'Nicola Berti', 'Sandro Mazzola', 'Alessandro Altobelli'] },
      { difficulty: 'green',  category: 'Jogaram no Ajax (anos 90)', players: ['Patrick Kluivert', 'Marc Overmars', 'Edgar Davids', 'Jari Litmanen'] },
      { difficulty: 'blue',   category: 'Copa 2006 Brasil (jogadores escalados)', players: ['Ronaldo Fenomeno', 'Ronaldinho Gaucho', 'Adriano Imperador', 'Kaka'] },
      { difficulty: 'purple', category: 'Campeões Champions 2004 com Porto (Mourinho)', players: ['Deco', 'Costinha', 'Maniche', 'Ricardo Carvalho'] },
    ],
  },
  // Puzzle 70 — 2026-06-25
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas da Seleção Uruguaia', players: ['Diego Forlan', 'Luis Suarez', 'Edinson Cavani', 'Enzo Francescoli'] },
      { difficulty: 'green',  category: 'Jogaram no Nottingham Forest', players: ['Roy Keane', 'Stuart Pearce', 'Nigel Clough', 'Brian Clough'] },
      { difficulty: 'blue',   category: 'Copa 2022 França (outros além dos titulares)', players: ['Theo Hernandez', 'Adrien Rabiot', 'Marcus Thuram', 'Randal Kolo Muani'] },
      { difficulty: 'purple', category: 'Jogaram no Vissel Kobe (Japão)', players: ['Andres Iniesta', 'David Villa', 'Lukas Podolski', 'Thomas Vermaelen'] },
    ],
  },
  // Puzzle 71 — 2026-06-26
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas históricas da Seleção Mexicana', players: ['Hugo Sanchez', 'Cuauhtemoc Blanco', 'Jared Borgetti', 'Rafael Marquez'] },
      { difficulty: 'green',  category: 'Jogaram no Anderlecht', players: ['Marc Wilmots', 'Youri Tielemans', 'Moussa Dembele', 'Romelu Lukaku'] },
      { difficulty: 'blue',   category: 'Copa 2018 França (titulares defensivos)', players: ['Raphael Varane', 'Samuel Umtiti', 'Benjamin Mendy', 'Blaise Matuidi'] },
      { difficulty: 'purple', category: 'Jogaram no Fenerbahce (outros)', players: ['Alex de Souza', 'Aurelio', 'Okocha', 'Emre Belozoglu'] },
    ],
  },
  // Puzzle 72 — 2026-06-27
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes meia-atacantes da Seleção Inglesa', players: ['Paul Gascoigne', 'David Beckham', 'Frank Lampard', 'Steven Gerrard'] },
      { difficulty: 'green',  category: 'Jogaram no Olympiakos', players: ['Giovanni', 'Rivaldo', 'Joel Campbell', 'Ahmed Hassan'] },
      { difficulty: 'blue',   category: 'Copa 1990 com Alemanha Ocidental', players: ['Jurgen Klinsmann', 'Rudi Voller', 'Lothar Matthaus', 'Andreas Brehme'] },
      { difficulty: 'purple', category: 'Revelados em academias inglesas e se tornaram grandes', players: ['Wayne Rooney', 'Michael Owen', 'Joe Cole', 'Jermain Defoe'] },
    ],
  },
  // Puzzle 73 — 2026-06-28
  {
    groups: [
      { difficulty: 'yellow', category: 'Ídolos históricos da Seleção Checa', players: ['Pavel Nedved', 'Tomas Rosicky', 'Patrik Berger', 'Karel Poborsky'] },
      { difficulty: 'green',  category: 'Jogaram no Sparta Praga', players: ['Jiri Novak', 'Jan Koller', 'Marek Matejovsky', 'Tomas Galasek'] },
      { difficulty: 'blue',   category: 'Lendas da Seleção Senegalesa', players: ['El Hadji Diouf', 'Sadio Mane', 'Kalidou Koulibaly', 'Papa Bouba Diop'] },
      { difficulty: 'purple', category: 'Jogaram no Rangers FC (Escócia)', players: ['Ally McCoist', 'Brian Laudrup', 'Jorg Albertz', 'Giovanni van Bronckhorst'] },
    ],
  },
  // Puzzle 74 — 2026-06-29
  {
    groups: [
      { difficulty: 'yellow', category: 'Copa 2006 Brasil (os que decepcionaram)', players: ['Ronaldinho Gaucho', 'Adriano Imperador', 'Ze Roberto', 'Cicinho'] },
      { difficulty: 'green',  category: 'Lendas da Seleção Chilena', players: ['Alexis Sanchez', 'Ivan Zamorano', 'Marcelo Salas', 'Arturo Vidal'] },
      { difficulty: 'blue',   category: 'Jogaram no Atlético de Madrid (história)', players: ['Luis Aragones', 'Adelardo', 'Gabi', 'Antoine Griezmann'] },
      { difficulty: 'purple', category: 'Jogaram no Palmeiras E no Cruzeiro', players: ['Alex', 'Henrique', 'Lucio', 'Vagner Love'] },
    ],
  },
  // Puzzle 75 — 2026-06-30
  {
    groups: [
      { difficulty: 'yellow', category: 'Jogaram no Real Madrid nos anos 90', players: ['Fernando Hierro', 'Davor Suker', 'Roberto Carlos', 'Predrag Mijatovic'] },
      { difficulty: 'green',  category: 'Campeões com o Leicester City 2015-16', players: ['Jamie Vardy', 'Riyad Mahrez', 'Wes Morgan', 'Robert Huth'] },
      { difficulty: 'blue',   category: 'Copa 1990 — Itália no Mundial (campeões)', players: ['Salvatore Schillaci', 'Roberto Baggio', 'Paolo Maldini', 'Walter Zenga'] },
      { difficulty: 'purple', category: 'Jogaram no Kashiwa Reysol', players: ['Leandro Domingues', 'George Ndah', 'Hideto Suzuki', 'Cleo'] },
    ],
  },
  // Puzzle 76 — 2026-07-01
  {
    groups: [
      { difficulty: 'yellow', category: 'Campeões da Champions com o Bayern de Munique', players: ['Oliver Kahn', 'Stefan Effenberg', 'Carsten Jancker', 'Giovane Elber'] },
      { difficulty: 'green',  category: 'Jogaram no Besiktas (outros)', players: ['Quaresma', 'Winston Bogarde', 'Nicolas Anelka', 'Ali Tandogan'] },
      { difficulty: 'blue',   category: 'Copa 2010 Alemanha (semifinalistas)', players: ['Michael Ballack', 'Bastian Schweinsteiger', 'Lukas Podolski', 'Miroslav Klose'] },
      { difficulty: 'purple', category: 'Jogaram na Coréia do Sul (K-League)', players: ['Leonardo', 'Edmundo', 'Dejan Damjanovic', 'Rodrigo'] },
    ],
  },
  // Puzzle 77 — 2026-07-02
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes meias defensivos da história', players: ['Claude Makelele', 'Sergio Busquets', 'Lothar Matthaus', 'Patrick Vieira'] },
      { difficulty: 'green',  category: 'Jogaram no Wolfsburg', players: ['Kevin De Bruyne', 'Grafite', 'Edin Dzeko', 'Ricardo Rodriguez'] },
      { difficulty: 'blue',   category: 'Copa 1998 Brasil (outros campeões)', players: ['Aldair', 'Junior Baiano', 'Ze Carlos', 'Emerson'] },
      { difficulty: 'purple', category: 'Campeões com o Porto em 2004 (Mourinho era)', players: ['Deco', 'Maniche', 'Jorge Costa', 'Pedro Emanuel'] },
    ],
  },
  // Puzzle 78 — 2026-07-03
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes goleadores da Copa América', players: ['Zizinho', 'Gabriel Batistuta', 'Norberto Mendez', 'Teodoro Fernandez'] },
      { difficulty: 'green',  category: 'Jogaram no Panathinaikos', players: ['Nikos Liberopoulos', 'Djibril Cisse', 'Sebastian Frey', 'Gilberto Silva'] },
      { difficulty: 'blue',   category: 'Lendas da Seleção Grega', players: ['Theodoros Zagorakis', 'Angelos Charisteas', 'Demis Nikolaidis', 'Giorgos Karagounis'] },
      { difficulty: 'purple', category: 'Jogaram na Fiorentina E no Milan', players: ['Rui Costa', 'Stephan El Shaarawy', 'Nuno Gomes', 'Abel Balbo'] },
    ],
  },
  // Puzzle 79 — 2026-07-04
  {
    groups: [
      { difficulty: 'yellow', category: 'Revelados no Manchester United', players: ['Ryan Giggs', 'Paul Scholes', 'Nicky Butt', 'Gary Neville'] },
      { difficulty: 'green',  category: 'Jogaram no Real Sociedad', players: ['Xabi Alonso', 'Mikel Oyarzabal', 'Griezmann', 'John Aldridge'] },
      { difficulty: 'blue',   category: 'Copa 2022 Marrocos (surpresa do torneio)', players: ['Yassine Bounou', 'Achraf Hakimi', 'Hakim Ziyech', 'Youssef En-Nesyri'] },
      { difficulty: 'purple', category: 'Jogaram na Arábia Saudita (Al Ittihad)', players: ['Karim Benzema', 'N\'Golo Kante', 'Jota', 'Fabinho'] },
    ],
  },
  // Puzzle 80 — 2026-07-05
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes goleiros da América do Sul', players: ['Taffarel', 'Ubaldo Fillol', 'Rene Higuita', 'Claudio Bravo'] },
      { difficulty: 'green',  category: 'Jogaram no Leicester City (outros)', players: ['Peter Shilton', 'Gary Lineker', 'Emile Heskey', 'Muzzy Izzet'] },
      { difficulty: 'blue',   category: 'Copa 2018 Bélgica (semifinalistas)', players: ['Eden Hazard', 'Romelu Lukaku', 'Kevin De Bruyne', 'Dries Mertens'] },
      { difficulty: 'purple', category: 'Jogaram no Trabzonspor (segunda geração)', players: ['Burak Yilmaz', 'Serkan Balci', 'Alex', 'Abel'] },
    ],
  },
  // Puzzle 81 — 2026-07-06
  {
    groups: [
      { difficulty: 'yellow', category: 'Heróis da Copa 1966 (outros artilheiros)', players: ['Geoff Hurst', 'Roger Hunt', 'Martin Peters', 'Bobby Charlton'] },
      { difficulty: 'green',  category: 'Jogaram no West Bromwich Albion', players: ['Cyrille Regis', 'Laurie Cunningham', 'Brendon Batson', 'Bryan Robson'] },
      { difficulty: 'blue',   category: 'Campeões Eurocopa 2016 Portugal (outros)', players: ['Nani', 'William Carvalho', 'Raphael Guerreiro', 'Bruno Alves'] },
      { difficulty: 'purple', category: 'Jogaram no FK Crvena Zvezda (Estrela Vermelha)', players: ['Robert Prosinecki', 'Sinisa Mihajlovic', 'Vladimir Beara', 'Predrag Mijatovic'] },
    ],
  },
  // Puzzle 82 — 2026-07-07
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes centroavantes europeus dos anos 2000', players: ['Ruud van Nistelrooy', 'Thierry Henry', 'Fernando Torres', 'Zlatan Ibrahimovic'] },
      { difficulty: 'green',  category: 'Jogaram no Genoa CFC', players: ['Diego Milito', 'Thiago Motta', 'Rodrigo Palacio', 'Marco Borriello'] },
      { difficulty: 'blue',   category: 'Lendas da Seleção Equatoriana', players: ['Alex Aguinaga', 'Ivan Kaviedes', 'Agustin Delgado', 'Antonio Valencia'] },
      { difficulty: 'purple', category: 'Jogaram no Grasshopper Club Zurich', players: ['Stephane Chapuisat', 'Marc Hottiger', 'Johann Vogel', 'Hakan Yakin'] },
    ],
  },
  // Puzzle 83 — 2026-07-08
  {
    groups: [
      { difficulty: 'yellow', category: 'Revelados pelo São Paulo e que brilharam na Europa', players: ['Cafu', 'Kaka', 'Casemiro', 'Rogerio Ceni'] },
      { difficulty: 'green',  category: 'Jogaram no Sevilla FC (outros)', players: ['Julio Baptista', 'Dani Alves', 'Diego Capel', 'Seydou Keita'] },
      { difficulty: 'blue',   category: 'Copa 2014 — Alemanha vs Argentina (finais)', players: ['Thomas Muller', 'Mario Gotze', 'Toni Kroos', 'Bastian Schweinsteiger'] },
      { difficulty: 'purple', category: 'Jogaram no IFK Gothenburg', players: ['Glenn Hysen', 'Thomas Ravelli', 'Martin Dahlin', 'Stefan Schwarz'] },
    ],
  },
  // Puzzle 84 — 2026-07-09
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes defensores da Seleção Italiana', players: ['Fabio Cannavaro', 'Paolo Maldini', 'Franco Baresi', 'Alessandro Nesta'] },
      { difficulty: 'green',  category: 'Jogaram no Blackburn Rovers', players: ['Alan Shearer', 'Chris Sutton', 'Henning Berg', 'Tim Sherwood'] },
      { difficulty: 'blue',   category: 'Campeões Eurocopa 2004 com Grécia (os heróis)', players: ['Theodoros Zagorakis', 'Angelos Charisteas', 'Giorgos Karagounis', 'Traianos Dellas'] },
      { difficulty: 'purple', category: 'Jogaram no Pacos de Ferreira', players: ['Andre', 'Helder Postiga', 'Custodio', 'Jailson'] },
    ],
  },
  // Puzzle 85 — 2026-07-10
  {
    groups: [
      { difficulty: 'yellow', category: 'Brasileiros que jogaram no Japão e se destacaram', players: ['Zico', 'Dunga', 'Leonardo', 'Edmilson'] },
      { difficulty: 'green',  category: 'Jogaram no Athletic de Bilbao (outros)', players: ['Joseba Etxeberria', 'Aduriz', 'Carlos Gurpegui', 'Xabier Etxeita'] },
      { difficulty: 'blue',   category: 'Copa 1954 Hungria (finalistas derrotados)', players: ['Ferenc Puskas', 'Sandor Kocsis', 'Jozsef Bozsik', 'Zoltan Czibor'] },
      { difficulty: 'purple', category: 'Jogaram no Zenit São Petersburgo (outros)', players: ['Andrei Arshavin', 'Pavel Pogrebnyak', 'Anatoly Tymoshchuk', 'Domingos'] },
    ],
  },
  // Puzzle 86 — 2026-07-11
  {
    groups: [
      { difficulty: 'yellow', category: 'Campeões da Champions com o Real (galácticos)', players: ['Luis Figo', 'Zinedine Zidane', 'Ronaldo Fenomeno', 'David Beckham'] },
      { difficulty: 'green',  category: 'Jogaram no AS Monaco (anos 90)', players: ['Thierry Henry', 'David Trezeguet', 'Emmanuel Petit', 'Fabien Barthez'] },
      { difficulty: 'blue',   category: 'Copa 2002 Coreia/Japão (surpresas da fase de grupos)', players: ['Sven-Goran Eriksson', 'Hong Myung-Bo', 'Ahn Jung-hwan', 'Park Ji-sung'] },
      { difficulty: 'purple', category: 'Jogaram no Metalist Kharkiv', players: ['Cleiton Xavier', 'Taison', 'Cristaldo', 'Jonathan Cristaldo'] },
    ],
  },
  // Puzzle 87 — 2026-07-12
  {
    groups: [
      { difficulty: 'yellow', category: 'Lendas da Seleção Dinamarquesa', players: ['Michael Laudrup', 'Brian Laudrup', 'Peter Schmeichel', 'Jon Dahl Tomasson'] },
      { difficulty: 'green',  category: 'O Arsenal dos Invencíveis (2003-04)', players: ['Thierry Henry', 'Patrick Vieira', 'Robert Pires', 'Freddie Ljungberg'] },
      { difficulty: 'blue',   category: 'Copa 1990 — Itália vs Argentina (semifinal)', players: ['Roberto Baggio', 'Salvatore Schillaci', 'Diego Maradona', 'Claudio Caniggia'] },
      { difficulty: 'purple', category: 'Jogaram no Rapid Wien', players: ['Hans Krankl', 'Toni Polster', 'Anton Pfeffer', 'Peter Stöger'] },
    ],
  },
  // Puzzle 88 — 2026-07-13
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes dribbladores da história do futebol', players: ['Garrincha', 'Ronaldinho Gaucho', 'George Best', 'Lionel Messi'] },
      { difficulty: 'green',  category: 'Jogaram no Lazio moderno', players: ['Ciro Immobile', 'Sergej Milinkovic-Savic', 'Lucas Leiva', 'Felipe Anderson'] },
      { difficulty: 'blue',   category: 'Copa 1998 com França (defensores)', players: ['Lilian Thuram', 'Laurent Blanc', 'Bixente Lizarazu', 'Frank Leboeuf'] },
      { difficulty: 'purple', category: 'Jogaram no Spartak Moscou', players: ['Andrei Tikhonov', 'Valeri Karpin', 'Viktor Onopko', 'Yegor Titov'] },
    ],
  },
  // Puzzle 89 — 2026-07-14
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes armadores de jogo da história', players: ['Johan Cruyff', 'Michel Platini', 'Dennis Bergkamp', 'Zinedine Zidane'] },
      { difficulty: 'green',  category: 'Jogaram no Burnley FC', players: ['Jimmy McIlroy', 'Brian Flynn', 'Robbie Blake', 'Steven Fletcher'] },
      { difficulty: 'blue',   category: 'Copa 2010 Brasil (os que foram eliminados)', players: ['Julio Cesar', 'Lucio', 'Dani Alves', 'Michel Bastos'] },
      { difficulty: 'purple', category: 'Jogaram no Anzhi Makhachkala', players: ['Samuel Eto\'o', 'Roberto Carlos', 'Christopher Samba', 'Willian'] },
    ],
  },
  // Puzzle 90 — 2026-07-15
  {
    groups: [
      { difficulty: 'yellow', category: 'Ícones da Seleção Camaronesa', players: ['Roger Milla', "Samuel Eto'o", 'Rigobert Song', 'Patrick Mboma'] },
      { difficulty: 'green',  category: 'Jogaram no Olympique de Lyon (outros)', players: ['Bafetimbi Gomis', 'Lisandro Lopez', 'Dejan Lovren', 'Aly Cissokho'] },
      { difficulty: 'blue',   category: 'Copa 2010 com Espanha (meia-atacantes)', players: ['Xavi Hernandez', 'Andres Iniesta', 'David Silva', 'Xabi Alonso'] },
      { difficulty: 'purple', category: 'Jogaram no Al Nassr (Arábia Saudita)', players: ['Cristiano Ronaldo', 'Marcelo Brozovic', 'Sadio Mane', 'Seko Fofana'] },
    ],
  },
  // Puzzle 91 — 2026-07-16
  {
    groups: [
      { difficulty: 'yellow', category: 'Campeões do Mundo em 2018 com a França (zagueiros)', players: ['Raphael Varane', 'Samuel Umtiti', 'Presnel Kimpembe', 'Adil Rami'] },
      { difficulty: 'green',  category: 'Jogaram no Internacional (outros)', players: ['Diego Aguirre', 'Giovanni', 'Leandro Damiao', 'Nilmar'] },
      { difficulty: 'blue',   category: 'Lendas da Seleção Nigeriana', players: ['Jay-Jay Okocha', 'Nwankwo Kanu', 'Sunday Oliseh', 'Victor Ikpeba'] },
      { difficulty: 'purple', category: 'Jogaram no Hertha Berlin', players: ['Marko Pantelic', 'Kevin-Prince Boateng', 'Salomon Kalou', 'Arne Friedrich'] },
    ],
  },
  // Puzzle 92 — 2026-07-17
  {
    groups: [
      { difficulty: 'yellow', category: 'Ídolos do São Paulo FC (anos 90-2000)', players: ['Rai', 'Hernanes', 'Kaká', 'Ceni'] },
      { difficulty: 'green',  category: 'Jogaram no Juventus (anos 2000)', players: ['Alessandro Del Piero', 'Gianluigi Buffon', 'Pavel Nedved', 'David Trezeguet'] },
      { difficulty: 'blue',   category: 'Copa 2010 Brasil (atacantes)', players: ['Luis Fabiano', 'Robinho', 'Grafite', 'Nilmar'] },
      { difficulty: 'purple', category: 'Campeões da Liga dos Campeões 1994 com Milan', players: ['Zvonimir Boban', 'Dejan Savicevic', 'Marcel Desailly', 'Demetrio Albertini'] },
    ],
  },
  // Puzzle 93 — 2026-07-18
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes artilheiros históricos da Premier League (outros)', players: ['Thierry Henry', 'Andy Cole', 'Les Ferdinand', 'Jimmy Floyd Hasselbaink'] },
      { difficulty: 'green',  category: 'Jogaram no Napoli (história)', players: ['Diego Maradona', 'Ciro Ferrara', 'Salvatore Bagni', 'Andrea Carnevale'] },
      { difficulty: 'blue',   category: 'Copa 1950 — Brasil e o Maracanazo', players: ['Zizinho', 'Ademir', 'Jair', 'Obdulio Varela'] },
      { difficulty: 'purple', category: 'Jogaram no Levante UD', players: ['David Navarro', 'Juanfran', 'Pedro Lopez', 'Xisco'] },
    ],
  },
  // Puzzle 94 — 2026-07-19
  {
    groups: [
      { difficulty: 'yellow', category: 'Campeões com a Seleção Francesa em dois torneiros', players: ['Zinedine Zidane', 'Didier Deschamps', 'Thierry Henry', 'Marcel Desailly'] },
      { difficulty: 'green',  category: 'Jogaram no Villarreal (geração 2020s)', players: ['Gerard Moreno', 'Dani Parejo', 'Pau Torres', 'Arnaut Danjuma'] },
      { difficulty: 'blue',   category: 'Copa 1978 Holanda (finalistas)', players: ['Johan Cruyff', 'Rob Rensenbrink', 'Ruud Krol', 'Arie Haan'] },
      { difficulty: 'purple', category: 'Jogaram no Vitesse Arnhem', players: ['Nicky Hofs', 'Moussa Dembele', 'Marcus Edwards', 'Loic Lamy'] },
    ],
  },
  // Puzzle 95 — 2026-07-20
  {
    groups: [
      { difficulty: 'yellow', category: 'Laterais-esquerdos históricos da Seleção Brasileira', players: ['Roberto Carlos', 'Marcelo', 'Junior', 'Leonardo'] },
      { difficulty: 'green',  category: 'Jogaram no Galatasaray (história)', players: ['Hakan Sukur', 'Gheorghe Hagi', 'Bulent Korkmaz', 'Emre Belozoglu'] },
      { difficulty: 'blue',   category: 'Copa 2006 Alemanha (outros na fase de grupos)', players: ['Lukas Podolski', 'Bastian Schweinsteiger', 'Oliver Neuville', 'Tim Borowski'] },
      { difficulty: 'purple', category: 'Jogaram no Gremio E no Flamengo', players: ['Ronaldinho Gaucho', 'Everton Cebolinha', 'Ferrugem', 'Wallace'] },
    ],
  },
  // Puzzle 96 — 2026-07-21
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes estrategistas — treinadores históricos', players: ['Johan Cruyff', 'Pep Guardiola', 'Arrigo Sacchi', 'Bill Shankly'] },
      { difficulty: 'green',  category: 'Jogaram no Steaua Bucareste', players: ['Lacatus', 'Hagi', 'Dumitrescu', 'Raducioiu'] },
      { difficulty: 'blue',   category: 'Copa 1998 França (marcadores de gol na final)', players: ['Zinedine Zidane', 'Emmanuel Petit', 'Patrick Vieira', 'Thierry Henry'] },
      { difficulty: 'purple', category: 'Jogaram no SC Corinthians E no Fluminense', players: ['Roger', 'Carlos Alberto', 'Denilson', 'Fabio Santos'] },
    ],
  },
  // Puzzle 97 — 2026-07-22
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes campeões africanos no futebol europeu', players: ['Didier Drogba', "Samuel Eto'o", 'El Hadji Diouf', 'Yaya Toure'] },
      { difficulty: 'green',  category: 'Jogaram no Fulham (outros)', players: ['Bobby Zamora', 'Danny Murphy', 'Zat Knight', 'Mark Schwarzer'] },
      { difficulty: 'blue',   category: 'Copa 2014 com Alemanha (os esquecidos da lista)', players: ['Kevin Grosskreutz', 'Ron-Robert Zieler', 'Erik Durm', 'Sebastian Schweinsteiger'] },
      { difficulty: 'purple', category: 'Jogaram no Kashima Antlers (outros)', players: ['Aldo', 'Leandro', 'Marquinhos', 'Nakamura'] },
    ],
  },
  // Puzzle 98 — 2026-07-23
  {
    groups: [
      { difficulty: 'yellow', category: 'Campeões do Mundo com a Espanha em 2010 (goleiros e zagueiros)', players: ['Iker Casillas', 'Sergio Ramos', 'Carles Puyol', 'Gerard Pique'] },
      { difficulty: 'green',  category: 'Jogaram no Monchengladbach (modernos)', players: ['Marco Reus', 'Granit Xhaka', 'Thorgan Hazard', 'Lars Stindl'] },
      { difficulty: 'blue',   category: 'Copa 2022 Argentina (defensores)', players: ['Nicolas Otamendi', 'Cristian Romero', 'Marcos Acuna', 'Gonzalo Montiel'] },
      { difficulty: 'purple', category: 'Jogaram no Feyenoord (clássicos)', players: ['Robin van Persie', 'Giovanni van Bronckhorst', 'Roy Makaay', 'Patrick Kluivert'] },
    ],
  },
  // Puzzle 99 — 2026-07-24
  {
    groups: [
      { difficulty: 'yellow', category: 'Vencedores do Prêmio FIFA de Melhor do Mundo', players: ['Ronaldo Fenomeno', 'Zinedine Zidane', 'Ronaldinho Gaucho', 'Luka Modric'] },
      { difficulty: 'green',  category: 'Jogaram no Sao Paulo FC (modernos)', players: ['Lucas Moura', 'Alexandre Pato', 'Casemiro', 'Daniel Alves'] },
      { difficulty: 'blue',   category: 'Copa 2022 — França vs Marrocos (semifinal)', players: ['Theo Hernandez', 'Achraf Hakimi', 'Kylian Mbappe', 'Yassine Bounou'] },
      { difficulty: 'purple', category: 'Jogaram no Ujpest FC', players: ['Antal Dunai', 'Janos Gorocs', 'Fazekas Laszlo', 'Varadi Istvan'] },
    ],
  },
  // Puzzle 100 — 2026-07-25
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes artilheiros dos anos 90 no mundo', players: ['Ronaldo Fenomeno', 'Gabriel Batistuta', 'Hristo Stoichkov', 'Davor Suker'] },
      { difficulty: 'green',  category: 'Jogaram no Manchester City (era pre-Guardiola)', players: ['Elano', 'Robinho', 'Shaun Wright-Phillips', 'Richard Dunne'] },
      { difficulty: 'blue',   category: 'Revelados no Fluminense FC', players: ['Thiago Neves', 'Wagner Love', 'Renato Gaucho', 'Washington'] },
      { difficulty: 'purple', category: 'Jogaram no Red Star Belgrade (Estrela Vermelha modernos)', players: ['Dejan Stankovic', 'Nemanja Vidic', 'Aleksandar Kolarov', 'Nemanja Matic'] },
    ],
  },
  // Puzzle 101 — 2026-07-26
  {
    groups: [
      { difficulty: 'yellow', category: 'Grandes nomes do futebol australiano', players: ['Harry Kewell', 'Mark Schwarzer', 'Tim Cahill', 'Lucas Neill'] },
      { difficulty: 'green',  category: 'Jogaram no Valencia CF (outros)', players: ['Gaizka Mendieta', 'Claudio Lopez', 'Kily Gonzalez', 'Marchena'] },
      { difficulty: 'blue',   category: 'Copa 1990 — Roger Milla e a Seleção de Camarões', players: ['Roger Milla', 'Francois Omam-Biyik', 'Benjamin Massing', 'Thomas Nkono'] },
      { difficulty: 'purple', category: 'Jogaram no Kashiwa Reysol E no Internacional', players: ['Mauro Galvao', 'Leandro Domingues', 'Souza', 'Nilson'] },
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
