import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { categories } from '@/data/projects'
import { fullAddress, navLinks, site, whatsappDisplay, whatsappUrl } from '@/data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
          {/* Marka */}
          <div className="lg:col-span-1">
            <p className="font-display text-2xl tracking-tight">{site.name}</p>
            <p className="mt-1 text-[0.625rem] uppercase tracking-[0.28em] text-muted">
              Mermer &amp; Granit
            </p>
            <p className="mt-5 max-w-xs text-sm text-muted">
              Ölçüden montaja kadar tek elden mermer ve granit işçiliği.
            </p>

            {(site.social.instagram || site.social.facebook) && (
              <div className="mt-6 flex gap-4">
                {site.social.instagram && (
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent-dark"
                  >
                    <span className="sr-only">Instagram</span>
                    <InstagramIcon />
                  </a>
                )}
                {site.social.facebook && (
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent-dark"
                  >
                    <span className="sr-only">Facebook</span>
                    <FacebookIcon />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Menü */}
          <nav aria-label="Alt menü">
            <h2 className="font-body text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Menü
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-accent-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hizmetler */}
          <nav aria-label="Hizmetler">
            <h2 className="font-body text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Hizmetler
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/galeri?kategori=${c.id}`}
                    className="transition-colors hover:text-accent-dark"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* İletişim */}
          <div>
            <h2 className="font-body text-xs font-medium uppercase tracking-[0.18em] text-muted">
              İletişim
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="transition-colors hover:text-accent-dark"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent-dark"
                >
                  {whatsappDisplay} <span className="text-muted">(WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-accent-dark"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-muted">{fullAddress}</li>
            </ul>

            <h2 className="mt-8 font-body text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Çalışma Saatleri
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {site.openingHours.map((o) => (
                <li key={o.days} className="flex justify-between gap-4">
                  <span>{o.days}</span>
                  <span className="text-ink">{o.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Tüm hakları saklıdır.
          </p>
          <p>{site.address.district} Sanayi Sitesi · {site.address.city}</p>
        </div>
      </Container>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H6v4h2v7h4v-7h3l1-4h-4V7.5A.5.5 0 0 1 12.5 7H15V3Z" />
    </svg>
  )
}
