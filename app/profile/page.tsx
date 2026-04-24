'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

type PlayerRow = {
  userId: string
  totalPoints: number
  gamesPlayed: number
  gameBreakdown: Record<string, number>
}

const GAME_BREAKDOWN = [
  { key: 'wordle', label: 'Wordle do Futebol', color: '#6CFF93' },
  { key: 'jogo-da-velha', label: 'Jogo da Velha', color: '#FFC247' },
  { key: 'quem-e-o-craque', label: 'Quem é o Craque', color: '#8BD4FF' },
  { key: 'linha-do-tempo', label: 'Linha do Tempo', color: '#FF9F81' },
  { key: 'conexoes', label: 'Conexões', color: '#E6A8FF' },
]

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const [myStats, setMyStats] = useState<PlayerRow | null>(null)
  const [myPosition, setMyPosition] = useState<number | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [avatarSaved, setAvatarSaved] = useState(false)
  const [avatarError, setAvatarError] = useState('')
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [nickname, setNickname] = useState('')
  const [nickSaved, setNickSaved] = useState(false)
  const [nickError, setNickError] = useState('')
  const [nickLoading, setNickLoading] = useState(false)
  const [daysUntilChange, setDaysUntilChange] = useState<number | null>(null)

  useEffect(() => {
    if (!session?.user?.id) return

    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => {
        setAvatarUrl(data.user?.image ?? null)
        if (data.user?.nickname) setNickname(data.user.nickname)
        if (data.user?.nicknameUpdatedAt && data.user?.nickname) {
          const msPerDay = 1000 * 60 * 60 * 24
          const daysSince = (Date.now() - new Date(data.user.nicknameUpdatedAt).getTime()) / msPerDay
          if (daysSince < 7) setDaysUntilChange(Math.ceil(7 - daysSince))
        }
      })
      .catch(console.error)

    fetch('/api/ranking')
      .then((response) => response.json())
      .then((data) => {
        const ranking = data.ranking ?? []
        const index = ranking.findIndex((player: PlayerRow) => player.userId === session.user.id)
        if (index !== -1) {
          setMyStats(ranking[index])
          setMyPosition(index + 1)
        }
      })
      .catch(console.error)
  }, [session?.user?.id])

  useEffect(() => {
    setAvatarUrl(session?.user?.image ?? null)
  }, [session?.user?.image])

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    setAvatarError('')
    setAvatarSaved(false)

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setAvatarError('Use uma imagem JPG, PNG ou WebP')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setAvatarError('A imagem deve ter no máximo 2 MB')
      return
    }

    setAvatarLoading(true)

    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (!response.ok) {
        setAvatarError(data.error ?? 'Erro ao enviar avatar')
        return
      }

      setAvatarUrl(data.user?.image ?? null)
      setAvatarSaved(true)
      await update()
      setTimeout(() => setAvatarSaved(false), 2500)
    } catch {
      setAvatarError('Erro de conexão')
    } finally {
      setAvatarLoading(false)
    }
  }

  const handleSaveNick = async () => {
    setNickError('')
    setNickSaved(false)
    setNickLoading(true)

    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname }),
      })
      const data = await response.json()

      if (!response.ok) {
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
      <div className="page-shell page-shell--narrow">
        <div className="surface-panel" style={{ padding: 36, textAlign: 'center' }}>
          <div className="surface-panel__inner muted">Carregando perfil...</div>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="page-shell page-shell--narrow">
        <div className="surface-panel auth-card">
          <div className="surface-panel__inner stack" style={{ textAlign: 'center' }}>
            <p className="section-label">Perfil bloqueado</p>
            <h1 className="page-title">Entre para abrir sua ficha</h1>
            <p className="muted">
              O perfil guarda seu nick, sua posição no ranking e o resumo das partidas jogadas.
            </p>
            <button onClick={() => signIn('google')} className="btn-primary">
              Entrar com Google
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell page-shell--profile">
      <Link href="/" className="page-back">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar para jogos
      </Link>

      <section className="panel-grid" style={{ marginBottom: 22 }}>
        <div className="surface-panel surface-panel--accent animate-fade-up delay-1" style={{ padding: 28, opacity: 0, animationFillMode: 'forwards' }}>
          <div className="surface-panel__inner stack">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={session.user.name ?? 'Avatar'}
                  width={84}
                  height={84}
                  style={{
                    borderRadius: 28,
                    border: '3px solid rgba(108, 255, 147, 0.24)',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <span className="avatar" style={{ width: 84, height: 84, fontSize: '2rem', borderRadius: 28 }}>
                  {session.user.name?.[0]?.toUpperCase()}
                </span>
              )}

              <div>
                <p className="section-label">Sua temporada</p>
                <h1 className="page-title" style={{ marginBottom: 10 }}>
                  {session.user.nickname ?? session.user.name}
                </h1>
                <p className="muted">{session.user.email}</p>
              </div>
            </div>

            <div className="stack" style={{ gap: 10 }}>
              <label
                className="btn-ghost"
                style={{
                  width: 'fit-content',
                  minHeight: 44,
                  cursor: avatarLoading ? 'wait' : 'pointer',
                  opacity: avatarLoading ? 0.62 : 1,
                }}
              >
                {avatarLoading ? 'Enviando avatar...' : 'Trocar avatar'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAvatarChange}
                  disabled={avatarLoading}
                  style={{ display: 'none' }}
                />
              </label>

              <p className="muted-2" style={{ fontSize: '0.82rem' }}>
                JPG, PNG ou WebP até 2 MB.
              </p>

              {avatarSaved && (
                <p style={{ color: 'var(--color-brand-green)', fontSize: '0.84rem', fontWeight: 700 }}>
                  Avatar atualizado
                </p>
              )}

              {avatarError && (
                <p style={{ color: '#FF9F81', fontSize: '0.84rem', fontWeight: 700 }}>{avatarError}</p>
              )}
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card__value" style={{ color: 'var(--color-brand-green)' }}>
                  {myStats?.totalPoints ?? 0}
                </div>
                <div className="stat-card__label">Pontos</div>
              </div>
              <div className="stat-card">
                <div className="stat-card__value" style={{ color: 'var(--color-brand-yellow)' }}>
                  {myStats?.gamesPlayed ?? 0}
                </div>
                <div className="stat-card__label">Jogos</div>
              </div>
              <div className="stat-card">
                <div className="stat-card__value" style={{ color: '#8BD4FF' }}>
                  {myPosition ? `#${myPosition}` : '-'}
                </div>
                <div className="stat-card__label">Ranking</div>
              </div>
            </div>
          </div>
        </div>

        <div className="surface-panel animate-fade-up delay-2" style={{ padding: 28, opacity: 0, animationFillMode: 'forwards' }}>
          <div className="surface-panel__inner stack">
            <div>
              <p className="section-label section-label-muted">Nick competitivo</p>
              <h2 className="section-title" style={{ marginBottom: 12 }}>
                Ajuste como você aparece na tabela
              </h2>
              <p className="muted">
                Seu nick é público no ranking. A alteração continua limitada a uma vez por semana.
              </p>
            </div>

            {daysUntilChange !== null && <span className="badge badge-yellow">Troca liberada em {daysUntilChange} dia{daysUntilChange > 1 ? 's' : ''}</span>}

            <div className="stack" style={{ gap: 10 }}>
              <input
                type="text"
                value={nickname}
                onChange={(event) => {
                  setNickname(event.target.value)
                  setNickError('')
                }}
                placeholder="Seu nick no ranking"
                maxLength={20}
                disabled={daysUntilChange !== null}
                className="input-field"
                style={{
                  opacity: daysUntilChange !== null ? 0.6 : 1,
                  cursor: daysUntilChange !== null ? 'not-allowed' : 'text',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <p className="muted-2" style={{ fontSize: '0.82rem' }}>
                  Entre 2 e 20 caracteres. {nickname.length}/20.
                </p>
                <button
                  onClick={handleSaveNick}
                  disabled={nickLoading || !nickname.trim() || daysUntilChange !== null}
                  className="btn-primary"
                  style={{
                    minHeight: 46,
                    opacity: nickLoading || !nickname.trim() || daysUntilChange !== null ? 0.55 : 1,
                  }}
                >
                  {nickSaved ? 'Salvo' : nickLoading ? 'Salvando...' : 'Salvar nick'}
                </button>
              </div>

              {nickError && (
                <p style={{ color: '#FF9F81', fontSize: '0.84rem', fontWeight: 700 }}>{nickError}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {myStats && (
        <section className="surface-panel animate-fade-up delay-3" style={{ padding: 28, marginBottom: 22, opacity: 0, animationFillMode: 'forwards' }}>
          <div className="surface-panel__inner stack">
            <div>
              <p className="section-label">Volume por modalidade</p>
              <h2 className="section-title" style={{ marginBottom: 10 }}>
                Seu mapa de jogo
              </h2>
              <p className="muted">Veja onde sua pontuação está mais forte e o quanto você distribuiu suas partidas.</p>
            </div>

            <div className="stack" style={{ gap: 12 }}>
              {GAME_BREAKDOWN.map((game) => {
                const count = myStats.gameBreakdown[game.key] ?? 0
                return (
                  <div
                    key={game.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 14,
                      padding: '14px 16px',
                      borderRadius: 18,
                      border: '1px solid rgba(154, 176, 190, 0.12)',
                      background: 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <div>
                      <p className="eyebrow" style={{ marginBottom: 6 }}>
                        {game.label}
                      </p>
                      <p className="muted">Partidas registradas nessa modalidade.</p>
                    </div>
                    <strong style={{ color: count > 0 ? game.color : 'var(--color-muted-2)', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
                      {count}
                    </strong>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <button onClick={() => signOut({ callbackUrl: '/' })} className="btn-ghost" style={{ width: '100%', color: '#FF9F81' }}>
        Sair da conta
      </button>
    </div>
  )
}
