import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, Send } from 'lucide-react'
import { getMentorById } from '../../data/mentors'
import { formatDateMedium } from '../../lib/dates'
import { useDemo } from '../../state/demo-state'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Tag } from '../../components/ui/Tag'
import { useToast } from '../../components/ui/Toast'
import { NotFoundPage } from '../marketing/NotFoundPage'
import { ProjectThumb } from './ProjectThumb'

const statusLabel = {
  draft: 'Draft',
  submitted: 'In review',
  reviewed: 'Feedback ready',
} as const

export function PortfolioProjectPage() {
  const { projectId } = useParams()
  const { state, submitPortfolioProject } = useDemo()
  const { toast } = useToast()
  const project = state.portfolioProjects.find((item) => item.id === projectId)

  if (!project) return <NotFoundPage />

  const feedback = project.feedback
  const mentor = feedback ? getMentorById(feedback.mentorId) : undefined

  const submit = () => {
    submitPortfolioProject(project.id)
    toast(
      'Project submitted. In this prototype, feedback appears immediately.',
    )
  }

  return (
    <>
      <Link className="inline-link" to="/app/portfolio">
        <ArrowLeft size={15} aria-hidden="true" />
        Back to portfolio
      </Link>

      <div className="detail-layout">
        <article className="detail-main">
          <span className="eyebrow">Portfolio project</span>
          <h1>{project.title}</h1>
          <p className="detail-lede">{project.summary}</p>

          <div className="detail-meta">
            <span>
              <Badge
                tone={
                  project.status === 'reviewed'
                    ? 'success'
                    : project.status === 'submitted'
                      ? 'warning'
                      : 'neutral'
                }
              >
                {statusLabel[project.status]}
              </Badge>
            </span>
            <span>{project.role}</span>
            {project.submittedAt ? (
              <span>
                <CalendarDays size={15} aria-hidden="true" />
                Submitted {formatDateMedium(new Date(project.submittedAt))}
              </span>
            ) : null}
          </div>

          <div className="project-detail-thumb">
            <ProjectThumb
              title={project.title}
              accent={project.accent}
              size="lg"
            />
          </div>

          <section className="detail-section">
            <h2>Skills</h2>
            <div className="tag-list">
              {project.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </section>

          {project.status === 'draft' ? (
            <section className="detail-section">
              <h2>Ready for a review?</h2>
              <p>
                Submitting sends this project to a mentor for structured
                feedback. In the real product this would take a few days; in the
                prototype, the feedback appears immediately so you can test the
                loop.
              </p>
              <Button onClick={submit} icon={<Send size={17} />}>
                Submit for review
              </Button>
            </section>
          ) : null}

          {project.status === 'submitted' ? (
            <section className="detail-section">
              <h2>In review</h2>
              <p>
                Lucas Meyer is reviewing this project. Feedback will appear here
                when it is ready.
              </p>
            </section>
          ) : null}

          {project.status === 'reviewed' && feedback && mentor ? (
            <section className="feedback-panel" aria-labelledby="feedback-heading">
              <div className="feedback-panel__header">
                <Avatar src={mentor.avatar} alt="" size="md" />
                <div>
                  <p className="feedback-panel__reviewer">
                    Reviewed by {mentor.name}
                  </p>
                  <p className="feedback-panel__role">
                    {mentor.role} · {mentor.company}
                  </p>
                </div>
                <Badge tone="success">Feedback ready</Badge>
              </div>

              <h2 id="feedback-heading" className="feedback-panel__title">
                Mentor summary
              </h2>
              <p className="feedback-panel__summary">{feedback.summary}</p>

              <div className="feedback-block">
                <h3>Rubric</h3>
                <ul className="rubric-list">
                  {feedback.rubric.map((item) => (
                    <li className="rubric-item" key={item.criterion}>
                      <div className="rubric-item__top">
                        <span>{item.criterion}</span>
                        <span>{item.score} / 5</span>
                      </div>
                      <div className="rubric-bar" aria-hidden="true">
                        <span style={{ width: `${item.score * 20}%` }} />
                      </div>
                      <p>{item.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="feedback-block">
                <h3>Annotations</h3>
                <ul className="annotation-list">
                  {feedback.annotations.map((annotation) => (
                    <li key={annotation.area}>
                      <strong>{annotation.area}</strong>
                      <span>{annotation.note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="feedback-block">
                <h3>Revision history</h3>
                <ol className="revision-list">
                  {feedback.revisionHistory.map((revision) => (
                    <li key={revision.version}>
                      <div className="revision-list__top">
                        <strong>Version {revision.version}</strong>
                        <span>{formatDateMedium(new Date(revision.date))}</span>
                      </div>
                      <p>{revision.note}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          ) : null}
        </article>

        <aside className="detail-aside" aria-label="Project details">
          <div className="action-card">
            <p className="action-card__label">Project status</p>
            <p className="action-card__price">{statusLabel[project.status]}</p>
            <ul className="plain-list">
              <li>
                <strong>Role</strong>
                <span>{project.role}</span>
              </li>
              <li>
                <strong>Skills</strong>
                <span>{project.skills.join(', ')}</span>
              </li>
              {project.submittedAt ? (
                <li>
                  <strong>Submitted</strong>
                  <span>{formatDateMedium(new Date(project.submittedAt))}</span>
                </li>
              ) : null}
            </ul>

            {project.status === 'draft' ? (
              <Button block onClick={submit} icon={<Send size={17} />}>
                Submit for review
              </Button>
            ) : (
              <p className="text-sm text-muted">
                <CheckCircle2
                  size={14}
                  aria-hidden="true"
                  style={{ display: 'inline', marginRight: 4 }}
                />
                {project.status === 'reviewed'
                  ? 'Use the annotations to plan your next revision.'
                  : 'Feedback will appear here when the review is complete.'}
              </p>
            )}

            <p className="text-xs text-muted">
              <Clock size={13} aria-hidden="true" style={{ display: 'inline', marginRight: 4 }} />
              Prototype reviews are immediate and fictional.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
