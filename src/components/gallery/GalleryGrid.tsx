'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectTile } from './ProjectTile'
import { Lightbox } from './Lightbox'
import { categories, projects, type Category } from '@/data/projects'

type Filter = Category | 'tumu'

const filters: { id: Filter; label: string }[] = [
  { id: 'tumu', label: 'Tümü' },
  ...categories,
]

function isFilter(value: string | null): value is Filter {
  return filters.some((f) => f.id === value)
}

export function GalleryGrid() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Seçili kategori adres çubuğunda tutulur: /galeri?kategori=mutfak
  // Böylece bağlantı paylaşılabilir ve geri tuşu beklendiği gibi çalışır.
  const raw = searchParams.get('kategori')
  const active: Filter = isFilter(raw) ? raw : 'tumu'

  const visible =
    active === 'tumu' ? projects : projects.filter((p) => p.category === active)

  function selectFilter(filter: Filter) {
    const query = filter === 'tumu' ? '' : `?kategori=${filter}`
    router.replace(`/galeri${query}`, { scroll: false })
  }

  return (
    <Container width="wide">
      {/* Kategori filtresi */}
      <div
        role="group"
        aria-label="Kategoriye göre filtrele"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const selected = filter.id === active
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => selectFilter(filter.id)}
              className={`rounded-sm border px-5 py-2.5 text-sm tracking-wide transition-colors ${
                selected
                  ? 'border-accent bg-accent text-white'
                  : 'border-line bg-surface text-ink hover:border-accent hover:text-accent-dark'
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-muted">
        {visible.length} iş gösteriliyor
      </p>

      {/* Izgara */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          // Anahtara aktif filtre de giriyor: filtre değişince kartlar
          // sıfırdan bağlanır, böylece beliriş efekti her seferinde
          // baştan ve eksiksiz çalışır.
          <Reveal key={`${active}-${project.id}`} delay={(i % 3) * 80}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full cursor-zoom-in"
            >
              <ProjectTile project={project} lazy={i >= 6} />
              <span className="sr-only">Büyük görüntüle</span>
            </button>
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-20 text-center text-muted">
          Bu kategoride henüz yayınlanmış iş yok.
        </p>
      )}

      {openIndex !== null && (
        <Lightbox
          projects={visible}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </Container>
  )
}
