import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'
import { Badge, BadgeDot } from '@/components/ui/Badge'
import { site, yearsOfExperience } from '@/data/site'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Sağ üstte çok soluk bir taba ışıma — düz beyaz zemini kırar. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-accent/8 blur-3xl"
      />

      <Container width="wide" className="relative pt-12 md:pt-16 lg:pt-24">
        {/* Başlık fotoğrafın ÜSTÜNDE değil, yanında.
            Metin taşın üstüne binmediği için her ekranda net okunur. */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Badge variant="accent" className="animate-rise uppercase tracking-[0.14em]">
              <BadgeDot />
              {site.address.city} · {yearsOfExperience} yıldır
            </Badge>

            <h1 className="animate-rise mt-6" style={{ animationDelay: '80ms' }}>
              {site.tagline}
            </h1>

            <p
              className="animate-rise mt-6 max-w-[45ch] text-muted"
              style={{ animationDelay: '160ms' }}
            >
              Mutfak tezgahından merdivene, banyodan zemine — ölçüsünü biz alır,
              kendi atölyemizde keser, kendi ekibimizle yerine koyarız.
            </p>

            <div
              className="animate-rise mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: '240ms' }}
            >
              <LinkButton href="/galeri">İşlerimizi görün</LinkButton>
              <LinkButton href="/iletisim" variant="outline">
                Ücretsiz ölçü alalım
              </LinkButton>
            </div>

            {/* Hizmet bölgeleri — hem güven verir hem yerel aramada işe yarar. */}
            <div
              className="animate-rise mt-10 border-t border-line pt-6"
              style={{ animationDelay: '320ms' }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                Hizmet bölgeleri
              </span>
              <p className="mt-2 text-sm text-ink/80">
                {site.serviceAreas.join(' · ')}
              </p>
            </div>
          </div>

          <div className="animate-rise lg:col-span-7" style={{ animationDelay: '120ms' }}>
            <div className="group relative aspect-16/10 overflow-hidden rounded-sm bg-line">
              <Image
                src="/images/hero.jpg"
                alt="Feza Mermer tarafından uygulanmış mermer mutfak tezgahı"
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />

              {/* Alt kenarda yumuşak karartma — üstteki etiket her fotoğrafta okunur. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent"
              />

              {/* Fotoğrafın kenarına ince iç çerçeve — çerçeveletilmiş baskı hissi. */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/15"
              />

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 md:bottom-6 md:left-6 md:right-6">
                <Badge variant="glass">Kendi atölyemizde kesim</Badge>
                <Badge variant="glass">Montaj bize ait</Badge>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
