'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
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
    <header className="site-header">
      <div className="site-header__bar">
        <Link href="/" className="site-header__brand" aria-label="FUTLE">
          <Logo size={38} />
        </Link>

        <nav className="site-nav" aria-label="Principal">
          {NAV.map(({ label, href }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`site-nav__link${active ? ' is-active' : ''}`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {status === 'loading' ? (
          <div className="site-header__loading" aria-hidden="true" />
        ) : session?.user ? (
          <div className="site-header__actions">
            <Link href="/profile" className="site-profile-chip">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? 'Avatar'}
                  width={34}
                  height={34}
                  className="site-profile-chip__image"
                />
              ) : (
                <span className="avatar avatar--round" style={{ width: 34, height: 34, fontSize: '1rem' }}>
                  {session.user.name?.[0]?.toUpperCase() ?? '?'}
                </span>
              )}
              <span className="site-profile-chip__name">
                {session.user.nickname ?? session.user.name?.split(' ')[0] ?? 'Perfil'}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="btn-ghost site-header__logout"
            >
              Sair
            </button>
          </div>
        ) : (
          <Link href="/login" className="btn-primary site-header__cta">
            Entrar
          </Link>
        )}
      </div>
    </header>
  )
}
