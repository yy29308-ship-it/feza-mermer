import type { ReactNode } from 'react'

type Props = {
  /** Başlığın üstündeki küçük etiket, ör. "Yaptığımız işler". */
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  /** Sayfada tek bir h1 olmalı; bölüm başlıkları h2 kalır. */
  as?: 'h1' | 'h2'
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
}: Props) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'items-start'

  return (
    <div className={`flex max-w-[65ch] flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent-dark">
          {eyebrow}
        </span>
      )}
      <Heading>{title}</Heading>
      {description && <p className="mt-5 text-muted">{description}</p>}
    </div>
  )
}
