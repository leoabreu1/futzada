'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/ui/Logo'

const NAV = [
  { label: 'Jogos', href: '/' },
  { label: 'Ranking', href: '/ranking' },
]

export default function Header() {
  const pathname = usePathname()

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
            <Logo size={34} id="headerLogo" />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              letterSpacing: '0.04em',
              background: 'linear-gradient(90deg, #10B981 0%, #34d399 50%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.3))',
            }}>
              FUTZADA
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

          {/* CTA */}
          <a href="#jogos" className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
            Jogar Agora
          </a>
        </div>
      </div>
    </header>
  )
}
