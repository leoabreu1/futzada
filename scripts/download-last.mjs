import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imgDir = path.join(__dirname, '../public/images/players')
const dbPath = path.join(__dirname, '../lib/games/players-db.ts')

const NAMES = {
  'morata': 'Alvaro_Morata',
  'kimmich': 'Joshua_Kimmich',
  'goretzka': 'Leon_Goretzka',
  'boateng': 'Jerome_Boateng',
  'klose': 'Miroslav_Klose',
  'verratti': 'Marco_Verratti',
  'donnarumma': 'Gianluigi_Donnarumma',
  'van-nistelrooy': 'Ruud_van_Nistelrooy',
  'hazard': 'Eden_Hazard',
  'kagawa': 'Shinji_Kagawa',
  'vieira': 'Patrick_Vieira',
  'eusebio': 'Eusebio',
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

function get(url, h = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Futle/1.0', ...h } }, res => {
      if ([301, 302].includes(res.statusCode)) return get(res.headers.location, h).then(resolve).catch(reject)
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks), ct: res.headers['content-type'] || '' }))
    })
    req.on('error', reject)
    req.setTimeout(12000, () => { req.destroy(); reject(new Error('timeout')) })
  })
}

const downloaded = []
const failed = []

for (const [id, name] of Object.entries(NAMES)) {
  const dest = path.join(imgDir, id + '.jpg')
  if (fs.existsSync(dest)) { console.log(id, 'ja existe'); downloaded.push(id); continue }
  process.stdout.write(id + '... ')
  try {
    const r = await get('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(name))
    const d = JSON.parse(r.body.toString())
    const imgUrl = d.thumbnail?.source
    if (!imgUrl) { console.log('sem img'); failed.push(id); await sleep(1500); continue }
    const r2 = await get(imgUrl, { 'Referer': 'https://en.wikipedia.org/' })
    if (r2.status === 200 && r2.ct.includes('image')) {
      fs.writeFileSync(dest, r2.body)
      console.log('OK')
      downloaded.push(id)
    } else { console.log('status ' + r2.status); failed.push(id) }
  } catch (e) { console.log('err ' + e.message); failed.push(id) }
  await sleep(2000 + Math.random() * 1000)
}

console.log('OK:', downloaded.length, '| Fail:', failed.length, failed.join(', '))

// Atualiza DB
let db = fs.readFileSync(dbPath, 'utf-8')
let upd = 0
for (const id of downloaded) {
  if (!fs.existsSync(path.join(imgDir, id + '.jpg'))) continue
  const regex = new RegExp(`(id: '${id}'[^}]*?)(,\\s*hints:)`)
  db = db.replace(regex, (m, body, h) => {
    if (body.includes('imageUrl:')) return m
    upd++
    return body + `, imageUrl: '/images/players/${id}.jpg'` + h
  })
}
fs.writeFileSync(dbPath, db, 'utf-8')
console.log('DB atualizado:', upd)
