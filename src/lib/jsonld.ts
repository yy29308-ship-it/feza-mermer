import { site, siteUrl } from '@/data/site'

/** Türkçe gün adı -> schema.org'un beklediği İngilizce karşılığı. */
const DAYS: Record<string, string> = {
  Pazartesi: 'Monday',
  Salı: 'Tuesday',
  Çarşamba: 'Wednesday',
  Perşembe: 'Thursday',
  Cuma: 'Friday',
  Cumartesi: 'Saturday',
  Pazar: 'Sunday',
}

const DAY_ORDER = Object.keys(DAYS)

/**
 * "Pazartesi - Cumartesi" / "09:00 - 18:00" satırlarını Google'ın
 * anlayacağı yapıya çevirir.
 *
 * Neden gerekli: schema.org çalışma saatlerini İngilizce gün adlarıyla
 * bekler. Türkçe yazıyı olduğu gibi göndermek kaydı geçersiz kılar,
 * Google saatleri hiç göstermez.
 */
function openingHoursSpecification() {
  return site.openingHours
    .filter((o) => o.hours.toLowerCase() !== 'kapalı')
    .map((o) => {
      const parts = o.days.split('-').map((d) => d.trim())
      const from = DAY_ORDER.indexOf(parts[0])
      const to = DAY_ORDER.indexOf(parts[parts.length - 1])

      // Tanınmayan bir gün adı yazılmışsa uydurmak yerine bu satırı atla.
      if (from === -1 || to === -1 || to < from) return null

      const [opens, closes] = o.hours.split('-').map((h) => h.trim())
      if (!opens || !closes) return null

      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAY_ORDER.slice(from, to + 1).map((d) => DAYS[d]),
        opens,
        closes,
      }
    })
    .filter((spec): spec is NonNullable<typeof spec> => spec !== null)
}

/**
 * Google'a "burası bir yerel işletme" diyen yapısal veri.
 * Arama sonuçlarında telefon, adres ve çalışma saatlerinin çıkmasını sağlar.
 */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${siteUrl}/#isletme`,
    name: site.name,
    description: site.description,
    url: siteUrl,
    telephone: site.phoneHref,
    email: site.email,
    image: `${siteUrl}/images/og.jpg`,
    foundingDate: String(site.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.district,
      addressRegion: site.address.city,
      ...(site.address.postalCode
        ? { postalCode: site.address.postalCode }
        : {}),
      addressCountry: site.address.country,
    },
    areaServed: site.serviceAreas.map((area) => ({ '@type': 'City', name: area })),
    openingHoursSpecification: openingHoursSpecification(),
    knowsAbout: ['mermer', 'granit', 'mutfak tezgahı', 'banyo tezgahı', 'merdiven'],
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
  }
}

/** Arama sonucunda site içi gezinme kırıntısı. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
}

/** JSON-LD'yi sayfaya gömmek için yardımcı. */
export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data),
  }
}
