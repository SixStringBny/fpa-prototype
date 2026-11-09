import { useMemo, useState } from 'react'
import { BookOpen, SlidersHorizontal } from 'lucide-react'
import { moduleLevels, modules, moduleTopics } from '../../data/modules'
import { asset } from '../../lib/assets'
import { useDemo } from '../../state/demo-state'
import {
  getModuleCompletedCount,
  getModuleProgressPercent,
} from '../../state/selectors'
import { ModuleCard } from '../../components/shared/ModuleCard'
import { SearchInput } from '../../components/shared/SearchInput'
import { PageHeader } from '../../components/layout/PageHeader'
import { Container } from '../../components/layout/Container'
import { EmptyState } from '../../components/ui/EmptyState'
import { Button } from '../../components/ui/Button'

type LearnPageProps = {
  inApp?: boolean
}

export function LearnPage({ inApp = false }: LearnPageProps) {
  const { state } = useDemo()
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('All')
  const [level, setLevel] = useState('All')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return modules.filter((module) => {
      const matchesQuery =
        !term ||
        module.title.toLowerCase().includes(term) ||
        module.summary.toLowerCase().includes(term) ||
        module.topic.toLowerCase().includes(term)
      const matchesTopic = topic === 'All' || module.topic === topic
      const matchesLevel = level === 'All' || module.level === level
      return matchesQuery && matchesTopic && matchesLevel
    })
  }, [query, topic, level])

  const reset = () => {
    setQuery('')
    setTopic('All')
    setLevel('All')
  }

  const base = inApp ? '/app' : ''

  const catalogue = (
    <>
      <div className="toolbar" role="search">
        <div className="toolbar__search">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Search modules"
            placeholder="Search modules by title or topic"
          />
        </div>
        <label className="visually-hidden" htmlFor="level-filter">
          Filter by level
        </label>
        <select
          id="level-filter"
          className="select"
          style={{ width: 'auto' }}
          value={level}
          onChange={(event) => setLevel(event.target.value)}
        >
          <option value="All">All levels</option>
          {moduleLevels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <span className="toolbar__count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'module' : 'modules'}
        </span>
      </div>

      <div className="filter-chips" style={{ marginBottom: 'var(--space-6)' }}>
        <button
          type="button"
          className={`filter-chip${topic === 'All' ? ' filter-chip--active' : ''}`}
          onClick={() => setTopic('All')}
          aria-pressed={topic === 'All'}
        >
          <SlidersHorizontal size={13} aria-hidden="true" />
          All topics
        </button>
        {moduleTopics.map((item) => (
          <button
            key={item}
            type="button"
            className={`filter-chip${topic === item ? ' filter-chip--active' : ''}`}
            onClick={() => setTopic(item)}
            aria-pressed={topic === item}
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="module-grid">
          {filtered.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              href={`${base}/learn/${module.slug}`}
              progressPercent={
                inApp ? getModuleProgressPercent(state, module) : undefined
              }
              completedLessons={
                inApp ? getModuleCompletedCount(state, module) : undefined
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BookOpen size={24} aria-hidden="true" />}
          title="No modules match those filters"
          description="Try a different topic, level or search term."
          action={
            <Button variant="secondary" onClick={reset}>
              Clear filters
            </Button>
          }
        />
      )}
    </>
  )

  if (inApp) {
    return (
      <>
        <PageHeader
          eyebrow="Self-paced learning"
          title="Learn"
          description="Practical modules for the business side of creative work. Pick up where you left off or start something new."
        />
        {catalogue}
      </>
    )
  }

  return (
    <>
      <section className="page-hero">
        <Container className="page-hero__inner">
          <div>
            <span className="eyebrow">Learn at your own pace</span>
            <h1>Everything you need to become freelance-ready</h1>
            <p>
              Six practical modules covering clients, pricing, briefs,
              portfolios, projects and admin. Written for design and creative
              graduates, not business school.
            </p>
            <div className="page-hero__actions">
              <a className="btn btn--primary btn--lg" href="#catalogue">
                Browse modules
              </a>
            </div>
          </div>
          <div className="page-hero__media">
            <img
              src={asset('/images/hero-learn.webp')}
              alt="A group of graduates working together at a table with laptops and notebooks"
            />
          </div>
        </Container>
      </section>

      <section className="section" id="catalogue">
        <Container>{catalogue}</Container>
      </section>
    </>
  )
}
