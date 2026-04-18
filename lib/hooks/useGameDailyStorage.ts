'use client'

import { useSession } from 'next-auth/react'

export function useGameDailyStorage<T>(gameName: string) {
  const { data: session, status } = useSession()
  const today = new Date().toISOString().split('T')[0]

  // Enquanto a sessão está carregando, userId é indefinido — evita misturar estados
  const userId = status === 'loading' ? null : (session?.user?.id ?? 'guest')
  const key = userId ? `futzada-${gameName}-${userId}-${today}` : null

  function load(): T | null {
    if (typeof window === 'undefined' || !key) return null
    try {
      const saved = localStorage.getItem(key)
      return saved ? (JSON.parse(saved) as T) : null
    } catch {
      return null
    }
  }

  function save(data: T): void {
    if (!key) return
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch {}
  }

  // isReady: indica que o userId já foi resolvido e o load() é confiável
  const isReady = status !== 'loading'

  return { load, save, today, isReady }
}
