import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  id,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__text">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 id={id}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="section-heading__action">{action}</div> : null}
    </div>
  )
}
