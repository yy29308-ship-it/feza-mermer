import type { ReactNode } from 'react'

type Variant = 'accent' | 'neutral' | 'glass'

const variants: Record<Variant, string> = {
  /* Hero etiketi — taba zemin üzerinde koyu yazı. */
  accent: 'bg-accent/10 text-accent-dark ring-1 ring-accent/20',
  /* Kart içi taş isimleri gibi sakin etiketler. */
  neutral: 'bg-bone text-muted ring-1 ring-line',
  /* Fotoğrafın üstünde duran buzlu cam etiket. */
  glass: 'bg-white/85 text-ink ring-1 ring-white/60 backdrop-blur-md',
}

type Props = {
  children: ReactNode
  variant?: Variant
  className?: string
}

/** Küçük yuvarlak etiket — hero'da konum/yıl, kartlarda taş isimleri için. */
export function Badge({ children, variant = 'neutral', className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-[0.02em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

/** Etiketin başındaki minik nokta — "canlı / aktif" hissi verir. */
export function BadgeDot({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`h-1.5 w-1.5 shrink-0 rounded-full bg-accent ${className}`}
    />
  )
}
