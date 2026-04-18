export function useGameDailyStorage<T>(gameName: string) {
  const today = new Date().toISOString().split('T')[0]
  const key = `futzada-${gameName}-${today}`

  function load(): T | null {
    if (typeof window === 'undefined') return null
    try {
      const saved = localStorage.getItem(key)
      return saved ? (JSON.parse(saved) as T) : null
    } catch {
      return null
    }
  }

  function save(data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch {}
  }

  return { load, save, today }
}
