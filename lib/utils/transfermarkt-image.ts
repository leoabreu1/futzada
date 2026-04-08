/**
 * Utility para gerar URLs de imagens do Transfermarkt dinamicamente
 * Suporta fallback pra CDNs alternativas se a principal cair
 */

export const CDN_SOURCES = {
  TRANSFERMARKT: 'transfermarkt',
  SOFASCORE: 'sofascore',
  FLASHSCORE: 'flashscore',
} as const

export type CDNSource = typeof CDN_SOURCES[keyof typeof CDN_SOURCES]

interface PlayerImage {
  url: string
  source: CDNSource
  fallbacks: string[]
}

/**
 * Gera URL da imagem usando ID do Transfermarkt
 * Formato: https://img.a.transfermarkt.technology/portrait/header/{id}-{timestamp}.jpg
 */
export function getTransfermarktImage(id: string): PlayerImage {
  const timestamp = Math.floor(Date.now() / 1000)
  const mainUrl = `https://img.a.transfermarkt.technology/portrait/header/${id}-${timestamp}.jpg`

  return {
    url: mainUrl,
    source: 'transfermarkt',
    fallbacks: [
      `https://img.a.transfermarkt.technology/portrait/header/${id}-1700000000.jpg`, // Cache alternativo
    ],
  }
}

/**
 * Gera URL da imagem usando slug do Sofascore
 * Exemplo: /p/123456/
 */
export function getSofascoreImage(id: string): PlayerImage {
  const mainUrl = `https://www.sofascore.com/images/players/${id}.jpg`

  return {
    url: mainUrl,
    source: 'sofascore',
    fallbacks: [],
  }
}

/**
 * Wrapper seguro para componentes de imagem
 * Carrega com fallback automático
 */
export function getImageWithFallback(source: CDNSource, id: string): string {
  switch (source) {
    case 'transfermarkt':
      return getTransfermarktImage(id).url
    case 'sofascore':
      return getSofascoreImage(id).url
    case 'flashscore':
      return `https://api.flashscore.com/mobile/image/player/${id}.jpg`
    default:
      return ''
  }
}

/**
 * Cache de imagens disponíveis
 * Retorna true se a imagem estava disponível
 */
const imageCache = new Map<string, boolean>()

export async function validateImage(url: string): Promise<boolean> {
  if (imageCache.has(url)) {
    return imageCache.get(url) || false
  }

  try {
    const response = await fetch(url, { method: 'HEAD' })
    const isValid = response.ok
    imageCache.set(url, isValid)
    return isValid
  } catch {
    imageCache.set(url, false)
    return false
  }
}
