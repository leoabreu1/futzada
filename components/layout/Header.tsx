'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Logo from '@/components/ui/Logo'

const NAV = [
  { label: 'Jogos', href: '/' },
  { label: 'Ranking', href: '/ranking' },
  { label: 'Perfil', href: '/profile' },
]

export default function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(154, 176, 190, 0.12)',
        background: 'rgba(5, 13, 20, 0.78)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div
        style={{
          width: 'min(var(--container-width), calc(100vw - 24px))',
          margin: '0 auto',
          padding: '14px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 18,
          flexWrap: 'wrap',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <Logo size={38} />
        </Link>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          {NAV.map(({ label, href }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                style={{
                  minHeight: 40,
                  padding: '0 14px',
                  borderRadius: 999,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: active ? '1px solid rgba(108, 255, 147, 0.28)' : '1px solid transparent',
                  background: active ? 'rgba(108, 255, 147, 0.08)' : 'transparent',
                  color: active ? 'var(--color-text)' : 'var(--color-muted)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.18s ease, color 0.18s ease, border-color 0.18s ease',
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {status === 'loading' ? (
          <div style={{ width: 150, height: 44, borderRadius: 999, background: 'rgba(255,255,255,0.03)' }} />
        ) : session?.user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            <Link
              href="/profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 8px 6px 6px',
                borderRadius: 999,
                border: '1px solid rgba(154, 176, 190, 0.14)',
                background: 'rgba(10, 22, 32, 0.72)',
                textDecoration: 'none',
              }}
            >
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? 'Avatar'}
                  width={34}
                  height={34}
                  style={{
                    borderRadius: 999,
                    border: '2px solid rgba(108, 255, 147, 0.28)',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <span className="avatar avatar--round" style={{ width: 34, height: 34, fontSize: '1rem' }}>
                  {session.user.name?.[0]?.toUpperCase() ?? '?'}
                </span>
              )}
              <span
                style={{
                  maxWidth: 104,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text)',
                }}
              >
                {session.user.nickname ?? session.user.name?.split(' ')[0] ?? 'Perfil'}
              </span>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="btn-ghost"
              style={{ minHeight: 44, padding: '0 16px', color: '#ff9f81' }}
            >
              Sair
            </button>
          </div>
        ) : (
          <Link href="/login" className="btn-primary" style={{ minHeight: 44, padding: '0 18px', marginLeft: 'auto' }}>
            Entrar
          </Link>
        )}
      </div>
    </header>
  )
}
