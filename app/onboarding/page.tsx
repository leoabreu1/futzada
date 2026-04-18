'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Onboarding agora é feito pelo modal NicknameGate direto na tela
export default function OnboardingPage() {
  const router = useRouter()
  useEffect(() => { router.replace('/') }, [router])
  return null
}
