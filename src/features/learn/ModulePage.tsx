import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  PlayCircle,
} from 'lucide-react'
import { getModuleBySlug, modules } from '../../data/modules'
import { useDemo } from '../../state/demo-state'
import {
  getModuleCompletedCount,
  getModuleProgressPercent,
  getNextLesson,
  isLessonComplete,
} from '../../state/selectors'
import { formatDuration } from '../../lib/format'
import { Container } from '../../components/layout/Container'
import { Badge } from '../../components/ui/Badge'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { ModuleCard } from '../../components/shared/ModuleCard'
import { moduleIcon } from '../../components/shared/ModuleCard'
import { NotFoundPage } from '../marketing/NotFoundPage'

type ModulePageProps = {
  inApp?: boolean
}

export function ModulePage({ inApp = false }: ModulePageProps) {
  const { moduleSlug } = useParams()
  const module = getModuleBySlug(moduleSlug)
  const { state } = useDemo()

  if (!module) return <NotFoundPage />

  const base = inApp ? '/app' : ''
  const nextLesson = getNextLesson(state, module)
  const completedCount = getModuleCompletedCount(state, module)
  const percent = getModuleProgressPercent(state, module)
  const firstLesson = module.lessons[0]

  const lessonPath = (slug: string) =>
    `/app/learn/${module.slug}/${slug}`

  const startPath = nextLesson
    ? lessonPath(nextLesson.slug)
    : firstLesson
      ? lessonPath(firstLesson.slug)
      : `/app/learn/${module.slug}`

  const gatedStart = state.auth.isAuthenticated
    ? startPath
    : `/login?next=${encodeURIComponent(startPath)}`

  const ctaLabel = state.auth.isAuthenticated
    ? percent >= 100
      ? 'Review from the start'
      : completedCount > 0
        ? 'Continue module'
        : 'Start module'
    : 'Sign in to start'

  const related = modules
    .filter((item) => item.id !== module.id)
    .sort((a, b) => {
      const aMatches = a.topic === module.topic || a.level === module.level ? 1 : 0
      const bMatches = b.topic === module.topic || b.level === module.level ? 1 : 0
      return bMatches - aMatches
    })
    .slice(0, 3)

  const content = (
    <>
      {inApp ? (
        <Link
          to="/app/learn"
          className="inline-link"
          style={{ display: 'inline-flex', gap: 6, marginBottom: 'var(--space-4)' }}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Learn
        </Link>
      ) : null}

      <div className="module-detail__hero" data-accent={module.accent}>
        <div>
          <div className="module-detail__icon" aria-hidden="true">
            {moduleIcon(module.topic)}
          </div>
          <div className="cluster" style={{ marginBottom: 'var(--space-3)' }}>
            <Badge tone="teal">{module.level}</Badge>
            <Badge>{module.topic}</Badge>
          </div>
          <h1>{module.title}</h1>
          <p>{module.description}</p>
          <div className="module-detail__meta">
            <span>
              <BookOpen size={16} aria-hidden="true" />
              {module.lessons.length} lessons
            </span>
            <span>
              <Clock size={16} aria-hidden="true" />
              {formatDuration(module.durationMins)}
            </span>
            <span>
              <Layers size={16} aria-hidden="true" />
              {module.level}
            </span>
          </div>
        </div>

        <div className="module-detail__cta">
          {inApp ? (
            <>
              <p className="module-detail__cta-label">Your progress</p>
              <ProgressBar
                value={percent}
                label={`${module.title} progress`}
                showValue
              />
              <p className="text-sm text-muted">
                {completedCount} of {module.lessons.length} lessons complete
              </p>
              <Link className="btn btn--primary btn--block" to={startPath}>
                <PlayCircle size={18} aria-hidden="true" />
                {ctaLabel}
              </Link>
            </>
          ) : (
            <>
              <p className="module-detail__cta-label">Ready when you are</p>
              <p className="module-detail__cta-title">
                Work through {module.lessons.length} practical lessons
              </p>
              <Link className="btn btn--primary btn--block" to={gatedStart}>
                {ctaLabel}
              </Link>
              <p className="text-sm text-muted">
                Free · self-paced · no prior business knowledge needed
              </p>
            </>
          )}
        </div>
      </div>

      <div className="with-rail">
        <div>
          <section className="profile-section">
            <h2>Lessons in this module</h2>
            <ol className="lesson-list">
              {module.lessons.map((lesson, index) => {
                const complete = inApp
                  ? isLessonComplete(state, module.id, lesson.id)
                  : false
                const isCurrent = inApp && nextLesson?.id === lesson.id
                const href = inApp
                  ? lessonPath(lesson.slug)
                  : state.auth.isAuthenticated
                    ? lessonPath(lesson.slug)
                    : `/login?next=${encodeURIComponent(lessonPath(lesson.slug))}`
                return (
                  <li
                    key={lesson.id}
                    className={`lesson-row${isCurrent ? ' lesson-row--current' : ''}`}
                  >
                    <span
                      className={`lesson-row__number${complete ? ' lesson-row__number--complete' : ''}`}
                      aria-hidden="true"
                    >
                      {complete ? <CheckCircle2 size={18} /> : index + 1}
                    </span>
                    <div className="lesson-row__body">
                      <Link className="lesson-row__title" to={href}>
                        {lesson.title}
                      </Link>
                      <div className="lesson-row__meta">
                        <span>{lesson.durationMins} min read</span>
                        <span>{lesson.summary}</span>
                      </div>
                    </div>
                    {complete ? (
                      <span className="lesson-row__status">Complete</span>
                    ) : isCurrent ? (
                      <Badge tone="teal">Up next</Badge>
                    ) : null}
                  </li>
                )
              })}
            </ol>
          </section>

          <section className="profile-section">
            <h2>What you will be able to do</h2>
            <ul className="stack stack--sm" style={{ listStyle: 'none', padding: 0 }}>
              {module.lessons.map((lesson) => (
                <li key={lesson.id} className="cluster" style={{ alignItems: 'flex-start' }}>
                  <CheckCircle2
                    size={18}
                    aria-hidden="true"
                    style={{ color: 'var(--teal-700)', marginTop: 3, flexShrink: 0 }}
                  />
                  <span>{lesson.summary}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="with-rail__rail">
          <div className="sticky-card">
            <h2>Module details</h2>
            <ul className="sticky-card__list">
              <li>
                <Clock size={16} aria-hidden="true" />
                {formatDuration(module.durationMins)} of reading
              </li>
              <li>
                <BookOpen size={16} aria-hidden="true" />
                {module.lessons.length} lessons
              </li>
              <li>
                <Layers size={16} aria-hidden="true" />
                {module.level}
              </li>
              <li>
                <CheckCircle2 size={16} aria-hidden="true" />
                Progress saved in this browser
              </li>
            </ul>
            <Link className="btn btn--secondary btn--block" to={inApp ? startPath : gatedStart}>
              {inApp ? ctaLabel : 'Sign in to start'}
            </Link>
          </div>
        </aside>
      </div>

      <section className="section section--tight">
        <h2 style={{ marginBottom: 'var(--space-5)' }}>Related modules</h2>
        <div className="module-grid">
          {related.map((item) => (
            <ModuleCard
              key={item.id}
              module={item}
              href={`${base}/learn/${item.slug}`}
              progressPercent={
                inApp ? getModuleProgressPercent(state, item) : undefined
              }
              completedLessons={
                inApp ? getModuleCompletedCount(state, item) : undefined
              }
            />
          ))}
        </div>
      </section>
    </>
  )

  if (inApp) return content

  return (
    <>
      <section className="section section--tight">
        <Container>{content}</Container>
      </section>
    </>
  )
}
