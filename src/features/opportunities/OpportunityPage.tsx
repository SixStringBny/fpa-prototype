import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Wallet,
} from 'lucide-react'
import {
  getOpportunityBySlug,
  opportunityTypeLabel,
} from '../../data/opportunities'
import { formatDateMedium } from '../../lib/dates'
import { formatZar } from '../../lib/format'
import { useDemo } from '../../state/demo-state'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Tag } from '../../components/ui/Tag'
import { useToast } from '../../components/ui/Toast'
import { NotFoundPage } from '../marketing/NotFoundPage'

export function OpportunityPage() {
  const { slug } = useParams()
  const opportunity = getOpportunityBySlug(slug)
  const { state, saveOpportunity, unsaveOpportunity, applyToOpportunity } =
    useDemo()
  const { toast } = useToast()

  if (!opportunity) return <NotFoundPage />

  const saved = state.savedOpportunityIds.includes(opportunity.id)
  const applied = state.appliedOpportunityIds.includes(opportunity.id)

  const toggleSave = () => {
    if (saved) {
      unsaveOpportunity(opportunity.id)
      toast(`${opportunity.title} removed from saved opportunities.`)
    } else {
      saveOpportunity(opportunity.id)
      toast(`${opportunity.title} saved.`)
    }
  }

  const apply = () => {
    if (applied) return
    applyToOpportunity(opportunity.id)
    toast('Application sent. This is a prototype — no real client is contacted.')
  }

  return (
    <>
      <Link className="inline-link" to="/app/opportunities">
        <ArrowLeft size={15} aria-hidden="true" />
        Back to opportunities
      </Link>

      <div className="detail-layout">
        <article className="detail-main">
          <span className="eyebrow">{opportunityTypeLabel(opportunity.type)}</span>
          <h1>{opportunity.title}</h1>
          <p className="detail-lede">{opportunity.summary}</p>

          <div className="detail-meta">
            <span>
              <MapPin size={15} aria-hidden="true" />
              {opportunity.client}
            </span>
            <span>{opportunity.discipline}</span>
            <span>{opportunity.level}</span>
            <span>
              <CalendarDays size={15} aria-hidden="true" />
              Apply by {formatDateMedium(new Date(opportunity.deadline))}
            </span>
          </div>

          <section className="detail-section">
            <h2>The brief</h2>
            <p>{opportunity.description}</p>
          </section>

          <section className="detail-section">
            <h2>What you will produce</h2>
            <ul className="check-list">
              {opportunity.deliverables.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="detail-section">
            <h2>Skills you will use</h2>
            <div className="tag-list">
              {opportunity.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h2>How to use this brief</h2>
            <ol className="ordered-list">
              <li>Read the brief and note the constraints.</li>
              <li>Create a response and save it as a portfolio project.</li>
              <li>Submit it for a structured review.</li>
              <li>Apply here when you have something to show.</li>
            </ol>
          </section>
        </article>

        <aside className="detail-aside" aria-label="Opportunity actions">
          <div className="action-card">
            <Badge tone={opportunity.paid ? 'success' : 'blue'}>
              {opportunity.paid ? 'Paid opportunity' : 'Practice brief'}
            </Badge>
            <p className="action-card__price">
              {opportunity.paid
                ? formatZar(opportunity.priceZar ?? 0)
                : 'No payment — build evidence'}
            </p>
            <p className="text-sm text-muted">
              {opportunity.paid
                ? 'Fictional budget for this prototype brief.'
                : 'Use the outcome in your portfolio and submit it for feedback.'}
            </p>

            <div className="action-card__meta">
              <span>
                <Wallet size={15} aria-hidden="true" />
                {opportunity.paid ? 'Paid' : 'Practice'}
              </span>
              <span>
                <CalendarDays size={15} aria-hidden="true" />
                {formatDateMedium(new Date(opportunity.deadline))}
              </span>
            </div>

            <div className="action-card__actions">
              <Button
                block
                size="lg"
                onClick={apply}
                disabled={applied}
                icon={<CheckCircle2 size={18} />}
              >
                {applied ? 'Application sent' : 'Apply for this brief'}
              </Button>
              <Button
                block
                variant="secondary"
                onClick={toggleSave}
                icon={
                  saved ? (
                    <BookmarkCheck size={17} />
                  ) : (
                    <Bookmark size={17} />
                  )
                }
              >
                {saved ? 'Saved' : 'Save for later'}
              </Button>
            </div>

            <p className="text-xs text-muted">
              This is a mock application. No real client, payment or placement
              is involved.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
