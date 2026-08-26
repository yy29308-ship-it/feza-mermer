import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** 'wide' galeri gibi geniş ızgaralar için. */
  width?: 'default' | 'wide' | 'narrow'
  className?: string
}

const widths = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
}

/** Sayfa içeriğini ortalar ve kenar boşluklarını her yerde aynı tutar. */
export function Container({ children, width = 'default', className = '' }: Props) {
  return (
    <div className={`mx-auto w-full px-5 md:px-8 ${widths[width]} ${className}`}>
      {children}
    </div>
  )
}
