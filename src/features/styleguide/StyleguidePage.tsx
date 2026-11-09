import { useState } from 'react'
import { BookOpen, CalendarDays, CheckCircle2 } from 'lucide-react'
import { modules } from '../../data/modules'
import { mentors } from '../../data/mentors'
import { useDemo } from '../../state/demo-state'
import { getModuleProgressPercent } from '../../state/selectors'
import { Container } from '../../components/layout/Container'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Checkbox } from '../../components/ui/Checkbox'
import { Dialog } from '../../components/ui/Dialog'
import { EmptyState } from '../../components/ui/EmptyState'
import { TextField, TextAreaField } from '../../components/ui/Field'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { SelectField } from '../../components/ui/Select'
import { Tag } from '../../components/ui/Tag'
import { useToast } from '../../components/ui/Toast'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ModuleCard } from '../../components/shared/ModuleCard'
import { MentorCard } from '../../components/shared/MentorCard'
import { Stars } from '../../components/shared/Stars'

const swatches = [
  ['navy-900', '#0E1830', 'var(--navy-900)'],
  ['navy-800', '#16243D', 'var(--navy-800)'],
  ['teal-500', '#3EC6B0', 'var(--teal-500)'],
  ['teal-100', '#DDF6F1', 'var(--teal-100)'],
  ['purple-500', '#6C4EE3', 'var(--purple-500)'],
  ['amber-500', '#F2B84B', 'var(--amber-500)'],
  ['blue-600', '#1570EF', 'var(--blue-600)'],
  ['rose-600', '#C01048', 'var(--rose-600)'],
  ['green-600', '#067647', 'var(--green-600)'],
  ['ink-900', '#101828', 'var(--ink-900)'],
  ['ink-600', '#667085', 'var(--ink-600)'],
  ['canvas', '#F5F6F8', 'var(--canvas)'],
]

export function StyleguidePage() {
  const { state, saveMentor, unsaveMentor } = useDemo()
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <section className="section">
      <Container>
        <div className="styleguide">
          <header>
            <span className="eyebrow">Internal</span>
            <h1>Styleguide</h1>
            <p className="text-muted mt-2">
              Tokens, primitives and shared components. This page is not linked
              in the navigation.
            </p>
          </header>

          <section className="styleguide-section">
            <h2>Colour</h2>
            <p>Core palette. Components consume tokens, not hex values.</p>
            <div className="swatch-grid">
              {swatches.map(([name, hex, token]) => (
                <div className="swatch" key={name}>
                  <div
                    className="swatch__color"
                    style={{ background: token }}
                    aria-hidden="true"
                  />
                  <div className="swatch__label">
                    <strong>{name}</strong>
                    {hex}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="styleguide-section">
            <h2>Typography</h2>
            <p>Archivo Variable for display, Inter Variable for body.</p>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: 'var(--ink-900)',
              }}
            >
              Display heading one
            </div>
            <h2>Display heading two</h2>
            <h3>Display heading three</h3>
            <p className="mt-4">
              Body copy uses a 1.6 line height for comfortable reading. Links
              look like <a className="inline-link" href="#main">this</a>.
            </p>
          </section>

          <section className="styleguide-section">
            <h2>Buttons</h2>
            <div className="styleguide-row">
              <Button>Primary</Button>
              <Button variant="navy">Navy</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="danger-ghost">Danger ghost</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="styleguide-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button variant="primary" icon={<CheckCircle2 size={17} />}>
                With icon
              </Button>
            </div>
          </section>

          <section className="styleguide-section">
            <h2>Badges and tags</h2>
            <div className="styleguide-row">
              <Badge>Neutral</Badge>
              <Badge tone="teal">Teal</Badge>
              <Badge tone="purple">Purple</Badge>
              <Badge tone="amber">Amber</Badge>
              <Badge tone="blue">Blue</Badge>
              <Badge tone="rose">Rose</Badge>
              <Badge tone="green">Green</Badge>
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="danger">Danger</Badge>
              <Badge tone="navy">Navy</Badge>
            </div>
            <div className="styleguide-row">
              <Tag>Default tag</Tag>
              <Tag accent>Accent tag</Tag>
            </div>
          </section>

          <section className="styleguide-section">
            <h2>Avatars</h2>
            <div className="styleguide-row">
              <Avatar src={mentors[0]?.avatar ?? ''} alt="" size="xs" />
              <Avatar src={mentors[0]?.avatar ?? ''} alt="" size="sm" />
              <Avatar src={mentors[0]?.avatar ?? ''} alt="" size="md" />
              <Avatar src={mentors[0]?.avatar ?? ''} alt="" size="lg" />
            </div>
            <div className="styleguide-row">
              <Stars rating={4.9} reviewCount={52} />
            </div>
          </section>

          <section className="styleguide-section">
            <h2>Progress</h2>
            <div className="stack" style={{ maxWidth: 480 }}>
              <ProgressBar value={0} label="Empty progress" showValue />
              <ProgressBar value={35} label="Partial progress" showValue />
              <ProgressBar value={100} label="Complete progress" showValue />
            </div>
          </section>

          <section className="styleguide-section">
            <h2>Forms</h2>
            <div className="form-grid form-grid--two" style={{ maxWidth: 760 }}>
              <TextField
                id="style-text"
                label="Text field"
                placeholder="A value"
                hint="Helpful context sits below the field."
              />
              <TextField
                id="style-error"
                label="Error state"
                defaultValue="Not an email"
                error="Enter a valid email address."
              />
              <SelectField
                id="style-select"
                label="Select"
                options={[
                  { value: 'one', label: 'Option one' },
                  { value: 'two', label: 'Option two' },
                ]}
              />
              <div>
                <Checkbox id="style-check" label="A checkbox label" />
              </div>
            </div>
            <div style={{ marginTop: 'var(--space-5)', maxWidth: 480 }}>
              <TextAreaField
                id="style-textarea"
                label="Textarea"
                placeholder="Write something…"
                rows={3}
              />
            </div>
          </section>

          <section className="styleguide-section">
            <h2>Dialogs and toasts</h2>
            <p>
              Native <code>&lt;dialog&gt;</code> with focus trapping and Escape
              handling.
            </p>
            <div className="styleguide-row">
              <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
              <Button
                variant="secondary"
                onClick={() => toast('This is a success toast.')}
              >
                Show success toast
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  toast('This is an informational message.', 'info')
                }
              >
                Show info toast
              </Button>
            </div>
          </section>

          <section className="styleguide-section">
            <h2>Cards and empty states</h2>
            <div className="feature-grid feature-grid--two">
              <Card padded>
                <h3 className="card__title">Card heading</h3>
                <p className="mt-2 text-muted">
                  A standard padded card with a soft border and low shadow.
                </p>
              </Card>
              <Card padded navy>
                <h3 className="card__title">Navy card</h3>
                <p className="mt-2">
                  Used for high-emphasis surfaces and summaries.
                </p>
              </Card>
            </div>
            <div className="mt-6">
              <EmptyState
                icon={<CalendarDays size={22} aria-hidden="true" />}
                title="Empty state example"
                description="Short explanation of why this area is empty and what to do next."
                action={<Button variant="secondary">Primary action</Button>}
              />
            </div>
          </section>

          <section className="styleguide-section">
            <h2>Loading state</h2>
            <div className="feature-grid">
              {[0, 1, 2].map((item) => (
                <div className="skeleton-card" key={item}>
                  <div className="skeleton skeleton-avatar" />
                  <div className="skeleton skeleton-line" />
                  <div className="skeleton skeleton-line skeleton-line--short" />
                  <div className="skeleton skeleton-line" />
                </div>
              ))}
            </div>
          </section>

          <section className="styleguide-section">
            <h2>Data preview</h2>
            <p>Real seed content rendered through shared components.</p>
            <div className="module-grid">
              {modules.slice(0, 3).map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  href={`/app/learn/${module.slug}`}
                  progressPercent={getModuleProgressPercent(state, module)}
                  completedLessons={0}
                />
              ))}
            </div>
            <div className="mentor-grid mt-8">
              {mentors.slice(0, 2).map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  href={`/app/mentors/${mentor.slug}`}
                  saved={state.savedMentorIds.includes(mentor.id)}
                  onToggleSave={() =>
                    state.savedMentorIds.includes(mentor.id)
                      ? unsaveMentor(mentor.id)
                      : saveMentor(mentor.id)
                  }
                />
              ))}
            </div>
          </section>

          <section className="styleguide-section">
            <SectionHeading
              eyebrow="Section heading"
              title="Shared section heading"
              description="Used to introduce a band of content on marketing and app pages."
              action={<Button variant="secondary" icon={<BookOpen size={16} />}>Action</Button>}
            />
          </section>
        </div>
      </Container>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Dialog example"
        description="Escape closes this dialog. Focus is trapped by the browser."
        footer={
          <>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p>
          Dialog content sits here. Use it for confirmations, filters on mobile,
          or short forms.
        </p>
      </Dialog>
    </section>
  )
}
