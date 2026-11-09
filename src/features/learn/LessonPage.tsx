import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react'
import { getLessonBySlug, getModuleBySlug } from '../../data/modules'
import { useDemo } from '../../state/demo-state'
import {
  getModuleCompletedCount,
  isLessonComplete,
} from '../../state/selectors'
import { Badge } from '../../components/ui/Badge'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { useToast } from '../../components/ui/Toast'
import { ContentBlocks } from './ContentBlocks'
import { NotFoundPage } from '../marketing/NotFoundPage'

export function LessonPage() {
  const { moduleSlug, lessonSlug } = useParams()
  const module = getModuleBySlug(moduleSlug)
  const lesson = module ? getLessonBySlug(module, lessonSlug) : undefined
  const { state, completeLesson, touchLesson } = useDemo()
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (module && lesson) touchLesson(module.id, lesson.id)
  }, [module, lesson, touchLesson])

  if (!module || !lesson) return <NotFoundPage />

  const index = module.lessons.findIndex((item) => item.id === lesson.id)
  const previous = index > 0 ? module.lessons[index - 1] : undefined
  const next = index < module.lessons.length - 1 ? module.lessons[index + 1] : undefined
  const complete = isLessonComplete(state, module.id, lesson.id)
  const completedCount = getModuleCompletedCount(state, module)
  const percent = Math.round((completedCount / module.lessons.length) * 100)

  const lessonHref = (slug: string) =>
    `/app/learn/${module.slug}/${slug}`

  const markAndContinue = () => {
    completeLesson(module.id, lesson.id)
    if (next) {
      toast('Lesson complete. On to the next one.')
      navigate(lessonHref(next.slug))
    } else {
      toast('Module complete. Nicely done.')
      navigate(`/app/learn/${module.slug}`)
    }
  }

  return (
    <div className="lesson-player">
      <div className="lesson-player__top">
        <Link className="inline-link" to={`/app/learn/${module.slug}`}>
          <ArrowLeft
            size={16}
            aria-hidden="true"
            style={{ display: 'inline', marginRight: 6 }}
          />
          {module.title}
        </Link>
        <div className="lesson-player__progress">
          <ProgressBar
            value={percent}
            label={`${module.title} progress`}
            showValue
            size="sm"
          />
        </div>
      </div>

      <header className="lesson-player__header">
        <div className="cluster">
          <Badge tone="teal">
            Lesson {index + 1} of {module.lessons.length}
          </Badge>
          {complete ? <Badge tone="success">Completed</Badge> : null}
        </div>
        <h1>{lesson.title}</h1>
        <p>{lesson.summary}</p>
        <div className="lesson-player__meta">
          <span>
            <Clock size={16} aria-hidden="true" />
            {lesson.durationMins} min read
          </span>
          <span>
            <Sparkles size={16} aria-hidden="true" />
            {module.title}
          </span>
        </div>
      </header>

      <ContentBlocks blocks={lesson.blocks} />

      <section className="lesson-takeaways" aria-labelledby="takeaways-heading">
        <h2 id="takeaways-heading">Three things to take away</h2>
        <ul>
          {lesson.takeaways.map((takeaway) => (
            <li key={takeaway}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="lesson-nav">
        <div className="lesson-nav__group">
          {previous ? (
            <Link
              className="btn btn--secondary"
              to={lessonHref(previous.slug)}
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Previous
            </Link>
          ) : (
            <Link className="btn btn--secondary" to={`/app/learn/${module.slug}`}>
              <ArrowLeft size={17} aria-hidden="true" />
              Module overview
            </Link>
          )}
        </div>

        <div className="lesson-nav__group">
          {complete ? (
            <span className="lesson-complete-note">
              <CheckCircle2 size={18} aria-hidden="true" />
              You have completed this lesson
            </span>
          ) : null}
          {next ? (
            <button type="button" className="btn btn--navy" onClick={markAndContinue}>
              {complete ? 'Next lesson' : 'Mark complete & continue'}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          ) : (
            <button type="button" className="btn btn--primary" onClick={markAndContinue}>
              {complete ? 'Finish module' : 'Mark complete & finish'}
              <CheckCircle2 size={17} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
