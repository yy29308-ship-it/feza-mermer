import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { CtaBand } from '@/components/home/CtaBand'
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Galeri — Yaptığımız İşler',
  description:
    'Mutfak tezgahı, banyo tezgahı, lavabo, merdiven ve zemin kaplaması uygulamalarımızdan seçilmiş fotoğraflar.',
  alternates: { canonical: '/galeri' },
}

export default function GaleriPage() {
  return (
    <>
      <Section space="tight" tone="surface">
        <Container width="wide">
          <SectionTitle
            as="h1"
            eyebrow="Galeri"
            title="Yaptığımız işler"
            description="Fotoğrafa tıklayarak büyütebilirsiniz. Hepsi ölçüsünü bizim aldığımız, kendi atölyemizde kestiğimiz işler."
          />
        </Container>
      </Section>

      <Section tone="surface" space="tight" className="pt-0">
        {/* useSearchParams istemci tarafında çalıştığı için Suspense şart. */}
        <Suspense fallback={<GallerySkeleton />}>
          <GalleryGrid />
        </Suspense>
      </Section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Anasayfa', path: '/' },
            { name: 'Galeri', path: '/galeri' },
          ]),
        )}
      />
    </>
  )
}

function GallerySkeleton() {
  return (
    <Container width="wide">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-4/3 animate-pulse rounded-sm bg-line" />
        ))}
      </div>
    </Container>
  )
}
