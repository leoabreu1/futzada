'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type PlayerRow = {
  userId: string
  totalPoints: number
  gamesPlayed: number
  gameBreakdown: Record<string, number>
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [myStats, setMyStats] = useState<PlayerRow | null>(null)
  const [myPosition, setMyPosition] = useState<number | null>(null)
  const [nickname, setNickname] = useState('')
  const [nickSaved, setNickSaved] = useState(false)
  const [nickError, setNickError] = useState('')
  const [nickLoading, setNickLoading] = useState(false)

  // Carrega dados do usuário (nickname atual) e stats do ranking
  useEffect(() => {
    if (!session?.user?.id) return

    // Busca nickname atual
    fetch('/api/user')
      .then(r => r.json())
      .then(data => {
        if (data.user?.nickname) setNickname(data.user.nickname)
      })
      .catch(console.error)

    // Busca posição no ranking
    fetch('/api/ranking')
      .then(r => r.json())
      .then(data => {
        const ranking = data.ranking ?? []
        const idx = ranking.findIndex((p: PlayerRow) => p.userId === session.user.id)
        if (idx !== -1) {
          setMyStats(ranking[idx])
          setMyPosition(idx + 1)
        }
      })
      .catch(console.error)
  }, [session?.user?.id])

  const handleSaveNick = async () => {
    setNickError('')
    setNickSaved(false)
    setNickLoading(true)

    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname }),
      })
      const data = await res.json()

      if (!res.ok) {
        setNickError(data.error ?? 'Erro ao salvar')
      } else {
        setNickSaved(true)
        setTimeout(() => setNickSaved(false), 2500)
      }
    } catch {
      setNickError('Erro de conexão')
    } finally {
      setNickLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div style={{ maxWidth: 500, margin: '0 auto', padding: '80px 24px', textAlign: 'center', color: 'var(--color-muted)' }}>
        Carregando...
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-muted)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: 32 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar
      </Link>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: 32 }}>
        👤 Perfil
      </h1>

      {session?.user ? (
        <>
          {/* Card do usuário */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '20px',
            borderRadius: 'var(--radius)',
            background: 'var(--color-surface)',
            border: '1px solid rgba(16,185,129,0.2)',
            marginBottom: 28,
          }}>
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? 'Avatar'}
                width={52}
                height={52}
                style={{ borderRadius: '50%', border: '3px solid rgba(16,185,129,0.4)' }}
              />
            ) : (
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#10B981,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 'bold', color: '#0a0a0b' }}>
                {session.user.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 2 }}>
                {session.user.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                {session.user.email}
              </div>
            </div>
          </div>

          {/* Nick */}
          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            marginBottom: 20,
          }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>
              🎮 Nick no ranking
            </label>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginBottom: 12 }}>
              É o nome que aparece publicamente no ranking. Entre 2 e 20 caracteres.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={nickname}
                onChange={e => { setNickname(e.target.value); setNickError('') }}
                placeholder="Seu nick..."
                maxLength={20}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${nickError ? 'rgba(239,68,68,0.5)' : 'var(--color-border)'}`,
                  background: 'var(--color-surface-2)',
                  color: 'var(--color-text)',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSaveNick}
                disabled={nickLoading || !nickname.trim()}
                style={{
                  padding: '9px 18px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: nickSaved
                    ? 'rgba(16,185,129,0.2)'
                    : 'linear-gradient(90deg,#10B981,#F59E0B)',
                  color: nickSaved ? '#10b981' : '#0a0a0b',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  cursor: nickLoading ? 'wait' : 'pointer',
                  opacity: !nickname.trim() ? 0.5 : 1,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {nickSaved ? '✅ Salvo!' : nickLoading ? '...' : 'Salvar nick'}
              </button>
            </div>
            {nickError && (
              <p style={{ marginTop: 8, fontSize: '0.78rem', color: '#ef4444' }}>
                ⚠️ {nickError}
              </p>
            )}
            <p style={{ marginTop: 8, fontSize: '0.72rem', color: 'var(--color-muted-2)' }}>
              {nickname.length}/20 caracteres
            </p>
          </div>

          {/* Stats */}
          {myStats && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
              marginBottom: 20,
            }}>
              {[
                { label: 'pontos', value: myStats.totalPoints, color: '#10b981' },
                { label: 'jogos', value: myStats.gamesPlayed, color: '#f59e0b' },
                { label: 'ranking', value: myPosition ? `#${myPosition}` : '-', color: '#3b82f6' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ padding: '14px', borderRadius: 'var(--radius)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color }}>{value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Breakdown por jogo */}
          {myStats && (
            <div style={{ padding: '20px', borderRadius: 'var(--radius)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', marginBottom: 24 }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: 12 }}>Jogos por modalidade</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { key: 'wordle', label: '🎯 Wordle', color: '#10b981' },
                  { key: 'jogo-da-velha', label: '⚡ Jogo da Velha', color: '#f59e0b' },
                  { key: 'quem-e-o-craque', label: '👁️ Quem é o Craque', color: '#3b82f6' },
                  { key: 'linha-do-tempo', label: '📅 Linha do Tempo', color: '#a855f7' },
                  { key: 'conexoes', label: '🔗 Conexões', color: '#ec4899' },
                ].map(({ key, label, color }) => {
                  const count = myStats.gameBreakdown[key] ?? 0
                  return (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem' }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: count > 0 ? color : 'var(--color-muted-2)' }}>
                        {count} {count === 1 ? 'jogo' : 'jogos'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{
              width: '100%',
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(239,68,68,0.3)',
              background: 'transparent',
              color: '#ef4444',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Sair da conta
          </button>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p style={{ color: 'var(--color-muted)', marginBottom: 24, fontSize: '0.95rem' }}>
            Entre com sua conta Google para salvar seus scores e aparecer no ranking global.
          </p>
          <button
            onClick={() => signIn('google')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 24px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              fontSize: '0.95rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Entrar com Google
          </button>
        </div>
      )}
    </div>
  )
}
