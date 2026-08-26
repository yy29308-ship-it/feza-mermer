'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Logo } from './Logo'
import { navLinks, site } from '@/data/site'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Sayfa değişince mobil menü kendiliğinden kapansın.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Menü açıkken arka plan kaymasın.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Logo />

          {/* Masaüstü menü */}
          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => {
                const active =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href)

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`relative py-2 text-sm tracking-wide transition-colors hover:text-accent-dark ${
                        active ? 'text-accent-dark' : 'text-ink'
                      }`}
                    >
                      {link.label}
                      {active && (
                        <span
                          aria-hidden
                          className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Masaüstünde doğrudan arama butonu */}
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden items-center gap-2 rounded-sm border border-ink/20 px-5 py-2.5 text-sm tracking-wide transition-colors hover:border-accent hover:text-accent-dark lg:inline-flex"
          >
            <PhoneIcon />
            {site.phoneDisplay}
          </a>

          {/* Mobil menü düğmesi */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobil-menu"
            className="-mr-2 p-2 lg:hidden"
          >
            <span className="sr-only">{open ? 'Menüyü kapat' : 'Menüyü aç'}</span>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Mobil menü paneli */}
      {open && (
        <div
          id="mobil-menu"
          className="border-t border-line bg-surface lg:hidden"
        >
          <Container>
            <nav aria-label="Mobil menü" className="py-4">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href} className="border-b border-line last:border-0">
                    <Link
                      href={link.href}
                      className="block py-4 text-base tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={`tel:${site.phoneHref}`}
                className="mt-5 mb-2 flex items-center justify-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white"
              >
                <PhoneIcon />
                {site.phoneDisplay}
              </a>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="h-6 w-6"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="h-6 w-6"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
