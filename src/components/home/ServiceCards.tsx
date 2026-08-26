import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import { services } from '@/data/services'

export function ServiceCards() {
  return (
    <Section>
      <Container width="wide">
        <SectionTitle
          eyebrow="Ne yapıyoruz"
          title="Üç alanda uzmanlaştık"
          description="Her işi yapmıyoruz. Yaptığımız üç işi çok iyi yapıyoruz."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 90} className="h-full">
              <Link
                href={`/galeri?kategori=${service.id}`}
                className="group block h-full rounded-sm"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-[0_18px_40px_-24px_rgba(28,25,23,0.45)]">
                  <div className="relative aspect-4/3 overflow-hidden bg-line">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    {/* Sıra numarası — üç kartı bir seri gibi okutur. */}
                    <span
                      aria-hidden
                      className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 font-display text-xs tracking-[0.08em] text-ink backdrop-blur-md"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="transition-colors group-hover:text-accent-dark">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-muted">{service.summary}</p>

                    {/* En sık çalışılan taşlar — müşterinin ilk sorduğu şey. */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {service.stones.slice(0, 3).map((stone) => (
                        <Badge key={stone}>{stone}</Badge>
                      ))}
                    </div>

                    <span className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-xs font-medium uppercase tracking-[0.14em] text-accent-dark">
                      İşlerini gör
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                        <ArrowIcon />
                      </span>
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
