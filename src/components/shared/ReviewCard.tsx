import { Star } from 'lucide-react'
import type { Review } from '../../types'
import { formatDateMedium } from '../../lib/dates'

type ReviewCardProps = {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="review-card">
      <div className="review-card__top">
        <div>
          <p className="review-card__author">{review.author}</p>
          <p className="review-card__role">{review.role}</p>
        </div>
        <span className="review-card__stars">
          <Star size={14} fill="currentColor" aria-hidden="true" />
          {review.rating.toFixed(1)}
          <span className="visually-hidden"> out of 5</span>
        </span>
      </div>
      <p className="review-card__quote">“{review.quote}”</p>
      <p className="review-card__date">
        <time dateTime={review.date}>
          {formatDateMedium(new Date(review.date))}
        </time>
      </p>
    </article>
  )
}
