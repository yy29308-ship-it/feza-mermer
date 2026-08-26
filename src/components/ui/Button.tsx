import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  outline:
    'border border-ink/25 text-ink hover:border-accent hover:text-accent-dark bg-transparent',
  ghost: 'border border-white/40 text-white hover:bg-white hover:text-ink',
}

type LinkButtonProps = {
  href: string
  variant?: Variant
  children: ReactNode
  className?: string
} & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>

/** Sayfa içi ve dış bağlantılar için buton görünümlü link. */
export function LinkButton({
  href,
  variant = 'primary',
  children,
  className = '',
  ...rest
}: LinkButtonProps) {
  const isExternal = href.startsWith('http') || href.startsWith('tel:')
  const classes = `${base} ${variants[variant]} ${className}`

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}

type ButtonProps = {
  variant?: Variant
  children: ReactNode
} & ComponentProps<'button'>

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
