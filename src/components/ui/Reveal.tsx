'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Sıralı gecikme (ms) — ızgaradaki kartların peş peşe belirmesi için. */
  delay?: number
  className?: string
}

/**
 * İçeriği ekrana girdiğinde yumuşakça belirtir.
 * prefers-reduced-motion açıksa hiç animasyon uygulanmaz (globals.css halleder).
 */
export function Reveal({ children, delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // IntersectionObserver desteklenmiyorsa içerik doğrudan görünür kalsın.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    // Öğe zaten ekrandaysa gözlemciyi bekleme. Galeri filtresi değişince
    // kartlar sayfanın üstüne taşınıyor; gözlemci bu yeniden konumlanmayı
    // her zaman yakalamadığı için kart görünmez kalabiliyordu.
    // (Bu efekt boyamadan sonra çalıştığı için geçiş animasyonu korunur.)
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
