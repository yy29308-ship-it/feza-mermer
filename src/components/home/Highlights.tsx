import { Container } from '@/components/ui/Container'
import { highlights } from '@/data/services'

/** Hero'nun hemen altındaki üç kısa güven maddesi. */
export function Highlights() {
  return (
    <div className="bg-surface">
      <Container width="wide">
        <ul className="grid gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-3">
          {highlights.map((item) => (
            <li key={item.title} className="bg-surface px-6 py-8">
              <h2 className="font-body text-sm font-medium uppercase tracking-[0.12em] text-ink">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}
