import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LinkButton } from '@/components/ui/Button'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { MapEmbed } from '@/components/contact/MapEmbed'
import { isContactFormEnabled } from '@/lib/contact-action'
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld'
import { site, whatsappUrl } from '@/data/site'

export const metadata: Metadata = {
  title: 'İletişim',
  description: `${site.name} iletişim bilgileri, adres ve ücretsiz keşif talebi formu.`,
  alternates: { canonical: '/iletisim' },
}

export default async function IletisimPage() {
  const formEnabled = await isContactFormEnabled()

  return (
    <>
      <Section space="tight" tone="surface">
        <Container>
          <SectionTitle
            as="h1"
            eyebrow="İletişim"
            title="Ölçüye gelelim"
            description="Ölçü ve keşif ücretsizdir. Formu doldurun ya da doğrudan arayın — aynı gün dönüş yapıyoruz."
          />
        </Container>
      </Section>

      <Section tone="surface" className="pt-0">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              {formEnabled ? (
                <>
                  <h2 className="font-body text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    Teklif isteyin
                  </h2>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </>
              ) : (
                <FormFallback />
              )}
            </div>

            <ContactInfo />
          </div>

          <div className="mt-16">
            <MapEmbed />
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Anasayfa', path: '/' },
            { name: 'İletişim', path: '/iletisim' },
          ]),
        )}
      />
    </>
  )
}

/**
 * E-posta servisi henüz kurulmadığında gösterilir.
 * Kurmak için: .env.example dosyasındaki RESEND_API_KEY ve CONTACT_TO_EMAIL'i doldurun.
 */
function FormFallback() {
  return (
    <div className="rounded-sm border border-line bg-bone p-8">
      <h2 className="font-display text-2xl">En hızlısı: WhatsApp</h2>
      <p className="mt-4 text-muted">
        Mekânın fotoğrafını ve yaklaşık ölçüsünü gönderin, aynı gün fiyat
        verelim. Dilerseniz doğrudan da arayabilirsiniz.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton href={whatsappUrl}>WhatsApp&apos;tan yazın</LinkButton>
        <LinkButton href={`tel:${site.phoneHref}`} variant="outline">
          {site.phoneDisplay}
        </LinkButton>
      </div>
    </div>
  )
}
