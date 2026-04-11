#!/usr/bin/env node
import fs from 'fs'
import https from 'https'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../lib/games/players-db.ts')
const imgDir = path.join(__dirname, '../public/images/players')

const FINAL_NAMES = {
  'gabriel-jesus': 'Gabriel_Jesus',
  'otamendi': 'Nicolás_Otamendi',
  'morata': 'Álvaro_Morata',
  'torres': 'Fernando_Torres',
  'kimmich': 'Joshua_Kimmich',
  'musiala': 'Jamal_Musiala',
  'goretzka': 'Goretzka',
  'boateng': 'Jérôme_Boateng',
  'klose': 'Miroslav_Klose',
  'sterling': 'Raheem_Sterling',
  'giggs': 'Ryan_Giggs',
  'verratti': 'Marco_Verratti',
  'donnarumma': 'Gianluigi_Donnarumma',
  'virgil': 'Virgil_van_Dijk',
  'van-nistelrooy': 'Ruud_van_Nistelrooy',
  'hazard': 'Eden_Hazard',
  'kagawa': 'Shinji_Kagawa',
  'lautaro': 'Lautaro_Martínez',
  'vieira': 'Patrick_Vieira',
  'eusebio': 'Eusébio',
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Futzada/1.0', ...headers } }, (res) => {
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
    return data.thumbnail?.source || null
  } catch { return null }
}

async function downloadImage(imageUrl, destPath) {
  try {
    const res = await httpsGet(imageUrl, { 'Referer': 'https://en.wikipedia.org/' })
    if (res.status !== 200) return false
    if (!(res.headers['content-type'] || '').includes('image')) return false
    fs.writeFileSync(destPath, res.body)
    return true
  } catch { return false }
}

async function main() {
  const ids = Object.keys(FINAL_NAMES)
  const downloaded = []
  const failed = []

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]
    const destPath = path.join(imgDir, `${id}.jpg`)
    if (fs.existsSync(destPath)) { downloaded.push(id); continue }

    process.stdout.write(`[${i+1}/${ids.length}] ${id}... `)
    const imgUrl = await getWikiImageUrl(FINAL_NAMES[id])
    if (!imgUrl) { console.log('❌ sem imagem'); failed.push(id); await sleep(400); continue }
    const ok = await downloadImage(imgUrl, destPath)
    if (ok) { console.log('✓'); downloaded.push(id) }
    else { console.log('❌'); failed.push(id) }
    await sleep(1000 + Math.random() * 500)
  }

  console.log(`\n✓ ${downloaded.length} | ❌ ${failed.length}`)
  if (failed.length) console.log('Falharam:', failed.join(', '))

  // Atualiza DB
  let dbContent = fs.readFileSync(dbPath, 'utf-8')
  let updated = 0
  for (const id of downloaded) {
    if (!fs.existsSync(path.join(imgDir, `${id}.jpg`))) continue
    const imgPath = `/images/players/${id}.jpg`
    const regex = new RegExp(`(id: '${id}'[^}]*?)(,\\s*hints:)`)
    dbContent = dbContent.replace(regex, (match, body, hintsStart) => {
      if (body.includes('imageUrl:')) return match
      updated++
      return `${body}, imageUrl: '${imgPath}'${hintsStart}`
    })
  }
  fs.writeFileSync(dbPath, dbContent, 'utf-8')
  console.log(`DB: ${updated} atualizados`)
}

main().catch(console.error)
