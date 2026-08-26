import { Hero } from '@/components/home/Hero'
import { Highlights } from '@/components/home/Highlights'
import { ServiceCards } from '@/components/home/ServiceCards'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { AboutTeaser } from '@/components/home/AboutTeaser'
import { CtaBand } from '@/components/home/CtaBand'
import { site } from '@/data/site'

export const metadata = {
  title: `${site.name} — ${site.address.city} Mutfak Tezgahı ve Mermer`,
  description: site.description,
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <ServiceCards />
      <FeaturedWork />
      <AboutTeaser />
      <CtaBand />
    </>
  )
}
