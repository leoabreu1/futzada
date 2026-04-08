import { PLAYERS_DB } from './players-db'

export type CraquePlayer = {
  id: string
  name: string
  nationality: string
  position: string
  club: string
  imageUrl: string
  hints: string[]
  transfermarktId?: string
}

// Mapping manual de IDs Transfermarkt (extraído de URLs públicas)
const TRANSFERMARKT_IDS: Record<string, string> = {
  // Brasileiros Atuais
  'thiago-silva': '44819',
  'casemiro': '50679',
  'neymar': '68290',
  'vinicius': '371998',
  'rodrygo': '412363',
  'alisson': '182506',
  'ederson': '233453',
  'marquinhos': '120220',
  'militao': '357594',
  'gabriel-magalhaes': '336999',
  'danilo': '38953',
  'alex-sandro': '17016',
  'bruno-guimaraes': '370333',
  'paqueta': '336049',
  'gabriel-jesus': '333450',
  'martinelli': '435989',
  'raphinha': '338980',
  'richarlison': '334879',

  // Top Europeus Atuais
  'haaland': '418735',
  'bellingham': '595223',
  'rodri': '446514',
  'salah': '148455',
  'van-dijk': '203114',
  'de-bruyne': '50060',
  'lewandowski': '8044',
  'kane': '38253',
  'mbappé': '342229',
  'viniciusjr': '371998',

  // Lendas Brasileiras
  'ronaldinho': '6479',
  'ronaldo': '6426',
  'kaka': '7600',
  'pelé': '58',
  'ronaldo-fenomeno': '6426',  // mesmo ID, é o mesmo jogador
  'zico': '7538',
  'rivaldo': '5873',
  'socrates': '27524',
  'romario': '23934',
  'bebeto': '6089',
  'cafu': '1699',
  'roberto-carlos': '2486',

  // Lendas Internacionais
  'messi': '28003',
  'cristiano': '5885',
  'benzema': '14210',
  'modric': '17905',
  'iniesta': '14275',
  'xavi': '7572',
  'busquets': '87533',
  'ramos': '44768',
  'pique': '23657',
  'neuer': '17215',
  'buffon': '3751',
  'zidane': '7572',
  'figo': '8209',
  'ronaldinho-gaucho': '6479',
}

function getTransfermarktImageUrl(id: string): string {
  // Sofascore API (mais confiável que Transfermarkt)
  return `https://images.fotmob.com/image_resources/playerimages/${id}.png`
}

// Filtra apenas jogadores com dicas definidas E foto disponível
export const CRAQUE_PLAYERS: CraquePlayer[] = PLAYERS_DB
  .filter(p => p.hints && p.hints.length >= 3 && (p.imageUrl || TRANSFERMARKT_IDS[p.id]))
  .map(p => {
    const tmId = TRANSFERMARKT_IDS[p.id]
    // Prioriza imageUrl definida no DB, senão tenta gerar via fotmob
    const imageUrl = p.imageUrl || (tmId ? getTransfermarktImageUrl(tmId) : null)

    return {
      id: p.id,
      name: p.name,
      nationality: p.nationality,
      position: p.position,
      club: p.clubs[p.clubs.length - 1],
      imageUrl: imageUrl!,
      hints: p.hints!,
      transfermarktId: tmId,
    }
  })

export function getDailyCraque(): CraquePlayer {
  const today = new Date().toISOString().split('T')[0]
  const seed = today.split('-').reduce((acc, n) => acc + parseInt(n), 0)
  return CRAQUE_PLAYERS[seed % CRAQUE_PLAYERS.length]
}
