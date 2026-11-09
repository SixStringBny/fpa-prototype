import { Star } from 'lucide-react'

type StarsProps = {
  rating: number
  reviewCount?: number
  showValue?: boolean
}

export function Stars({ rating, reviewCount, showValue = true }: StarsProps) {
  return (
    <span className="mentor-card__stars">
      <Star size={14} fill="currentColor" aria-hidden="true" />
      {showValue ? <span>{rating.toFixed(1)}</span> : null}
      {typeof reviewCount === 'number' ? (
        <span className="text-muted" style={{ fontWeight: 400 }}>
          ({reviewCount})
        </span>
      ) : null}
      <span className="visually-hidden">
        Rated {rating.toFixed(1)} out of 5
        {typeof reviewCount === 'number' ? ` from ${reviewCount} reviews` : ''}
      </span>
    </span>
  )
}
