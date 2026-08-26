import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { site, siteUrl } from '@/data/site'
import { jsonLdScript, localBusinessJsonLd } from '@/lib/jsonld'
import './globals.css'

/* Yazı tipleri Google'dan indirilip site ile birlikte servis edilir —
   ziyaretçinin tarayıcısı dışarıya istek atmaz, sayfa zıplamaz.
   'latin-ext' Türkçe karakterler (ğ ş ı İ) için zorunlu. */
const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.address.city} Mutfak Tezgahı ve Mermer`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'mermer',
    'granit',
    'mutfak tezgahı',
    'banyo tezgahı',
    'mermer merdiven',
    site.address.city,
    `${site.address.city} mermer`,
    `${site.address.city} mutfak tezgahı`,
    site.address.district,
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: `${site.name} mermer uygulamaları`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Klavyeyle gezenler menüyü atlayıp içeriğe geçebilsin */}
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          İçeriğe geç
        </a>

        <Header />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(localBusinessJsonLd())}
        />
      </body>
    </html>
  )
  
}
