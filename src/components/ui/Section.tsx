import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  id?: string
  /** Zemin rengi. 'surface' beyaz, bölümleri birbirinden ayırmak için. */
  tone?: 'bone' | 'surface'
  /** Dikey boşluk. Bölümler arası ritmi bu belirler. */
  space?: 'default' | 'tight'
  className?: string
}

/** Bütün bölümlerin dikey boşluğunu tek yerden yönetir. */
export function Section({
  children,
  id,
  tone = 'bone',
  space = 'default',
  className = '',
}: Props) {
  const padding = space === 'tight' ? 'py-14 md:py-20' : 'py-20 md:py-28 lg:py-32'
  const background = tone === 'surface' ? 'bg-surface' : 'bg-bone'

  return (
    <section id={id} className={`${background} ${padding} ${className}`}>
      {children}
    </section>
  )
}
