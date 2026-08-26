import Link from 'next/link'
import { site } from '@/data/site'

/**
 * Yazı tabanlı logo. Hazır bir logo dosyanız olduğunda burayı
 * <Image src="/images/logo.svg" ... /> ile değiştirmeniz yeterli.
 */
export function Logo({ tone = 'ink' }: { tone?: 'ink' | 'white' }) {
  const color = tone === 'white' ? 'text-white' : 'text-ink'

  return (
    <Link
      href="/"
      aria-label={`${site.name} — anasayfa`}
      className={`group flex flex-col leading-none ${color}`}
    >
      <span className="font-display text-2xl tracking-tight transition-colors group-hover:text-accent-dark">
        {site.name}
      </span>
      <span
        className={`mt-1 text-[0.625rem] uppercase tracking-[0.28em] ${
          tone === 'white' ? 'text-white/70' : 'text-muted'
        }`}
      >
        Mermer &amp; Granit
      </span>
    </Link>
  )
}
