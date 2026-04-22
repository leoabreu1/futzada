'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Logo from '@/components/ui/Logo'

const NAV = [
  { label: 'Jogos', href: '/' },
  { label: 'Ranking', href: '/ranking' },
]

export default function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(6,6,9,0.7)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo size={34} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              letterSpacing: '0.06em',
              color: '#FACC15',
              filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.35))',
            }}>
              FUTLE
            </span>
          </Link>

          {/* Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {NAV.map(({ label, href }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-sans)',
                    color: active ? '#f0f0f0' : '#6b7280',
                    background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease, background 0.2s ease',
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Auth area */}
          {status === 'loading' ? (
            <div style={{ width: 80, height: 32 }} />
          ) : session?.user ? (
            /* Logado */
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? 'Avatar'}
                    width={30}
                    height={30}
                    style={{ borderRadius: '50%', border: '2px solid rgba(250,204,21,0.4)' }}
                  />
                ) : (
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 'bold', color: '#0a0a0b',
                  }}>
                    {session.user.name?.[0]?.toUpperCase() ?? '?'}
                  </div>
                )}
                <span style={{ fontSize: '0.8rem', color: '#9ca3af', maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {session.user.name?.split(' ')[0]}
                </span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{
                  padding: '0.35rem 0.7rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent',
                  color: '#6b7280',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'color 0.2s, border-color 0.2s',
                  fontFamily: 'var(--font-sans)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#ef4444'
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#6b7280'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                Sair
              </button>
            </div>
          ) : (
            /* Não logado */
            <Link href="/login" className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
