import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'
import { site, whatsappUrl } from '@/data/site'

/** Sayfa sonundaki koyu iletişim bandı — tek net eylem çağrısı. */
export function CtaBand() {
  return (
    <section className="bg-ink py-20 text-white md:py-24">
      <Container>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[45ch]">
            <h2 className="text-white">Ölçüye gelelim, fiyatını söyleyelim</h2>
            <p className="mt-5 text-white/70">
              Ölçü ve keşif ücretsizdir. Aynı gün net fiyat veriyoruz — sürpriz
              ek maliyet çıkarmıyoruz.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <LinkButton href={`tel:${site.phoneHref}`}>
              {site.phoneDisplay}
            </LinkButton>
            <LinkButton href={whatsappUrl} variant="ghost">
              WhatsApp&apos;tan yazın
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
