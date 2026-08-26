'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import type { Project } from '@/data/projects'

type Props = {
  projects: Project[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function Lightbox({ projects, index, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)

  const project = projects[index]
  const count = projects.length

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + count) % count)
  }, [index, count, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((index + 1) % count)
  }, [index, count, onNavigate])

  // Açılırken: odağı içeri al, arka planı kilitle.
  // Kapanırken: odağı tetikleyen öğeye geri ver, kilidi kaldır.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [])

  // Klavye: Esc kapatır, oklar gezinir, Tab pencerenin içinde döner.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
        return
      }
      if (event.key !== 'Tab') return

      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [goPrev, goNext, onClose])

  if (!project) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — büyük görünüm`}
      className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-sm"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(delta) > 50) {
          if (delta > 0) goPrev()
          else goNext()
        }
        touchStartX.current = null
      }}
    >
      {/* Üst çubuk */}
      <div className="flex items-center justify-between px-5 py-4 text-white md:px-8">
        <span className="text-sm tabular-nums text-white/70">
          {index + 1} / {count}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-sm p-2 text-white/80 transition-colors hover:text-white"
        >
          <span className="sr-only">Kapat</span>
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
        </button>
      </div>

      {/* Görsel alanı — boşluğa tıklayınca kapanır */}
      <div
        className="flex flex-1 items-center justify-center px-4 pb-4 md:px-16"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {count > 1 && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 z-10 rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:left-5"
          >
            <span className="sr-only">Önceki iş</span>
            <ChevronIcon direction="left" />
          </button>
        )}

        <div className="relative h-full max-h-[75vh] w-full max-w-5xl">
          <Image
            key={project.id}
            src={project.image}
            alt={project.alt}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-contain"
          />
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 z-10 rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:right-5"
          >
            <span className="sr-only">Sonraki iş</span>
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>

      {/* Alt bilgi */}
      <div className="px-5 pb-8 text-center text-white md:px-8">
        <p className="font-display text-xl">{project.title}</p>
        <p className="mt-1 text-sm text-white/60">
          {[project.stone, project.location].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      <path d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
    </svg>
  )
}
