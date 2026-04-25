'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const tickingRef = useRef(false)
  const isGameRoute = pathname.startsWith('/games/')

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setIsVisible(true)
    lastScrollYRef.current = window.scrollY

    const mobileQuery = window.matchMedia('(max-width: 768px)')

    const handleScroll = () => {
      if (tickingRef.current) return
      if (!isGameRoute && !mobileQuery.matches) return

      tickingRef.current = true
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const lastScrollY = lastScrollYRef.current

        if (currentScrollY <= 24) {
          setIsVisible(true)
        } else if (currentScrollY > lastScrollY + 6) {
          setIsVisible(false)
        } else if (currentScrollY < lastScrollY - 6) {
          setIsVisible(true)
        }

        lastScrollYRef.current = currentScrollY
        tickingRef.current = false
      })
    }

    const handleViewportChange = () => {
      if (!isGameRoute && !mobileQuery.matches) setIsVisible(true)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    mobileQuery.addEventListener('change', handleViewportChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      mobileQuery.removeEventListener('change', handleViewportChange)
      tickingRef.current = false
    }
  }, [isGameRoute, pathname])
  /* eslint-enable react-hooks/set-state-in-effect */

  const headerClassName = `site-header${isGameRoute ? ' site-header--game' : ''}${isVisible ? '' : ' site-header--hidden'}`

  return (
    <header className={headerClassName}>
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
