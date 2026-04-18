'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const EXEMPT = ['/login', '/api']

export default function NicknameGate() {
  const { data: session, status, update } = useSession()
  const pathname = usePathname()
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)

  // Pequeno delay para animação de entrada
  useEffect(() => {
    if (
      status === 'authenticated' &&
      !session?.user?.nickname &&
      !EXEMPT.some(p => pathname.startsWith(p))
    ) {
      const t = setTimeout(() => setVisible(true), 150)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [status, session?.user?.nickname, pathname])

  const shouldRender =
    status === 'authenticated' &&
    !session?.user?.nickname &&
    !EXEMPT.some(p => pathname.startsWith(p))

  if (!shouldRender) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmed = nickname.trim()
    if (trimmed.length < 2) { setError('Mínimo 2 caracteres'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Erro ao salvar')
      } else {
        await update({ nickname: trimmed })
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 9998,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }} />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 420,
          background: 'var(--color-surface)',
          border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: 'var(--radius)',
          padding: '32px 28px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}>
          {/* Avatar + boas-vindas */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="avatar"
                width={64}
                height={64}
                style={{ borderRadius: '50%', border: '3px solid rgba(16,185,129,0.4)', marginBottom: 14 }}
              />
            ) : (
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg,#10B981,#F59E0B)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', fontWeight: 'bold', color: '#0a0a0b',
                margin: '0 auto 14px',
              }}>
                {session?.user?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: 6 }}>
              Bem-vindo, <strong style={{ color: 'var(--color-text)' }}>{session?.user?.name?.split(' ')[0]}</strong>! 👋
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              letterSpacing: '-0.02em',
              marginBottom: 6,
            }}>
              Escolha seu nick
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
              É o nome que aparece no ranking global.<br/>
              Você poderá mudar uma vez por semana.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <div style={{ position: 'relative', marginBottom: 8 }}>
              <input
                type="text"
                value={nickname}
                onChange={e => { setNickname(e.target.value); setError('') }}
                placeholder="Ex: CraqueNeto10, ZicoFan..."
                maxLength={20}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1.5px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(16,185,129,0.3)'}`,
                  background: 'var(--color-surface-2)',
                  color: 'var(--color-text)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
              />
              <span style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                fontSize: '0.72rem', color: 'var(--color-muted-2)',
              }}>
                {nickname.length}/20
              </span>
            </div>

            {error && (
              <p style={{ fontSize: '0.78rem', color: '#ef4444', marginBottom: 10 }}>
                ⚠️ {error}
              </p>
            )}

            <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-2)', marginBottom: 16 }}>
              Entre 2 e 20 caracteres · único no ranking
            </p>

            <button
              type="submit"
              disabled={loading || nickname.trim().length < 2}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: 'linear-gradient(90deg,#10B981,#F59E0B)',
                color: '#0a0a0b',
                fontFamily: 'var(--font-display)',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: loading ? 'wait' : 'pointer',
                opacity: nickname.trim().length < 2 ? 0.45 : 1,
                transition: 'opacity 0.2s',
                letterSpacing: '0.01em',
              }}
            >
              {loading ? 'Salvando...' : '⚽ Entrar no ranking'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
