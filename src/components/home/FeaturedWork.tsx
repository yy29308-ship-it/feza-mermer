import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LinkButton } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectTile } from '@/components/gallery/ProjectTile'
import { featuredProjects } from '@/data/projects'

export function FeaturedWork() {
  if (featuredProjects.length === 0) return null

  return (
    <Section tone="surface">
      <Container width="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Yaptığımız işler"
            title="Söz yerine iş"
            description="Aşağıdakilerin hepsi bizim ölçüp kestiğimiz, bizim monte ettiğimiz işler."
          />
          <LinkButton href="/galeri" variant="outline" className="shrink-0">
            Tüm galeri
          </LinkButton>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 90}>
              <Link
                href={`/galeri?kategori=${project.category}`}
                className="group block h-full"
              >
                <ProjectTile project={project} />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
