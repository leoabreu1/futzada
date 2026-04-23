#!/usr/bin/env node
/**
 * Retry para os jogadores que falharam - tenta nomes alternativos no Wikipedia
 */
import fs from 'fs'
import https from 'https'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../lib/games/players-db.ts')
const imgDir = path.join(__dirname, '../public/images/players')

// Nomes alternativos para tentar
const RETRY_NAMES = {
  'dida': 'Dida_(goalkeeper)',
  'julio-cesar': 'Júlio_César_(goalkeeper)',
  'weverton': 'Weverton_Cássio',
  'bento': 'Bento_(goalkeeper)',
  'alex-sandro': 'Alex_Sandro_Lobo_Silva',
  'militao': 'Eder_Militao',
  'bremer': 'Bremer_(footballer)',
  'aldair': 'Aldair',
  'lucio': 'Lucio_(footballer)',
  'juan': 'Juan_Guilherme_Nunes_Jesus',
  'dunga': 'Dunga_(footballer)',
  'mauro-silva': 'Mauro_Silva_(footballer)',
  'bruno-guimaraes': 'Bruno_Guimaraes',
  'raphinha': 'Raphinha',
  'gabriel-jesus': 'Gabriel_Jesus_(footballer)',
  'antony': 'Antony_Matheus_dos_Santos',
  'endrick': 'Endrick_(footballer)',
  'adriano': 'Adriano_Leite_Ribeiro',
  'tevez': 'Carlos_Alberto_Tevez',
  'lautaro': 'Lautaro_Martinez',
  'molina': 'Nahuel_Molina_Lucero',
  'otamendi': 'Nicolas_Otamendi',
  'pogba': 'Paul_Labile_Pogba',
  'vieira': 'Patrick_Vieira_(footballer)',
  'morata': 'Alvaro_Morata',
  'torres': 'Fernando_Torres_(footballer)',
  'alba': 'Jordi_Alba_Ramos',
  'bernardo-silva': 'Bernardo_Mota_Veiga_de_Carvalho_e_Silva',
  'eusebio': 'Eusébio_(footballer)',
  'kimmich': 'Joshua_Kimmich_(footballer)',
  'musiala': 'Jamal_Musiala_(footballer)',
  'goretzka': 'Leon_Goretzka_(footballer)',
  'boateng': 'Jérôme_Boateng_(footballer)',
  'muller': 'Thomas_Muller',
  'klose': 'Miroslav_Klose_(footballer)',
  'sterling': 'Raheem_Sterling_(footballer)',
  'giggs': 'Ryan_Giggs_(footballer)',
  'barella': 'Nicolò_Barella',
  'verratti': 'Marco_Verratti_(footballer)',
  'donnarumma': 'Gianluigi_Donnarumma_(footballer)',
  'virgil': 'Virgil_van_Dijk_(footballer)',
  'van-nistelrooy': 'Ruud_van_Nistelrooy_(footballer)',
  'hazard': 'Eden_Hazard_(footballer)',
  'kovacic': 'Mateo_Kovacic',
  'forlan': 'Diego_Forlan',
  'kagawa': 'Shinji_Kagawa_(footballer)',
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
  const ids = Object.keys(RETRY_NAMES)
  console.log(`Retry para ${ids.length} jogadores...`)

  const downloaded = []
  const failed = []

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]
    const destPath = path.join(imgDir, `${id}.jpg`)

    if (fs.existsSync(destPath)) {
      console.log(`[${i+1}/${ids.length}] ${id} - já existe`)
      downloaded.push(id)
      continue
    }

    process.stdout.write(`[${i+1}/${ids.length}] ${id}... `)

    const wikiName = RETRY_NAMES[id]
    const imgUrl = await getWikiImageUrl(wikiName)

    if (!imgUrl) {
      console.log('❌ sem imagem')
      failed.push(id)
      await sleep(500)
      continue
    }

    const ok = await downloadImage(imgUrl, destPath)
    if (ok) {
      console.log(`✓`)
      downloaded.push(id)
    } else {
      console.log(`❌ falha download`)
      failed.push(id)
    }

    await sleep(1000 + Math.random() * 600)
  }

  console.log(`\n✓ Baixados: ${downloaded.length}`)
  console.log(`❌ Falharam: ${failed.length}`)
  if (failed.length) console.log(`   ${failed.join(', ')}`)

  // Atualiza DB com imageUrls dos recém baixados
  console.log('\nAtualizando players-db.ts...')
  let dbContent = fs.readFileSync(dbPath, 'utf-8')
  let dbUpdated = 0

  for (const id of downloaded) {
    if (!fs.existsSync(path.join(imgDir, `${id}.jpg`))) continue
    const imgPath = `/images/players/${id}.jpg`
    // Insere imageUrl antes de hints se ainda não tiver
    const regex = new RegExp(`(id: '${id}'[^}]*?)(,\\s*hints:)`)
    const before = dbContent
    dbContent = dbContent.replace(regex, (match, body, hintsStart) => {
      if (body.includes('imageUrl:')) return match
      dbUpdated++
      return `${body}, imageUrl: '${imgPath}'${hintsStart}`
    })
  }

  fs.writeFileSync(dbPath, dbContent, 'utf-8')
  console.log(`✓ ${dbUpdated} entradas atualizadas`)
}

main().catch(console.error)
