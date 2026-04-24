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

  useEffect(() => {
    if (
      status === 'authenticated' &&
      !session?.user?.nickname &&
      !EXEMPT.some((route) => pathname.startsWith(route))
    ) {
      const timer = setTimeout(() => setVisible(true), 150)
      return () => clearTimeout(timer)
    }

    setVisible(false)
  }, [status, session?.user?.nickname, pathname])

  const shouldRender =
    status === 'authenticated' &&
    !session?.user?.nickname &&
    !EXEMPT.some((route) => pathname.startsWith(route))

  if (!shouldRender) return null

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    const trimmed = nickname.trim()

    if (trimmed.length < 2) {
      setError('Use pelo menos 2 caracteres.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: trimmed }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error ?? 'Não foi possível salvar o nick.')
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
      <div className="modal-backdrop" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.24s ease' }} />

      <div
        className="modal-wrap"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
        }}
      >
        <div className="surface-panel surface-panel--accent modal-card">
          <div className="surface-panel__inner stack">
            <div style={{ textAlign: 'center' }}>
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Avatar"
                  width={72}
                  height={72}
                  style={{
                    borderRadius: 24,
                    border: '3px solid rgba(108, 255, 147, 0.24)',
                    marginBottom: 18,
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <span className="avatar" style={{ width: 72, height: 72, fontSize: '1.8rem', borderRadius: 24, margin: '0 auto 18px' }}>
                  {session?.user?.name?.[0]?.toUpperCase()}
                </span>
              )}

              <p className="section-label" style={{ justifyContent: 'center' }}>
                Primeiro passo
              </p>
              <h2 className="section-title" style={{ marginBottom: 12 }}>
                Escolha seu nick de torcida
              </h2>
              <p className="muted" style={{ maxWidth: 360, margin: '0 auto' }}>
                Esse nome aparece no ranking global e acompanha suas rodadas no FUTLE.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="stack" style={{ gap: 12 }}>
              <label className="sr-only" htmlFor="nickname">
                Seu nick
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(event) => {
                  setNickname(event.target.value)
                  setError('')
                }}
                placeholder="Ex: CanetaNoZagueiro"
                maxLength={20}
                autoFocus
                className="input-field"
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <p className="muted-2" style={{ fontSize: '0.82rem' }}>
                  De 2 a 20 caracteres. {nickname.length}/20.
                </p>
                <span className="badge badge-green">Ranking público</span>
              </div>

              {error && <p style={{ color: '#FF9F81', fontSize: '0.84rem', fontWeight: 700 }}>{error}</p>}

              <button
                type="submit"
                className="btn-primary"
                disabled={loading || nickname.trim().length < 2}
                style={{ width: '100%', opacity: loading || nickname.trim().length < 2 ? 0.6 : 1 }}
              >
                {loading ? 'Salvando...' : 'Entrar no ranking'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
