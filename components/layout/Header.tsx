'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
      backgroundColor: 'rgba(10,10,11,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            {/* Logo SVG inline — sem Next Image para evitar warning de domínio */}
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="url(#logoGrad)"/>
              <path d="M11 10h14v4H15v5h9v4h-9v7h-4V10z" fill="#0a0a0b"/>
              <circle cx="30" cy="28" r="4" fill="#0a0a0b" opacity="0.85"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#10B981"/>
                  <stop offset="100%" stopColor="#F59E0B"/>
                </linearGradient>
              </defs>
            </svg>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              letterSpacing: '0.04em',
              background: 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
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
                    transition: 'color 0.15s ease, background 0.15s ease',
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
