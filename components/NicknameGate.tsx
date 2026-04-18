'use client'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Rotas que nunca devem ser bloqueadas pelo gate
const EXEMPT = ['/onboarding', '/login', '/api']

export default function NicknameGate() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (status !== 'authenticated') return
    if (EXEMPT.some(p => pathname.startsWith(p))) return
    if (!session?.user?.nickname) {
      router.replace('/onboarding')
    }
  }, [status, session, pathname, router])

  return null
}
