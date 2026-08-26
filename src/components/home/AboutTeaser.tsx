import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LinkButton } from '@/components/ui/Button'
import { projects } from '@/data/projects'
import { site, yearsOfExperience } from '@/data/site'

const stats = [
  { value: `${yearsOfExperience}+`, label: 'yıllık tecrübe' },
  { value: `${projects.length}+`, label: 'tamamlanan iş' },
  { value: site.serviceAreas.length.toString(), label: 'hizmet bölgesi' },
]

export function AboutTeaser() {
  return (
    <Section>
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-line">
            <Image
              src="/images/atolye.jpg"
              alt={`${site.name} tarafından uygulanmış mermer mutfak tezgahı`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <SectionTitle
              eyebrow="Hakkımızda"
              title={`${site.address.city}'de ${yearsOfExperience} yıldır aynı ekip`}
              description={`Atölyemiz ${site.address.district} Sanayi'de. Aracı çalışmıyoruz: taşı biz seçiyor, kendi tezgahımızda kesiyor ve kendi ekibimizle monte ediyoruz. Bir sorun çıkarsa arayacağınız numara tek.`}
            />

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl md:text-4xl">{stat.value}</dd>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>

            <LinkButton href="/iletisim" variant="outline" className="mt-10">
              Bize ulaşın
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  )
}
