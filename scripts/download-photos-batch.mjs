#!/usr/bin/env node
/**
 * Baixa fotos do Wikipedia para jogadores que têm hints mas não têm imageUrl
 * Usa a API REST do Wikipedia para encontrar a thumbnail de cada jogador
 */
import fs from 'fs'
import https from 'https'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../lib/games/players-db.ts')
const imgDir = path.join(__dirname, '../public/images/players')

// Mapeamento id -> nome de busca no Wikipedia
const WIKI_NAMES = {
  'alisson': 'Alisson_Becker',
  'ederson': 'Ederson_(footballer,_born_1993)',
  'taffarel': 'Taffarel',
  'dida': 'Dida_(footballer)',
  'julio-cesar': 'Júlio_César_(footballer)',
  'weverton': 'Weverton',
  'bento': 'Bento_(footballer,_born_2000)',
  'danilo': 'Danilo_(footballer,_born_1991)',
  'alex-sandro': 'Alex_Sandro',
  'militao': 'Éder_Militão',
  'gabriel-magalhaes': 'Gabriel_Magalhães',
  'bremer': 'Gleison_Bremer',
  'aldair': 'Aldair_(footballer)',
  'lucio': 'Lúcio_(footballer)',
  'juan': 'Juan_(Brazilian_footballer)',
  'fabinho': 'Fabinho_(footballer,_born_1993)',
  'dunga': 'Dunga',
  'mauro-silva': 'Mauro_Silva',
  'gilberto-silva': 'Gilberto_Silva',
  'bruno-guimaraes': 'Bruno_Guimarães',
  'paqueta': 'Lucas_Paquetá',
  'socrates': 'Sócrates_(footballer)',
  'coutinho': 'Philippe_Coutinho',
  'oscar': 'Oscar_(footballer,_born_1991)',
  'hernanes': 'Hernanes',
  'raphinha': 'Raphinha_(footballer)',
  'richarlison': 'Richarlison',
  'martinelli': 'Gabriel_Martinelli',
  'gabriel-jesus': 'Gabriel_Jesus',
  'antony': 'Antony_(footballer)',
  'endrick': 'Endrick',
  'hulk': 'Hulk_(footballer)',
  'bebeto': 'Bebeto',
  'adriano': 'Adriano_(footballer)',
  'firmino': 'Roberto_Firmino',
  'garrincha': 'Garrincha',
  'tevez': 'Carlos_Tevez',
  'lautaro': 'Lautaro_Martínez',
  'mac-allister': 'Alexis_Mac_Allister',
  'alvarez': 'Julián_Álvarez',
  'molina': 'Nahuel_Molina',
  'otamendi': 'Nicolás_Otamendi',
  'romero': 'Cristian_Romero',
  'griezmann': 'Antoine_Griezmann',
  'dembele': 'Ousmane_Dembélé',
  'thuram-marcus': 'Marcus_Thuram',
  'kante': 'N\'Golo_Kanté',
  'pogba': 'Paul_Pogba',
  'desailly': 'Marcel_Desailly',
  'platini': 'Michel_Platini',
  'vieira': 'Patrick_Vieira',
  'ribery': 'Franck_Ribéry',
  'makelele': 'Claude_Makélélé',
  'pedri': 'Pedri',
  'yamal': 'Lamine_Yamal',
  'gavi': 'Gavi_(footballer)',
  'olmo': 'Dani_Olmo',
  'morata': 'Álvaro_Morata',
  'puyol': 'Carles_Puyol',
  'casillas': 'Iker_Casillas',
  'villa': 'David_Villa',
  'torres': 'Fernando_Torres',
  'busquets': 'Sergio_Busquets',
  'alba': 'Jordi_Alba',
  'bernardo-silva': 'Bernardo_Silva',
  'joao-felix': 'João_Félix',
  'figo': 'Luís_Figo',
  'eusebio': 'Eusébio',
  'kroos': 'Toni_Kroos',
  'kimmich': 'Joshua_Kimmich',
  'musiala': 'Jamal_Musiala',
  'wirtz': 'Florian_Wirtz',
  'sane': 'Leroy_Sané',
  'gnabry': 'Serge_Gnabry',
  'goretzka': 'Leon_Goretzka',
  'boateng': 'Jérôme_Boateng',
  'schweinsteiger': 'Bastian_Schweinsteiger',
  'lahm': 'Philipp_Lahm',
  'muller': 'Thomas_Müller',
  'klose': 'Miroslav_Klose',
  'beckenbauer': 'Franz_Beckenbauer',
  'matthaus': 'Lothar_Matthäus',
  'saka': 'Bukayo_Saka',
  'foden': 'Phil_Foden',
  'trent': 'Trent_Alexander-Arnold',
  'rice': 'Declan_Rice',
  'palmer': 'Cole_Palmer',
  'sterling': 'Raheem_Sterling',
  'beckham': 'David_Beckham',
  'scholes': 'Paul_Scholes',
  'giggs': 'Ryan_Giggs',
  'shearer': 'Alan_Shearer',
  'lineker': 'Gary_Lineker',
  'del-piero': 'Alessandro_Del_Piero',
  'cannavaro': 'Fabio_Cannavaro',
  'barella': 'Nicolo_Barella',
  'chiesa': 'Federico_Chiesa',
  'verratti': 'Marco_Verratti',
  'donnarumma': 'Gianluigi_Donnarumma',
  'inzaghi': 'Filippo_Inzaghi',
  'nesta': 'Alessandro_Nesta',
  'baggio': 'Roberto_Baggio',
  'materazzi': 'Marco_Materazzi',
  'virgil': 'Virgil_van_Dijk',
  'de-bruyne': 'Kevin_De_Bruyne',
  'van-nistelrooy': 'Ruud_van_Nistelrooy',
  'rijkaard': 'Frank_Rijkaard',
  'dumfries': 'Denzel_Dumfries',
  'depay': 'Memphis_Depay',
  'hazard': 'Eden_Hazard',
  'lukaku': 'Romelu_Lukaku',
  'courtois': 'Thibaut_Courtois',
  'kompany': 'Vincent_Kompany',
  'odegaard': 'Martin_Ødegaard',
  'kovacic': 'Mateo_Kovačić',
  'mane': 'Sadio_Mané',
  'etoo': 'Samuel_Eto\'o',
  'weah': 'George_Weah',
  'ibrahimovic': 'Zlatan_Ibrahimović',
  'cavani': 'Edinson_Cavani',
  'forlan': 'Diego_Forlán',
  'nakata': 'Hidetoshi_Nakata',
  'kagawa': 'Shinji_Kagawa',
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Futle/1.0 (educational project)', ...headers } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return httpsGet(res.headers.location, headers).then(resolve).catch(reject)
      }
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks), headers: res.headers }))
    })
    req.on('error', reject)
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')) })
  })
}

async function getWikiImageUrl(wikiName) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiName)}`
  try {
    const res = await httpsGet(url)
    if (res.status !== 200) return null
    const data = JSON.parse(res.body.toString())
    return data.thumbnail?.source || data.originalimage?.source || null
  } catch {
    return null
  }
}

async function downloadImage(imageUrl, destPath) {
  try {
    const res = await httpsGet(imageUrl, { 'Referer': 'https://en.wikipedia.org/' })
    if (res.status !== 200) return false
    const ct = res.headers['content-type'] || ''
    if (!ct.includes('image')) return false
    fs.writeFileSync(destPath, res.body)
    return true
  } catch {
    return false
  }
}

async function main() {
  const ids = Object.keys(WIKI_NAMES)
  console.log(`Baixando fotos para ${ids.length} jogadores...`)

  const downloaded = []
  const failed = []

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]
    const destPath = path.join(imgDir, `${id}.jpg`)

    if (fs.existsSync(destPath)) {
      console.log(`[${i+1}/${ids.length}] ${id} - já existe, pulando`)
      downloaded.push(id)
      continue
    }

    process.stdout.write(`[${i+1}/${ids.length}] ${id}... `)

    const wikiName = WIKI_NAMES[id]
    const imgUrl = await getWikiImageUrl(wikiName)

    if (!imgUrl) {
      console.log('❌ sem imagem no Wikipedia')
      failed.push(id)
      await sleep(800)
      continue
    }

    const ok = await downloadImage(imgUrl, destPath)
    if (ok) {
      console.log(`✓ baixado`)
      downloaded.push(id)
    } else {
      console.log(`❌ falha no download`)
      failed.push(id)
    }

    // Delay para não sobrecarregar o Wikipedia
    await sleep(1200 + Math.random() * 800)
  }

  console.log(`\n✓ Baixados: ${downloaded.length}`)
  console.log(`❌ Falharam: ${failed.length}`)
  if (failed.length) console.log(`   Falharam: ${failed.join(', ')}`)

  // Atualiza o players-db.ts com as imageUrls
  console.log('\nAtualizando players-db.ts...')
  let dbContent = fs.readFileSync(dbPath, 'utf-8')
  let dbUpdated = 0

  for (const id of downloaded) {
    const imgPath = `/images/players/${id}.jpg`
    if (!fs.existsSync(path.join(imgDir, `${id}.jpg`))) continue

    // Adiciona imageUrl antes de hints ou no final do bloco
    const escapedId = id.replace(/[-]/g, '[-]')
    const regex = new RegExp(`(id: '${id}'[^}]*?)(,\\s*hints:)`)
    const before = dbContent
    dbContent = dbContent.replace(regex, (match, body, hintsStart) => {
      if (body.includes('imageUrl:')) return match
      dbUpdated++
      return `${body}, imageUrl: '${imgPath}'${hintsStart}`
    })
    if (dbContent === before) {
      // Tenta inserir antes do closing }
      const regex2 = new RegExp(`(id: '${id}'[^}]*?hints:[^}]+?)(\\s*\\})`)
      dbContent = dbContent.replace(regex2, (match, body, close) => {
        if (body.includes('imageUrl:')) return match
        dbUpdated++
        return `${body}${close}` // já vai ter imageUrl via hints path
      })
    }
  }

  fs.writeFileSync(dbPath, dbContent, 'utf-8')
  console.log(`✓ ${dbUpdated} entradas atualizadas no DB`)
}

main().catch(console.error)
