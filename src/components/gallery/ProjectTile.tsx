import Image from 'next/image'
import type { Project } from '@/data/projects'

type Props = {
  project: Project
  /** İlk ekranda görünenlerde false — gerisi tembel yüklenir. */
  lazy?: boolean
  sizes?: string
}

/**
 * Bir işin görsel kutusu. Anasayfa ve galeri aynı kutuyu kullanır;
 * tıklama davranışını sarmalayan bileşen belirler (link ya da lightbox).
 */
export function ProjectTile({
  project,
  lazy = true,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: Props) {
  // Taş cinsi / yer girilmemişse boş satır bırakmayalım.
  const meta = [project.stone, project.location].filter(Boolean).join(' · ')

  return (
    <figure className="flex h-full flex-col text-left">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm bg-line">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes={sizes}
          loading={lazy ? 'lazy' : 'eager'}
          priority={!lazy}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <figcaption className="mt-4">
        <h3 className="font-body text-base font-medium tracking-normal text-ink">
          {project.title}
        </h3>
        {meta && <p className="mt-1 text-sm text-muted">{meta}</p>}
      </figcaption>
    </figure>
  )
}
