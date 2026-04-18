'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Se não está logado, manda para login
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
    // Se já tem nick, manda para home
    if (status === 'authenticated' && session?.user?.nickname) {
      router.replace('/')
    }
  }, [status, session, router])

  if (status === 'loading' || (status === 'authenticated' && session?.user?.nickname)) {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '80px 24px', textAlign: 'center', color: 'var(--color-muted)' }}>
        Carregando...
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmed = nickname.trim()

    if (trimmed.length < 2 || trimmed.length > 20) {
      setError('O nick deve ter entre 2 e 20 caracteres.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: trimmed }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Erro ao salvar nick.')
      } else {
        // Atualiza a sessão para refletir o novo nickname
        await update({ nickname: trimmed })
        router.replace('/')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        {/* Logo / título */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>⚽</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}>
            Escolha seu nick
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            É o nome que vai aparecer publicamente no ranking global.<br />
            Escolha bem — você pode mudar depois no perfil.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            padding: '24px',
            borderRadius: 'var(--radius)',
            background: 'var(--color-surface)',
            border: '1px solid rgba(16,185,129,0.2)',
          }}>
            <label
              htmlFor="nick-input"
              style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}
            >
              🎮 Seu nick no ranking
            </label>

            <input
              id="nick-input"
              type="text"
              value={nickname}
              onChange={e => { setNickname(e.target.value); setError('') }}
              placeholder="Ex: CraqueNeto10, ZicoFan..."
              maxLength={20}
              autoFocus
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'var(--color-border)'}`,
                background: 'var(--color-surface-2)',
                color: 'var(--color-text)',
                fontSize: '1.05rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, marginBottom: 16 }}>
              {error ? (
                <span style={{ fontSize: '0.78rem', color: '#ef4444' }}>⚠️ {error}</span>
              ) : (
                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                  Entre 2 e 20 caracteres · único
                </span>
              )}
              <span style={{ fontSize: '0.78rem', color: 'var(--color-muted-2)' }}>
                {nickname.length}/20
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || nickname.trim().length < 2}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: 'linear-gradient(90deg,#10B981,#F59E0B)',
                color: '#0a0a0b',
                fontFamily: 'var(--font-display)',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: loading ? 'wait' : 'pointer',
                opacity: nickname.trim().length < 2 ? 0.5 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {loading ? 'Salvando...' : 'Entrar no ranking →'}
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.78rem', color: 'var(--color-muted-2)' }}>
          Logado como {session?.user?.email}
        </p>
      </div>
    </div>
  )
}
