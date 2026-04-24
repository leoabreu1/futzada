'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

// Mapeamento entre slug do href e nome usado no localStorage
const STORAGE_KEY_MAP: Record<string, string> = {
  'jogo-da-velha': 'velha',
  'wordle': 'wordle',
  'quem-e-o-craque': 'craque',
  'conexoes': 'conexoes',
  'linha-do-tempo': 'timeline',
}

interface Props {
  hrefSlug: string
}

export default function PlayedTodayBadge({ hrefSlug }: Props) {
  const { data: session, status } = useSession()
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    if (status === 'loading') return

    const storageKey = STORAGE_KEY_MAP[hrefSlug]
    if (!storageKey) return

    const userId = session?.user?.id ?? 'guest'
    const today = new Date().toISOString().split('T')[0]
    const key = `futle-${storageKey}-${userId}-${today}`

    try {
      const saved = localStorage.getItem(key)
      if (!saved) return
      const data = JSON.parse(saved)

      // Wordle, Craque e Velha usam gameOver; Conexoes e Linha do Tempo usam gameState
      if ('gameOver' in data) {
        setPlayed(data.gameOver === true)
      } else if ('gameState' in data) {
        setPlayed(data.gameState !== 'playing')
      }
    } catch {}
  }, [status, session, hrefSlug])

  if (!played) return null

  return (
    <span className="badge badge-green" style={{ gap: 4 }}>
      ✓ JOGADO
    </span>
  )
}
