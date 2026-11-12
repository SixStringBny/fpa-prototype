import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Circle, Target } from 'lucide-react'
import { useDemo } from '../../state/demo-state'
import { getProfileCompleteness, getRoadmapMilestones } from '../../state/selectors'
import { PageHeader } from '../../components/layout/PageHeader'
import { Badge } from '../../components/ui/Badge'
import { ProgressBar } from '../../components/ui/ProgressBar'

export function RoadmapPage() {
  const { state } = useDemo()
  const milestones = getRoadmapMilestones(state)
  const completed = milestones.filter((milestone) => milestone.complete).length
  const currentIndex = milestones.findIndex((milestone) => !milestone.complete)
  const completeness = getProfileCompleteness(state.profile).percent

  return (
    <>
      <PageHeader
        eyebrow="Your first steps"
        title="Your path"
        description="A short path from getting ready to showing your work. Complete a step, then come back to see what is next."
        actions={
          <Link className="btn btn--secondary" to="/app/profile">
            <Target size={17} aria-hidden="true" />
            Update your goals
          </Link>
        }
      />

      <section className="roadmap-summary" aria-label="Path progress">
        <div>
          <p className="roadmap-summary__label">Path progress</p>
          <p className="roadmap-summary__value">
            {completed} of {milestones.length} steps complete
          </p>
        </div>
        <div className="roadmap-summary__bar">
          <ProgressBar
            value={(completed / milestones.length) * 100}
            label="Path progress"
            showValue
          />
        </div>
        <p className="text-sm text-muted">
          Your goals shape this path. You can change them in My Profile.
        </p>
      </section>

      <ol className="roadmap-list">
        {milestones.map((milestone, index) => {
          const isCurrent = index === currentIndex
          return (
            <li
              key={milestone.id}
              className={`roadmap-step${milestone.complete ? ' roadmap-step--done' : ''}${isCurrent ? ' roadmap-step--current' : ''}`}
            >
              <span className="roadmap-step__marker" aria-hidden="true">
                {milestone.complete ? (
                  <CheckCircle2 size={22} />
                ) : (
                  <Circle size={22} />
                )}
              </span>
              <div className="roadmap-step__body">
                <div className="roadmap-step__top">
                  <h2>{milestone.title}</h2>
                  {milestone.complete ? (
                    <Badge tone="success">Done</Badge>
                  ) : isCurrent ? (
                    <Badge tone="blue">Next step</Badge>
                  ) : (
                    <Badge tone="neutral">Up next</Badge>
                  )}
                </div>
                <p>{milestone.description}</p>
                <Link className="roadmap-step__link" to={milestone.href}>
                  {milestone.complete ? 'Revisit' : 'Open'}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </li>
          )
        })}
      </ol>

      {completeness < 80 ? (
        <div className="notice" style={{ marginTop: 'var(--space-6)' }}>
          <Target size={18} aria-hidden="true" />
          <div>
            <strong>Your profile is {completeness}% complete.</strong> Adding a
            discipline, bio and portfolio link helps mentors prepare for your
            first session.
          </div>
        </div>
      ) : null}
    </>
  )
}
