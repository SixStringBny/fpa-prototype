import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, FolderOpen } from 'lucide-react'
import type { OpportunityType } from '../../types'
import {
  opportunities,
  opportunityDisciplines,
  opportunityTypes,
} from '../../data/opportunities'
import { useDemo } from '../../state/demo-state'
import { PageHeader } from '../../components/layout/PageHeader'
import { SearchInput } from '../../components/shared/SearchInput'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { OpportunityCard } from './OpportunityCard'

type TypeFilter = 'all' | OpportunityType
type PaidFilter = 'all' | 'paid' | 'free'

export function OpportunitiesPage() {
  const { state, saveOpportunity, unsaveOpportunity } = useDemo()
  const { toast } = useToast()
  const [query, setQuery] = useState('')
  const [type, setType] = useState<TypeFilter>('all')
  const [discipline, setDiscipline] = useState('all')
  const [paid, setPaid] = useState<PaidFilter>('all')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return opportunities.filter((opportunity) => {
      const haystack = [
        opportunity.title,
        opportunity.client,
        opportunity.discipline,
        opportunity.summary,
        opportunity.skills.join(' '),
      ]
        .join(' ')
        .toLowerCase()

      const matchesQuery = !term || haystack.includes(term)
      const matchesType = type === 'all' || opportunity.type === type
      const matchesDiscipline =
        discipline === 'all' || opportunity.discipline === discipline
      const matchesPaid =
        paid === 'all' ||
        (paid === 'paid' && opportunity.paid) ||
        (paid === 'free' && !opportunity.paid)

      return matchesQuery && matchesType && matchesDiscipline && matchesPaid
    })
  }, [query, type, discipline, paid])

  const clearFilters = () => {
    setQuery('')
    setType('all')
    setDiscipline('all')
    setPaid('all')
  }

  const toggleSave = (opportunityId: string, title: string) => {
    if (state.savedOpportunityIds.includes(opportunityId)) {
      unsaveOpportunity(opportunityId)
      toast(`${title} removed from saved opportunities.`)
    } else {
      saveOpportunity(opportunityId)
      toast(`${title} saved. Find it on your dashboard.`)
    }
  }

  const filtersActive =
    query.trim().length > 0 ||
    type !== 'all' ||
    discipline !== 'all' ||
    paid !== 'all'

  return (
    <>
      <PageHeader
        eyebrow="Practice and paid work"
        title="Opportunities"
        description="Practice briefs, internships and entry-level projects. Use them to build evidence, then submit the outcome for portfolio feedback."
        actions={
          <Link className="btn btn--secondary" to="/app/portfolio">
            <FolderOpen size={17} aria-hidden="true" />
            My portfolio
          </Link>
        }
      />

      <div className="toolbar" role="search">
        <div className="toolbar__search">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Search opportunities"
            placeholder="Search by title, client or skill"
          />
        </div>
        <label className="visually-hidden" htmlFor="opportunity-type">
          Filter by type
        </label>
        <select
          id="opportunity-type"
          className="select"
          style={{ width: 'auto' }}
          value={type}
          onChange={(event) => setType(event.target.value as TypeFilter)}
        >
          <option value="all">All types</option>
          {opportunityTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <label className="visually-hidden" htmlFor="opportunity-discipline">
          Filter by discipline
        </label>
        <select
          id="opportunity-discipline"
          className="select"
          style={{ width: 'auto' }}
          value={discipline}
          onChange={(event) => setDiscipline(event.target.value)}
        >
          <option value="all">All disciplines</option>
          {opportunityDisciplines.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label className="visually-hidden" htmlFor="opportunity-paid">
          Filter by payment
        </label>
        <select
          id="opportunity-paid"
          className="select"
          style={{ width: 'auto' }}
          value={paid}
          onChange={(event) => setPaid(event.target.value as PaidFilter)}
        >
          <option value="all">Paid or practice</option>
          <option value="paid">Paid</option>
          <option value="free">Practice brief</option>
        </select>
        <span className="toolbar__count" aria-live="polite">
          {filtered.length}{' '}
          {filtered.length === 1 ? 'opportunity' : 'opportunities'}
        </span>
      </div>

      {filtered.length > 0 ? (
        <div className="opportunity-grid">
          {filtered.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              saved={state.savedOpportunityIds.includes(opportunity.id)}
              onToggleSave={() => toggleSave(opportunity.id, opportunity.title)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Briefcase size={24} aria-hidden="true" />}
          title="No opportunities match those filters"
          description="Try a different type, discipline or search term. You can also clear the filters to see everything."
          action={
            <Button variant="secondary" onClick={clearFilters} disabled={!filtersActive}>
              Clear filters
            </Button>
          }
        />
      )}

      <p className="text-sm text-muted" style={{ marginTop: 'var(--space-6)' }}>
        All opportunities, clients and briefs are fictional prototype content.
        Applying sends nothing to a real client.
      </p>
    </>
  )
}
