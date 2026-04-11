#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../lib/games/players-db.ts')

// Hints manuais para jogadores famosos
const HINTS = {
  // Goleiros brasileiros
  'alisson': ['Goleiro do Liverpool por anos', 'Melhor goleiro do mundo em 2019', 'Revelado pelo Internacional'],
  'ederson': ['Goleiro do Manchester City', 'Famoso pelos passes longos precisos', 'Revelado pelo Benfica'],
  'taffarel': ['Goleiro campeo do mundo em 1994', 'Defensa o pênalti decisivo na final de 94', 'Jogou no Parma e Atletico Mineiro'],
  'dida': ['Goleiro do Milan por anos', 'Campeao da Champions League em 2003 e 2007', 'Revelado pelo Cruzeiro'],
  'julio-cesar': ['Goleiro da selecao brasileira na Copa de 2010', 'Jogou no Inter de Milao e QPR', 'Revelado pelo Flamengo'],
  'weverton': ['Goleiro do Palmeiras e da selecao', 'Tricampeao do Brasileirao pelo Palmeiras', 'Revelado pelo Atletico Paranaense'],
  'bento': ['Goleiro jovem da selecao brasileira', 'Destaque do Al-Qadsiah', 'Revelado pelo Athletico Paranaense'],

  // Defensores brasileiros
  'danilo': ['Lateral versátil que joga nos dois lados', 'Jogou no Porto, Real Madrid e Juventus', 'Capitao da selecao brasileira'],
  'alex-sandro': ['Lateral esquerdo da Juventus por anos', 'Revelado pelo Porto', 'Jogou no Atletico Mineiro e Santos'],
  'militao': ['Zagueiro do Real Madrid', 'Ganhou a Champions League pelo Real Madrid', 'Revelado pelo Porto'],
  'gabriel-magalhaes': ['Zagueiro do Arsenal', 'Revelado pelo Avai e Lille', 'Um dos melhores zagueiros da Premier League'],
  'bremer': ['Zagueiro da Juventus', 'Revelado pelo Sao Paulo', 'Um dos melhores zagueiros do Brasil'],
  'aldair': ['Zagueiro campeo do mundo em 1994', 'Jogou na Roma por muitos anos', 'Revelado pelo Flamengo'],
  'lucio': ['Zagueiro campeo do mundo em 2002', 'Jogou no Bayern e Inter de Milao', 'Revelado pelo Internacional'],
  'juan': ['Zagueiro do Flamengo e selecao', 'Jogou na Roma ao lado de Totti', 'Bicampeao do Mundo com o Brasil'],

  // Meio-campistas brasileiros
  'fabinho': ['Volante do Liverpool', 'Ganhou a Champions League em 2019', 'Revelado pelo Monaco'],
  'dunga': ['Capito campeo do mundo em 1994', 'Jogou no Bundesliga com Stuttgart e Hamburg', 'Virou tecnico da selecao brasileira'],
  'mauro-silva': ['Volante revelado no Bragantino', 'Jogou no Deportivo La Coruna', 'Campeo do Mundo em 1994'],
  'gilberto-silva': ['Volante campeo do mundo em 2002', 'Jogou no Arsenal do Invicto', 'Revelado pelo Atletico Mineiro'],
  'bruno-guimaraes': ['Meia do Newcastle', 'Revelado pelo Athletico Paranaense', 'Um dos melhores meias do Brasil'],
  'paqueta': ['Meia criativo do West Ham', 'Revelado pelo Flamengo', 'Destaque do Lyon antes de ir para a Premier League'],
  'socrates': ['Medico e jogador ao mesmo tempo', 'Idolo do Corinthians nos anos 80', 'Meia pensante e filosofo do futebol'],
  'coutinho': ['Meia revelado pelo Vasco e Inter', 'Jogou no Liverpool e Barcelona', 'Ganhou a Champions League pelo Bayern'],
  'oscar': ['Meia que foi ao Chelsea em 2012', 'Revelado pelo Internacional', 'Jogou por anos no Shanghai SIPG'],
  'hernanes': ['Meia conhecido como O Profeta', 'Jogou no Lazio, Inter e Juventus', 'Revelado pelo Sao Paulo'],

  // Atacantes brasileiros
  'raphinha': ['Extremo do Barcelona', 'Revelado pelo Vitoria e Avai', 'Destaque do Leeds antes do Barca'],
  'richarlison': ['Atacante do Tottenham e selecao', 'Revelado pelo Fluminense e Watford', 'Artilheiro nas Olimpiadas de 2020'],
  'martinelli': ['Atacante do Arsenal', 'Revelado pelo Ituano', 'Um dos mais jovens artilheiros do Arsenal'],
  'gabriel-jesus': ['Atacante do Arsenal e selecao', 'Revelado pelo Palmeiras', 'Jogou no Manchester City por 6 anos'],
  'antony': ['Extremo revelado pelo Ajax', 'Revelado pelo Sao Paulo', 'Foi para o Manchester United em 2022'],
  'endrick': ['Jovem prodigo do Real Madrid', 'Revelado pelo Palmeiras', 'Marcou gol em sua estreia na selecao'],
  'hulk': ['Atacante poderoso e fisico', 'Jogou no Porto, Zenit e Shanghai SIPG', 'Voltou ao Brasil pelo Atletico Mineiro'],
  'bebeto': ['Atacante campeo do mundo em 1994', 'Dupla historica com Romario', 'Gol de cradle de bebe famoso'],
  'adriano': ['Atacante poderoso chamado Imperador', 'Jogou no Inter de Milao', 'Artilheiro e com chute fortissimo'],
  'firmino': ['Atacante criativo do Liverpool', 'Revelado pelo Figueirense', 'Parte do trio mortal com Salah e Mane'],
  'garrincha': ['Considerado o maior driblador da historia', 'Campeo do Mundo em 1958 e 1962', 'Jogou quase toda carreira no Botafogo'],

  // Argentinos
  'tevez': ['Atacante combativo e guerreiro', 'Jogou no Man United, Man City e Juventus', 'Idolo do Boca Juniors'],
  'lautaro': ['Atacante do Inter de Milao', 'Campeo do Mundo em 2022', 'Parceiro de Messi na selecao argentina'],
  'mac-allister': ['Meia do Liverpool', 'Campeo do Mundo em 2022', 'Revelado pelo Brighton'],
  'alvarez': ['Atacante do Manchester City', 'Campeo do Mundo em 2022', 'Revelado pelo River Plate'],
  'molina': ['Lateral direito do Atletico Madrid', 'Campeo do Mundo em 2022', 'Revelado pelo Udinese'],
  'otamendi': ['Zagueiro campeo do Mundo em 2022', 'Jogou no Manchester City por anos', 'Revelado pelo Velez Sarsfield'],
  'romero': ['Zagueiro do Tottenham', 'Campeo do Mundo em 2022', 'Revelado pelo Juventus e Atalanta'],

  // Franceses
  'griezmann': ['Atacante do Atletico Madrid', 'Campeo do Mundo em 2018', 'Jogou no Barcelona por dois anos'],
  'dembele': ['Extremo rapido do PSG', 'Campeo do Mundo em 2018', 'Revelado pelo Rennes e Dortmund'],
  'thuram-marcus': ['Filho do lendario Lilian Thuram', 'Campeo do Mundo em 2018', 'Jogou no Inter de Milao'],
  'kante': ['Volante incansavel do Chelsea', 'Campeo do Mundo em 2018', 'Dois titulos da Premier League consecutivos'],
  'pogba': ['Meia poderoso da Juventus e United', 'Campeo do Mundo em 2018', 'Transferencia recorde para o United em 2016'],
  'desailly': ['Zagueiro campeo do Mundo em 1998', 'Jogou no Milan e Chelsea', 'Lenda da defesa francesa'],
  'platini': ['Considerado o melhor jogador europeu dos anos 80', 'Tres Bolas de Ouro consecutivas', 'Jogou na Juventus e virou dirigente'],
  'vieira': ['Volante poderoso do Arsenal', 'Campeo do Mundo em 1998', 'Capito do Arsenal do Invicto'],
  'ribery': ['Extremo magico do Bayern', 'Campeo do Mundo em 2018 nao, mas figurou na era de ouro', 'Jogou no Bayern por 12 anos'],
  'makelele': ['Volante que deu nome ao papel de primeiro volante', 'Jogou no Real Madrid e Chelsea', 'Campeo do Mundo em 1998'],

  // Espanhois
  'pedri': ['Meia prodigo do Barcelona', 'Revelado pelo Las Palmas', 'Considerado o novo Iniesta'],
  'yamal': ['Extremo prodigio do Barcelona', 'Marcou na Eurocopa 2024 com 17 anos', 'Revelado pela academia do Barcelona'],
  'gavi': ['Meia central do Barcelona', 'Ganhou o Balon dOr Kopa em 2022', 'Revelado pela academia do Barcelona'],
  'olmo': ['Meia atacante da Espanha', 'Campeo da Eurocopa 2024', 'Jogou no RB Leipzig antes do Barcelona'],
  'morata': ['Atacante campeo da Eurocopa 2024', 'Jogou no Chelsea, Juventus e Atletico Madrid', 'Capito da selecao espanhola'],
  'puyol': ['Zagueiro lenda do Barcelona', 'Campeo do Mundo em 2010', 'Capito historico do Barcelona'],
  'casillas': ['Goleiro lenda do Real Madrid', 'Campeo do Mundo em 2010', 'Apodado de Santo Iker'],
  'villa': ['Artilheiro historico da selecao espanhola', 'Campeo do Mundo em 2010', 'Jogou no Barcelona e Atletico Madrid'],
  'torres': ['Atacante campeo do Mundo em 2010', 'Gol da final da Eurocopa 2008', 'Jogou no Liverpool e Chelsea'],
  'busquets': ['Volante lenda do Barcelona', 'Campeo do Mundo em 2010', 'Pilar do tiki-taka por 15 anos'],
  'alba': ['Lateral esquerdo lenda do Barcelona', 'Campeo do Mundo em 2010', 'Jogou no Inter Miami com Messi'],

  // Portugueses
  'bernardo-silva': ['Meia tecnico do Manchester City', 'Multiplos titulos da Premier League', 'Revelado pelo Monaco'],
  'joao-felix': ['Atacante criativo do Milan', 'Transferencia recorde para o Atletico Madrid', 'Revelado pelo Benfica'],
  'figo': ['Extremo lenda do Barcelona e Real Madrid', 'Balon dOr em 2000', 'Polêmica transferencia Barca-Madrid'],
  'eusebio': ['Artilheiro lenda do Benfica', 'Artilheiro da Copa de 1966', 'Considerado o melhor portugues antes de Ronaldo'],

  // Alemaes
  'kroos': ['Meia lenda do Real Madrid', 'Campeo do Mundo em 2014', 'Voltou da aposentadoria para a Eurocopa 2024'],
  'kimmich': ['Meia e lateral do Bayern', 'Multiplos titulos do Bundesliga', 'Um dos melhores meias da Europa'],
  'musiala': ['Meia prodigo do Bayern', 'Nasceu na Inglaterra mas joga pela Alemanha', 'Um dos melhores jovens do mundo'],
  'wirtz': ['Meia do Bayer Leverkusen', 'Campeo invicto da Bundesliga em 2024', 'Considerado um dos melhores jovens da Europa'],
  'sane': ['Extremo do Bayern e selecao alema', 'Jogou no Manchester City com Guardiola', 'Revelado pelo Schalke'],
  'gnabry': ['Atacante do Bayern', 'Marcou 4 gols no Tottenham pela Champions', 'Revelado pelo Arsenal'],
  'goretzka': ['Meia box-to-box do Bayern', 'Campeo do Mundo em 2014 nao, mas campeao europeu', 'Jogou no Schalke antes do Bayern'],
  'boateng': ['Zagueiro campeo do Mundo em 2014', 'Jogou no Bayern por muitos anos', 'Irmao de Kevin-Prince Boateng'],
  'schweinsteiger': ['Meia campeo do Mundo em 2014', 'Lenda do Bayern de Munique', 'Jogou no Manchester United no final da carreira'],
  'lahm': ['Lateral campeo do Mundo em 2014', 'Considerado o melhor lateral da era moderna', 'Capito do Bayern e da Alemanha'],
  'muller': ['Atacante inteligente do Bayern', 'Dois titulos de Copa do Mundo', 'Conhecido pelos gols e assistencias'],
  'klose': ['Artilheiro historico das Copas do Mundo', 'Marcou 16 gols em Copas do Mundo', 'Campeo do Mundo em 2014'],
  'beckenbauer': ['Considerado o melhor defensor da historia', 'Campeo do Mundo como jogador e tecnico', 'Inventou o libero moderno'],
  'matthaus': ['Unico campeo do Mundo com 5 participacoes', 'Balon dOr em 1990', 'Jogou no Bayern e Inter de Milao'],

  // Ingleses
  'saka': ['Extremo do Arsenal e selecao inglesa', 'Jogador chave do Arsenal atual', 'Revelado pela academia do Arsenal'],
  'foden': ['Meia do Manchester City', 'Multiplos titulos da Premier League', 'Revelado pela academia do City'],
  'trent': ['Lateral direito criativo do Liverpool', 'Titular da selecao inglesa', 'Revelado pela academia do Liverpool'],
  'rice': ['Volante do Arsenal', 'Transferencia recorde para o Arsenal em 2023', 'Revelado pelo West Ham'],
  'palmer': ['Meia atacante do Chelsea', 'Revelado pela academia do Manchester City', 'Artilheiro da Premier League 2024'],
  'sterling': ['Extremo do Chelsea e selecao inglesa', 'Multiplos titulos com o Manchester City', 'Revelado pelo Queens Park Rangers'],
  'beckham': ['Meia com cruzamento perfeito', 'Jogou no Real Madrid, LA Galaxy e PSG', 'Um dos jogadores mais famosos do mundo'],
  'scholes': ['Meia lenda do Manchester United', 'Considerado um dos melhores meias ingleses', 'Passou toda carreira no United'],
  'giggs': ['Extremo lenda do Manchester United', 'Um dos jogadores mais titulados da historia', 'Passou toda carreira no United'],
  'shearer': ['Artilheiro historico da Premier League', 'Jogou no Blackburn e Newcastle', 'Artilheiro da Premier League com 260 gols'],
  'lineker': ['Artilheiro ingles dos anos 80', 'Artilheiro da Copa do Mundo de 1986', 'Jogou no Barcelona e Tottenham'],

  // Italianos
  'del-piero': ['Atacante lenda da Juventus', 'Capito da Juventus por anos', 'Campeo do Mundo em 2006'],
  'cannavaro': ['Zagueiro campeo do Mundo em 2006', 'Balon dOr em 2006', 'Jogou na Juventus e Real Madrid'],
  'barella': ['Meia do Inter de Milao', 'Campeo da Serie A com a Inter', 'Pilar da selecao italiana atual'],
  'chiesa': ['Atacante rapido da Italia', 'Filho do ex-jogador Enrico Chiesa', 'Jogou na Juventus e Liverpool'],
  'verratti': ['Meia tecnico do PSG por 11 anos', 'Considerado um dos melhores meias da Serie A', 'Revelado pelo Pescara'],
  'donnarumma': ['Goleiro prodigo do Milan e PSG', 'Melhor jogador da Eurocopa 2020', 'Estreou profissionalmente aos 16 anos'],
  'inzaghi': ['Atacante lenda do Milan', 'Artilheiro na Champions League', 'Irmao do tecnico Simone Inzaghi'],
  'nesta': ['Zagueiro lenda do Milan', 'Considerado um dos melhores zagueiros da historia', 'Jogou no Lazio e Milan'],
  'baggio': ['Meia atacante lenda do futebol italiano', 'Perdeu o pênalti na final de 1994', 'Balon dOr em 1993'],
  'materazzi': ['Zagueiro que levou a cabecada de Zidane', 'Campeo do Mundo em 2006', 'Jogou no Inter por muitos anos'],

  // Holandeses
  'virgil': ['Zagueiro do Liverpool', 'Finalista do Balon dOr em 2019', 'Um dos melhores zagueiros modernos'],
  'de-bruyne': ['Meia criativo do Manchester City', 'Considerado um dos melhores meias do mundo', 'Revelado pelo Genk e Chelsea'],
  'van-nistelrooy': ['Artilheiro lenda do Manchester United', 'Artilheiro historico da Champions League', 'Jogou no Real Madrid e Hamburgo'],
  'rijkaard': ['Meia e zagueiro lenda do Milan', 'Campeo da Europa com a Holanda em 1988', 'Treinou o Barcelona no seculo XXI'],
  'dumfries': ['Lateral direito do Inter de Milao', 'Titular da selecao holandesa', 'Revelado pelo PSV'],
  'depay': ['Atacante versatil da Holanda', 'Jogou no Lyon, Barcelona e Atletico Madrid', 'Revelado pelo PSV'],

  // Belgas
  'hazard': ['Extremo lenda do Chelsea', 'Melhor jogador da Belgica', 'Foi para o Real Madrid em 2019'],
  'lukaku': ['Atacante poderoso da Belgica', 'Maior artilheiro da selecao belga', 'Jogou no Chelsea, Inter e Roma'],
  'courtois': ['Goleiro do Real Madrid', 'Melhor goleiro da Copa do Mundo 2018', 'Jogou no Chelsea por anos'],
  'kompany': ['Zagueiro lenda do Manchester City', 'Capito do City por anos', 'Revelado pelo Anderlecht'],
  'odegaard': ['Meia capito do Arsenal', 'Revelado pelo Real Madrid', 'Um dos melhores meias da Premier League'],
  'kovacic': ['Meia do Manchester City', 'Campeo da Champions League pelo Real Madrid', 'Jogou no Chelsea antes do City'],

  // Africanos e outros
  'mane': ['Extremo do Bayern e senegalês', 'Ganhou a Champions League pelo Liverpool', 'Melhor jogador africano multiplas vezes'],
  'etoo': ['Atacante campeo com Barcelona e Inter', 'Quadruplo campeo da Champions League', 'Maior artilheiro dos Camaroes'],
  'weah': ['Atacante liberiense Balon dOr 1995', 'Pai do presidente George Weah', 'Jogou no PSG e Milan'],
  'ibrahimovic': ['Atacante com 30 anos de carreira', 'Jogou em quase todos os grandes times da Europa', 'Nunca ganhou a Champions League'],
  'cavani': ['Artilheiro historico do PSG', 'Jogou no Napoli, PSG e Manchester United', 'Maior artilheiro da selecao uruguaia'],
  'forlan': ['Atacante uruguaio Balon dOr da Copa 2010', 'Jogou no Atletico Madrid e Inter de Milao', 'Melhor jogador da Copa do Mundo 2010'],
  'nakata': ['Meia japones que brilhou na Serie A', 'Jogou no Perugia, Roma e Fiorentina', 'Primeiro grande jogador asiatico na Europa'],
  'kagawa': ['Meia japones do Borussia Dortmund', 'Jogou no Manchester United', 'Bicampeo da Bundesliga'],
}

let content = fs.readFileSync(dbPath, 'utf-8')
let updated = 0
let notFound = []

for (const [id, hints] of Object.entries(HINTS)) {
  // Encontra a linha com o jogador
  const regex = new RegExp(`(\\{ id: '${id}',[^}]+)(\\})`, 'g')
  const before = content
  content = content.replace(regex, (match, body, close) => {
    if (match.includes('hints:')) return match // já tem hints
    updated++
    const hintsStr = JSON.stringify(hints)
    return `${body}, hints: ${hintsStr} ${close}`
  })
  if (content === before && !content.includes(`hints already`)) {
    // Verifica se o ID existe
    if (content.includes(`id: '${id}'`)) {
      // Já tinha hints ou outro problema
    } else {
      notFound.push(id)
    }
  }
}

fs.writeFileSync(dbPath, content, 'utf-8')
console.log(`✓ ${updated} jogadores atualizados com hints`)
if (notFound.length) console.log(`⚠ IDs não encontrados: ${notFound.join(', ')}`)
