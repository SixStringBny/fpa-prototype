import { AlertTriangle, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react'
import type { LessonBlock } from '../../types'
import { cn } from '../../lib/cn'

const calloutIcons = {
  tip: Lightbulb,
  warning: AlertTriangle,
  example: Sparkles,
}

export function ContentBlocks({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="lesson-blocks prose">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        switch (block.type) {
          case 'paragraph':
            return <p key={key}>{block.text}</p>
          case 'heading':
            return (
              <h2 className="lesson-block--heading" key={key}>
                {block.text}
              </h2>
            )
          case 'list':
            return (
              <ul className="lesson-block--list" key={key}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case 'quote':
            return (
              <blockquote className="lesson-block--quote" key={key}>
                “{block.text}”
                {block.attribution ? (
                  <cite>— {block.attribution}</cite>
                ) : null}
              </blockquote>
            )
          case 'callout': {
            const Icon = calloutIcons[block.tone]
            return (
              <aside
                className={cn('lesson-callout', `lesson-callout--${block.tone}`)}
                key={key}
              >
                <Icon
                  className="lesson-callout__icon"
                  size={20}
                  aria-hidden="true"
                />
                <div>
                  <p className="lesson-callout__title">{block.title}</p>
                  <p>{block.text}</p>
                </div>
              </aside>
            )
          }
          case 'checklist':
            return (
              <ul className="lesson-checklist" key={key}>
                {block.items.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )
          case 'image':
            return (
              <figure key={key}>
                <img
                  src={block.src}
                  alt={block.alt}
                  style={{ borderRadius: 'var(--radius-card)' }}
                  loading="lazy"
                />
                {block.caption ? (
                  <figcaption
                    className="text-sm text-muted"
                    style={{ marginTop: 'var(--space-2)' }}
                  >
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
