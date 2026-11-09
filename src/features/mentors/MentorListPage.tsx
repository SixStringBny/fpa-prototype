import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, Users } from 'lucide-react'
import { mentorExpertise, mentors } from '../../data/mentors'
import type { Mentor } from '../../types'
import { useDemo } from '../../state/demo-state'
import { PageHeader } from '../../components/layout/PageHeader'
import { MentorCard } from '../../components/shared/MentorCard'
import { SearchInput } from '../../components/shared/SearchInput'
import { Button } from '../../components/ui/Button'
import { Dialog } from '../../components/ui/Dialog'
import { EmptyState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import {
  MentorFilters,
  type AvailabilityFilter,
  type SessionTypeFilter,
} from './MentorFilters'

function matchesAvailability(
  mentor: Mentor,
  filter: AvailabilityFilter,
): boolean {
  if (filter === 'any') return true
  return mentor.availability.some((rule) => {
    if (filter === 'weekdays') {
      return rule.weekdays.some((day) => day >= 1 && day <= 5)
    }
    if (filter === 'weekends') {
      return rule.weekdays.some((day) => day === 0 || day === 6)
    }
    return rule.times.some((time) => time >= '16:00')
  })
}

type SortOption = 'recommended' | 'rating' | 'experience' | 'sessions'

export function MentorListPage() {
  const { state, saveMentor, unsaveMentor } = useDemo()
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(initialQuery)
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [sessionType, setSessionType] = useState<SessionTypeFilter>('any')
  const [availability, setAvailability] = useState<AvailabilityFilter>('any')
  const [sort, setSort] = useState<SortOption>('recommended')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    const matches = mentors.filter((mentor) => {
      const matchesQuery =
        !term ||
        mentor.name.toLowerCase().includes(term) ||
        mentor.role.toLowerCase().includes(term) ||
        mentor.expertise.some((item) => item.toLowerCase().includes(term))
      const matchesExpertise =
        selectedExpertise.length === 0 ||
        selectedExpertise.some((item) => mentor.expertise.includes(item))
      const matchesSession =
        sessionType === 'any' || mentor.sessionTypes.includes(sessionType)
      return (
        matchesQuery &&
        matchesExpertise &&
        matchesSession &&
        matchesAvailability(mentor, availability)
      )
    })

    return [...matches].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'experience') return b.experienceYears - a.experienceYears
      if (sort === 'sessions') return b.sessionCount - a.sessionCount
      const featured = Number(b.featured) - Number(a.featured)
      return featured !== 0 ? featured : b.rating - a.rating
    })
  }, [query, selectedExpertise, sessionType, availability, sort])

  const toggleExpertise = (value: string) => {
    setSelectedExpertise((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  const clearFilters = () => {
    setSelectedExpertise([])
    setSessionType('any')
    setAvailability('any')
    setQuery('')
    setSearchParams({})
  }

  const filtersActive =
    query.trim().length > 0 ||
    selectedExpertise.length > 0 ||
    sessionType !== 'any' ||
    availability !== 'any'

  const toggleSave = (mentor: Mentor) => {
    if (state.savedMentorIds.includes(mentor.id)) {
      unsaveMentor(mentor.id)
      toast(`${mentor.name} removed from saved mentors.`)
    } else {
      saveMentor(mentor.id)
      toast(`${mentor.name} saved. Find them under Saved.`)
    }
  }

  const filterProps = {
    expertiseOptions: mentorExpertise,
    selectedExpertise,
    onToggleExpertise: toggleExpertise,
    sessionType,
    onChangeSessionType: setSessionType,
    availability,
    onChangeAvailability: setAvailability,
    onClear: clearFilters,
    clearDisabled: !filtersActive,
  }

  return (
    <>
      <PageHeader
        eyebrow="Mentor matching"
        title="Find the right person to ask"
        description="Search by expertise, session type or availability. Save the mentors you want to come back to."
      />

      <div className="mentor-layout">
        <aside className="mentor-layout__rail" aria-label="Mentor filters">
          <MentorFilters {...filterProps} />
        </aside>

        <div className="mentor-layout__results">
          <div className="mentor-layout__toolbar">
            <SearchInput
              value={query}
              onChange={setQuery}
              label="Search mentors"
              placeholder="Search by name, role or expertise"
            />
            <Button
              variant="secondary"
              className="filter-toggle"
              icon={<SlidersHorizontal size={16} />}
              onClick={() => setFiltersOpen(true)}
            >
              Filters
            </Button>
            <label className="visually-hidden" htmlFor="sort-mentors">
              Sort mentors
            </label>
            <select
              id="sort-mentors"
              className="select"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest rated</option>
              <option value="experience">Most experienced</option>
              <option value="sessions">Most sessions</option>
            </select>
          </div>

          <p className="results-count" aria-live="polite">
            <strong>{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'mentor' : 'mentors'} found
            {selectedExpertise.length > 0
              ? ` for ${selectedExpertise.join(', ')}`
              : ''}
          </p>

          {filtered.length > 0 ? (
            <div className="mentor-grid">
              {filtered.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  href={`/app/mentors/${mentor.slug}`}
                  saved={state.savedMentorIds.includes(mentor.id)}
                  onToggleSave={() => toggleSave(mentor)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Users size={24} aria-hidden="true" />}
              title="No mentors match those filters"
              description="Try a broader expertise, a different session type, or clear the filters to see everyone."
              action={
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              }
            />
          )}
        </div>
      </div>

      <Dialog
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filter mentors"
        wide
        footer={
          <Button onClick={() => setFiltersOpen(false)} block>
            Show {filtered.length} {filtered.length === 1 ? 'mentor' : 'mentors'}
          </Button>
        }
      >
        <MentorFilters {...filterProps} />
      </Dialog>
    </>
  )
}
