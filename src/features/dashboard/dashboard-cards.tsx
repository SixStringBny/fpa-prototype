import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Compass,
  ExternalLink,
  PlayCircle,
  Users,
  Video,
} from 'lucide-react'
import type {
  Booking,
  LearnerProfile,
  Mentor,
  Module,
  TailoredResource,
} from '../../types'
import {
  formatDateLong,
  formatDayMonth,
  formatTime,
  relativeDayLabel,
} from '../../lib/dates'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { StatCard } from '../../components/shared/StatCard'
import { moduleIcon } from '../../components/shared/ModuleCard'

type DashboardHeroProps = {
  profile: LearnerProfile
  completeness: number
  missing: string[]
  continueHref?: string
  continueLabel?: string
}

export function DashboardHero({
  profile,
  completeness,
  missing,
  continueHref,
  continueLabel,
}: DashboardHeroProps) {
  const firstName = profile.name.split(' ')[0]
  const today = new Date()

  return (
    <section className="dashboard-hero">
      <div>
        <span className="eyebrow">Your dashboard</span>
        <h1>Welcome back, {firstName}</h1>
        <p>
          {formatDateLong(today)}. You are building a freelance practice one
          useful conversation at a time.
        </p>
        <div className="dashboard-hero__actions">
          {continueHref ? (
            <Link className="btn btn--primary" to={continueHref}>
              <PlayCircle size={18} aria-hidden="true" />
              {continueLabel ?? 'Continue learning'}
            </Link>
          ) : (
            <Link className="btn btn--primary" to="/app/learn">
              <BookOpen size={18} aria-hidden="true" />
              Start a module
            </Link>
          )}
          <Link className="btn btn--ghost-light" to="/app/mentors">
            Find a mentor
          </Link>
        </div>
      </div>

      <div className="completeness-card">
        <div className="completeness-card__top">
          <div
            className="ring"
            style={{ '--pct': completeness } as CSSProperties}
            aria-hidden="true"
          >
            <div className="ring__inner">{completeness}%</div>
          </div>
          <div>
            <p className="completeness-card__label">Profile completeness</p>
            <p className="completeness-card__hint">
              A complete profile helps mentors prepare.
            </p>
          </div>
        </div>
        {missing.length > 0 ? (
          <div className="completeness-card__links">
            {missing.slice(0, 3).map((item) => (
              <Link
                key={item}
                className="completeness-card__link"
                to="/app/profile"
              >
                <CheckCircle2 size={13} aria-hidden="true" />
                {item}
              </Link>
            ))}
            <Link className="completeness-card__link" to="/app/profile">
              <ArrowRight size={13} aria-hidden="true" />
              Finish your profile
            </Link>
          </div>
        ) : (
          <p className="completeness-card__hint" style={{ marginTop: 'var(--space-4)' }}>
            Your profile is complete. Nice work.
          </p>
        )}
      </div>
    </section>
  )
}

type ImpactStatsProps = {
  lessons: number
  modules: number
  sessions: number
  saved: number
}

export function ImpactStats({ lessons, modules, sessions, saved }: ImpactStatsProps) {
  return (
    <div className="stat-grid">
      <StatCard
        icon={<CheckCircle2 size={19} />}
        value={lessons}
        label="Lessons completed"
      />
      <StatCard
        icon={<BookOpen size={19} />}
        value={modules}
        label="Modules in progress"
      />
      <StatCard
        icon={<CalendarDays size={19} />}
        value={sessions}
        label="Upcoming sessions"
      />
      <StatCard
        icon={<Users size={19} />}
        value={saved}
        label="Mentors saved"
      />
    </div>
  )
}

type ContinueLearningCardProps = {
  module: Module
  lessonTitle?: string
  href: string
  percent: number
  completed: number
}

export function ContinueLearningCard({
  module,
  lessonTitle,
  href,
  percent,
  completed,
}: ContinueLearningCardProps) {
  return (
    <section className="dashboard-card" data-accent={module.accent}>
      <div className="dashboard-card__header">
        <h2 className="dashboard-card__title">Continue learning</h2>
        <Link className="dashboard-card__link" to="/app/learn">
          All modules
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <div className="continue-card">
        <div className="continue-card__icon" aria-hidden="true">
          {moduleIcon(module.topic)}
        </div>
        <div>
          <p className="continue-card__eyebrow">{module.title}</p>
          <p className="continue-card__title">
            {lessonTitle ?? 'Review the module'}
          </p>
          <p className="continue-card__meta">
            {completed} of {module.lessons.length} lessons complete
          </p>
          <div className="continue-card__progress">
            <ProgressBar
              value={percent}
              label={`${module.title} progress`}
              showValue
              size="sm"
            />
          </div>
        </div>
        <div className="continue-card__action">
          <Link className="btn btn--primary btn--sm" to={href}>
            {percent >= 100 ? 'Review' : 'Continue'}
          </Link>
        </div>
      </div>
    </section>
  )
}

type UpcomingSessionCardProps = {
  booking: Booking
  mentor: Mentor
  onJoin: () => void
}

export function UpcomingSessionCard({
  booking,
  mentor,
  onJoin,
}: UpcomingSessionCardProps) {
  const date = new Date(booking.startsAt)

  return (
    <section className="dashboard-card">
      <div className="dashboard-card__header">
        <h2 className="dashboard-card__title">Next session</h2>
        <Link className="dashboard-card__link" to="/app/sessions">
          All sessions
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <div className="session-preview">
        <div className="session-preview__date" aria-hidden="true">
          <span className="session-preview__day">{date.getDate()}</span>
          <span className="session-preview__month">
            {date.toLocaleString('en-ZA', { month: 'short' })}
          </span>
        </div>
        <Avatar src={mentor.avatar} alt="" size="md" />
        <div className="session-preview__body">
          <p className="session-preview__title">{mentor.name}</p>
          <p className="session-preview__meta">
            {relativeDayLabel(date)} · {formatDayMonth(date)} ·{' '}
            {formatTime(date)}
          </p>
          <p className="session-preview__meta">
            <Video
              size={14}
              aria-hidden="true"
              style={{ display: 'inline', marginRight: 4 }}
            />
            30-minute online session ·{' '}
            {booking.type === 'free' ? 'Free intro' : 'Paid'}
          </p>
          <div className="session-preview__actions">
            <Button size="sm" onClick={onJoin} icon={<Video size={15} />}>
              Join session
            </Button>
            <Link className="btn btn--secondary btn--sm" to="/app/sessions">
              Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

type SavedMentorsCardProps = {
  mentors: Mentor[]
}

export function SavedMentorsCard({ mentors }: SavedMentorsCardProps) {
  return (
    <section className="dashboard-card">
      <div className="dashboard-card__header">
        <h2 className="dashboard-card__title">Saved mentors</h2>
        <Link className="dashboard-card__link" to="/app/saved">
          View all
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <ul className="saved-mini-list">
        {mentors.map((mentor) => (
          <li className="saved-mini" key={mentor.id}>
            <Avatar src={mentor.avatar} alt="" size="sm" />
            <div className="saved-mini__body">
              <Link className="saved-mini__name" to={`/app/mentors/${mentor.slug}`}>
                {mentor.name}
              </Link>
              <p className="saved-mini__role">{mentor.role}</p>
            </div>
            <Badge tone="teal">{mentor.expertise[0]}</Badge>
          </li>
        ))}
      </ul>
    </section>
  )
}

type RecommendedMentorsCardProps = {
  mentors: Mentor[]
  savedIds: string[]
}

export function RecommendedMentorsCard({
  mentors,
  savedIds,
}: RecommendedMentorsCardProps) {
  return (
    <section className="dashboard-card">
      <div className="dashboard-card__header">
        <h2 className="dashboard-card__title">Recommended for you</h2>
        <Link className="dashboard-card__link" to="/app/mentors">
          Browse all
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <ul className="saved-mini-list">
        {mentors.map((mentor) => (
          <li className="saved-mini" key={mentor.id}>
            <Avatar src={mentor.avatar} alt="" size="sm" />
            <div className="saved-mini__body">
              <Link className="saved-mini__name" to={`/app/mentors/${mentor.slug}`}>
                {mentor.name}
              </Link>
              <p className="saved-mini__role">
                {mentor.expertise.slice(0, 2).join(' · ')}
              </p>
            </div>
            {savedIds.includes(mentor.id) ? (
              <Badge tone="success">Saved</Badge>
            ) : (
              <Link
                className="btn btn--secondary btn--sm"
                to={`/app/mentors/${mentor.slug}`}
              >
                View
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

const resourceIcons: Record<TailoredResource['kind'], ReactNode> = {
  module: <BookOpen size={16} />,
  mentor: <Users size={16} />,
  guide: <Compass size={16} />,
}

export function TailoredResourcesCard({
  resources,
}: {
  resources: TailoredResource[]
}) {
  return (
    <section className="rail-card">
      <h2>Your plan</h2>
      <ul className="resource-list">
        {resources.map((resource) => (
          <li key={resource.title}>
            <Link className="resource-item" to={resource.href}>
              <span className="resource-item__icon" aria-hidden="true">
                {resourceIcons[resource.kind]}
              </span>
              <span>
                <span className="resource-item__title">{resource.title}</span>
                <span className="resource-item__description">
                  {resource.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function QuickLinksCard({ profileComplete }: { profileComplete: boolean }) {
  return (
    <section className="rail-card">
      <h2>Keep going</h2>
      <ul className="resource-list">
        <li>
          <Link className="resource-item" to="/app/learn">
            <span className="resource-item__icon" aria-hidden="true">
              <BookOpen size={16} />
            </span>
            <span>
              <span className="resource-item__title">Browse all modules</span>
              <span className="resource-item__description">
                Six practical topics, self-paced.
              </span>
            </span>
          </Link>
        </li>
        <li>
          <Link className="resource-item" to="/app/mentors">
            <span className="resource-item__icon" aria-hidden="true">
              <Users size={16} />
            </span>
            <span>
              <span className="resource-item__title">Find a mentor</span>
              <span className="resource-item__description">
                Book a free intro session.
              </span>
            </span>
          </Link>
        </li>
        {!profileComplete ? (
          <li>
            <Link className="resource-item" to="/app/profile">
              <span className="resource-item__icon" aria-hidden="true">
                <ExternalLink size={16} />
              </span>
              <span>
                <span className="resource-item__title">Finish your profile</span>
                <span className="resource-item__description">
                  Add the details mentors need.
                </span>
              </span>
            </Link>
          </li>
        ) : null}
      </ul>
      <p className="text-xs text-muted" style={{ marginTop: 'var(--space-4)' }}>
        <Clock size={13} aria-hidden="true" style={{ display: 'inline', marginRight: 4 }} />
        Tip: work through one lesson before your next session.
      </p>
    </section>
  )
}
