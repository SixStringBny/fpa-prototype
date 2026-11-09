import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Star,
  Video,
} from 'lucide-react'
import { getMentorBySlug } from '../../data/mentors'
import { useDemo } from '../../state/demo-state'
import { formatZar } from '../../lib/format'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Tag } from '../../components/ui/Tag'
import { SaveButton } from '../../components/shared/SaveButton'
import { ReviewCard } from '../../components/shared/ReviewCard'
import { Stars } from '../../components/shared/Stars'
import { Container } from '../../components/layout/Container'
import { useToast } from '../../components/ui/Toast'
import { NotFoundPage } from '../marketing/NotFoundPage'

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

type MentorProfilePageProps = {
  inApp?: boolean
}

export function MentorProfilePage({ inApp = false }: MentorProfilePageProps) {
  const { mentorSlug } = useParams()
  const mentor = getMentorBySlug(mentorSlug)
  const { state, saveMentor, unsaveMentor } = useDemo()
  const { toast } = useToast()
  const navigate = useNavigate()

  if (!mentor) return <NotFoundPage />

  const saved = state.savedMentorIds.includes(mentor.id)
  const bookPath = `/app/mentors/${mentor.slug}/book`
  const bookHref = state.auth.isAuthenticated
    ? bookPath
    : `/login?next=${encodeURIComponent(bookPath)}`

  const toggleSave = () => {
    if (!state.auth.isAuthenticated) {
      navigate(
        `/login?next=${encodeURIComponent(
          inApp ? `/app/mentors/${mentor.slug}` : `/mentors/${mentor.slug}`,
        )}`,
      )
      return
    }
    if (saved) {
      unsaveMentor(mentor.id)
      toast(`${mentor.name} removed from saved mentors.`)
    } else {
      saveMentor(mentor.id)
      toast(`${mentor.name} saved. Find them under Saved.`)
    }
  }

  const priceLabel = mentor.sessionTypes.includes('free')
    ? 'Free intro session'
    : mentor.priceZar
      ? `${formatZar(mentor.priceZar)} per session`
      : 'Paid session'

  const profile = (
    <>
      {inApp ? (
        <Link
          to="/app/mentors"
          className="inline-link"
          style={{ display: 'inline-flex', gap: 6, marginBottom: 'var(--space-4)' }}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to mentor matching
        </Link>
      ) : null}

      <div className="mentor-profile-hero">
        <Avatar src={mentor.avatar} alt="" size="xl" ring />
        <div className="mentor-profile-hero__identity">
          <div className="cluster" style={{ marginBottom: 'var(--space-2)' }}>
            <Badge tone="teal">Mentor</Badge>
            {mentor.sessionTypes.includes('free') ? (
              <Badge tone="success">Free intro</Badge>
            ) : (
              <Badge tone="warning">Paid</Badge>
            )}
          </div>
          <h1>{mentor.name}</h1>
          <p className="mentor-profile-hero__role">
            {mentor.role} · {mentor.company}
          </p>
          <div className="mentor-profile-hero__meta">
            <span>
              <Stars rating={mentor.rating} reviewCount={mentor.reviewCount} />
            </span>
            <span>
              <MapPin size={15} aria-hidden="true" />
              {mentor.location}
            </span>
            <span>
              <Video size={15} aria-hidden="true" />
              Online
            </span>
            <span>{mentor.sessionCount} sessions</span>
          </div>
        </div>
        <div className="mentor-profile-hero__actions">
          <Link className="btn btn--primary" to={bookHref}>
            <CalendarDays size={17} aria-hidden="true" />
            Book a session
          </Link>
          <div className="cluster">
            <SaveButton
              saved={saved}
              onToggle={toggleSave}
              mentorName={mentor.name}
            />
            <span className="text-sm text-muted">
              {saved ? 'Saved' : 'Save mentor'}
            </span>
          </div>
        </div>
      </div>

      <div className="with-rail">
        <div>
          <section className="profile-section">
            <h2>About {mentor.name.split(' ')[0]}</h2>
            <p>{mentor.bio}</p>
            <div className="cluster" style={{ marginTop: 'var(--space-4)' }}>
              {mentor.expertise.map((item) => (
                <Tag key={item} accent>
                  {item}
                </Tag>
              ))}
            </div>
          </section>

          <section className="profile-section">
            <h2>Experience</h2>
            <div className="cluster">
              <Badge tone="blue">
                <Star size={13} aria-hidden="true" />
                {mentor.experienceYears} years experience
              </Badge>
              <Badge>
                <Clock size={13} aria-hidden="true" />
                30-minute sessions
              </Badge>
              <Badge>
                <Video size={13} aria-hidden="true" />
                Online only
              </Badge>
            </div>
            <p style={{ marginTop: 'var(--space-4)' }}>
              {mentor.shortBio}
            </p>
          </section>

          <section className="profile-section">
            <h2>What people say</h2>
            <div className="review-list">
              {mentor.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        </div>

        <aside className="with-rail__rail">
          <div className="sticky-card">
            <h2>Book with {mentor.name.split(' ')[0]}</h2>
            <ul className="sticky-card__list">
              <li>
                <Clock size={16} aria-hidden="true" />
                {priceLabel}
              </li>
              <li>
                <Video size={16} aria-hidden="true" />
                30-minute online session
              </li>
              <li>
                <CalendarDays size={16} aria-hidden="true" />
                Choose a slot that suits you
              </li>
            </ul>
            <Link className="btn btn--primary btn--block" to={bookHref}>
              Book a session
            </Link>
            <button
              type="button"
              className="btn btn--secondary btn--block"
              style={{ marginTop: 'var(--space-2)' }}
              onClick={toggleSave}
              aria-pressed={saved}
            >
              {saved ? 'Remove from saved' : 'Save for later'}
            </button>
          </div>

          <div className="sticky-card">
            <h2>Availability</h2>
            <ul className="availability-list">
              {mentor.availability.map((rule) => (
                <li
                  key={`${rule.weekdays.join('-')}-${rule.times.join('-')}`}
                >
                  <span>
                    <strong>
                      {rule.weekdays
                        .slice()
                        .sort((a, b) => a - b)
                        .map((day) => dayNames[day]?.slice(0, 3))
                        .join(', ')}
                    </strong>
                  </span>
                  <span>{rule.times.join(' · ')}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted mt-4">
              Times are shown in South African Standard Time. All sessions are
              held online.
            </p>
          </div>
        </aside>
      </div>
    </>
  )

  if (inApp) return profile

  return (
    <section className="section section--tight">
      <Container>{profile}</Container>
    </section>
  )
}
