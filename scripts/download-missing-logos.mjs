/**
 * Download logos for clubs missing from CLUB_LOGOS
 * Uses TheSportsDB free API
 */
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'

const OUT_DIR = path.resolve('public/images/clubs')
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

const CLUBS_TO_DOWNLOAD = [
  // Serie A
  { name: 'Napoli',          slug: 'napoli',          search: 'Napoli' },
  { name: 'Salernitana',     slug: 'salernitana',     search: 'Salernitana' },
  { name: 'Como',            slug: 'como',            search: 'Como 1907' },
  { name: 'Brescia',         slug: 'brescia',         search: 'Brescia' },
  { name: 'AC Monza',        slug: 'ac-monza',        search: 'Monza' },

  // La Liga
  { name: 'Sevilla',         slug: 'sevilla',         search: 'Sevilla' },

  // Premier League
  { name: 'Derby County',    slug: 'derby-county',    search: 'Derby County' },
  { name: 'Bolton',          slug: 'bolton',          search: 'Bolton Wanderers' },

  // Bundesliga
  { name: 'Hamburg',         slug: 'hamburg',         search: 'Hamburger SV' },

  // Ligue 1
  // (Monaco already covered)

  // Eredivisie
  { name: 'Feyenoord',       slug: 'feyenoord',       search: 'Feyenoord' },

  // Belgium
  { name: 'Anderlecht',      slug: 'anderlecht',      search: 'Anderlecht' },

  // MLS
  { name: 'LA Galaxy',       slug: 'la-galaxy',       search: 'LA Galaxy' },
  { name: 'Inter Miami',     slug: 'inter-miami',     search: 'Inter Miami' },
  { name: 'Chicago Fire',    slug: 'chicago-fire',    search: 'Chicago Fire' },
  { name: 'New York City',   slug: 'new-york-city',   search: 'New York City FC' },
  { name: 'Montreal',        slug: 'montreal',        search: 'CF Montreal' },
  { name: 'Vancouver Whitecaps', slug: 'vancouver-whitecaps', search: 'Vancouver Whitecaps' },

  // NASL
  { name: 'New York Cosmos', slug: 'new-york-cosmos', search: 'New York Cosmos' },

  // Saudi Pro League
  { name: 'Al-Nassr',        slug: 'al-nassr',        search: 'Al-Nassr FC' },
  { name: 'Al-Gharafa',      slug: 'al-gharafa',      search: 'Al-Gharafa' },
  { name: 'Al-Sadd',         slug: 'al-sadd',         search: 'Al-Sadd' },

  // Argentina
  { name: 'Boca Juniors',    slug: 'boca-juniors',    search: 'Boca Juniors' },
  { name: 'Rosario Central', slug: 'rosario-central', search: 'Rosario Central' },

  // Austria
  { name: 'Rapid Vienna',    slug: 'rapid-vienna',    search: 'Rapid Vienna' },

  // J-League
  { name: 'Kashima Antlers', slug: 'kashima-antlers', search: 'Kashima Antlers' },
  { name: 'Vissel Kobe',     slug: 'vissel-kobe',     search: 'Vissel Kobe' },
  { name: 'Nagoya Grampus',  slug: 'nagoya-grampus',  search: 'Nagoya Grampus' },
  { name: 'Cerezo Osaka',    slug: 'cerezo-osaka',    search: 'Cerezo Osaka' },
  { name: 'Sagan Tosu',      slug: 'sagan-tosu',      search: 'Sagan Tosu' },

  // Australia
  { name: 'Melbourne City',  slug: 'melbourne-city',  search: 'Melbourne City' },
  { name: 'Sydney FC',       slug: 'sydney-fc',       search: 'Sydney FC' },
]

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http
    proto.get(url, { headers: { 'User-Agent': 'futle-downloader/1.0' } }, res => {
      let data = ''
      res.on('data', chunk => (data += chunk))
      res.on('end', () => {
        try { resolve(JSON.parse(data)) } catch { reject(new Error('JSON parse error: ' + data.slice(0, 100))) }
      })
    }).on('error', reject)
  })
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) { resolve('exists'); return }
    const file = fs.createWriteStream(dest)
    const proto = url.startsWith('https') ? https : http
    const req = proto.get(url, { headers: { 'User-Agent': 'futle-downloader/1.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        fs.unlinkSync(dest)
        downloadFile(res.headers.location, dest).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) {
        file.close()
        fs.unlinkSync(dest)
        reject(new Error('HTTP ' + res.statusCode))
        return
      }
      res.pipe(file)
      file.on('finish', () => file.close(() => resolve('downloaded')))
    })
    req.on('error', err => { fs.unlinkSync(dest); reject(err) })
  })
}

async function findClub(searchName) {
  const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(searchName)}`
  try {
    const data = await fetchJson(url)
    if (!data.teams || data.teams.length === 0) return null
    return data.teams[0]
  } catch (e) {
    console.error('  fetch error:', e.message)
    return null
  }
}

async function processClub(club, index) {
  const destPath = path.join(OUT_DIR, `${club.slug}.png`)
  if (fs.existsSync(destPath)) {
    console.log(`[${index+1}/${CLUBS_TO_DOWNLOAD.length}] ✓ Already exists: ${club.name}`)
    return true
  }

  console.log(`[${index+1}/${CLUBS_TO_DOWNLOAD.length}] Searching: ${club.name} (${club.search})`)
  const team = await findClub(club.search)

  if (!team) {
    console.log(`  ✗ Not found: ${club.name}`)
    return false
  }

  const badgeUrl = team.strBadge ? team.strBadge + '/preview' : null
  if (!badgeUrl) {
    console.log(`  ✗ No badge: ${club.name}`)
    return false
  }

  try {
    await downloadFile(badgeUrl, destPath)
    console.log(`  ✓ Downloaded: ${club.name} → ${club.slug}.png`)
    return true
  } catch (e) {
    console.log(`  ✗ Download failed: ${club.name} - ${e.message}`)
    return false
  }
}

async function main() {
  const BATCH = 3
  const DELAY = 1500

  for (let i = 0; i < CLUBS_TO_DOWNLOAD.length; i += BATCH) {
    const batch = CLUBS_TO_DOWNLOAD.slice(i, i + BATCH)
    await Promise.all(batch.map((club, j) => processClub(club, i + j)))
    if (i + BATCH < CLUBS_TO_DOWNLOAD.length) await delay(DELAY)
  }

  console.log('\nDone!')
}

main()
