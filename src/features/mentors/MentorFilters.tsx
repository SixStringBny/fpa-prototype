import { FilterGroup, FilterPanel } from '../../components/shared/FilterPanel'

export type AvailabilityFilter = 'any' | 'weekdays' | 'evenings' | 'weekends'
export type SessionTypeFilter = 'any' | 'free' | 'paid'

type MentorFiltersProps = {
  expertiseOptions: string[]
  selectedExpertise: string[]
  onToggleExpertise: (value: string) => void
  sessionType: SessionTypeFilter
  onChangeSessionType: (value: SessionTypeFilter) => void
  availability: AvailabilityFilter
  onChangeAvailability: (value: AvailabilityFilter) => void
  onClear: () => void
  clearDisabled: boolean
}

const availabilityOptions: Array<{ value: AvailabilityFilter; label: string }> = [
  { value: 'any', label: 'Any time' },
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'evenings', label: 'Evenings' },
  { value: 'weekends', label: 'Weekends' },
]

const sessionOptions: Array<{ value: SessionTypeFilter; label: string }> = [
  { value: 'any', label: 'Any session' },
  { value: 'free', label: 'Free intro' },
  { value: 'paid', label: 'Paid' },
]

export function MentorFilters({
  expertiseOptions,
  selectedExpertise,
  onToggleExpertise,
  sessionType,
  onChangeSessionType,
  availability,
  onChangeAvailability,
  onClear,
  clearDisabled,
}: MentorFiltersProps) {
  return (
    <FilterPanel onClear={onClear} clearDisabled={clearDisabled}>
      <FilterGroup legend="Expertise">
        <div className="filter-chips">
          {expertiseOptions.map((option) => {
            const active = selectedExpertise.includes(option)
            return (
              <button
                key={option}
                type="button"
                className={`filter-chip${active ? ' filter-chip--active' : ''}`}
                aria-pressed={active}
                onClick={() => onToggleExpertise(option)}
              >
                {option}
              </button>
            )
          })}
        </div>
      </FilterGroup>

      <FilterGroup legend="Session type">
        <div className="filter-chips">
          {sessionOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`filter-chip${sessionType === option.value ? ' filter-chip--active' : ''}`}
              aria-pressed={sessionType === option.value}
              onClick={() => onChangeSessionType(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup legend="Availability">
        <div className="filter-chips">
          {availabilityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`filter-chip${availability === option.value ? ' filter-chip--active' : ''}`}
              aria-pressed={availability === option.value}
              onClick={() => onChangeAvailability(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </FilterGroup>
    </FilterPanel>
  )
}
