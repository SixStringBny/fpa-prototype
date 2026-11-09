import { useState, type FormEvent } from 'react'
import { CheckCircle2, MapPin, Plus, X } from 'lucide-react'
import type { LearnerProfile } from '../../types'
import { avatarOptions } from '../../data/user'
import { asset } from '../../lib/assets'
import { useDemo } from '../../state/demo-state'
import { getProfileCompleteness } from '../../state/selectors'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { TextAreaField, TextField } from '../../components/ui/Field'
import { SelectField } from '../../components/ui/Select'
import { useToast } from '../../components/ui/Toast'

const availabilityOptions = [
  { value: 'Weekdays', label: 'Weekdays' },
  { value: 'Evenings', label: 'Evenings' },
  { value: 'Weekends', label: 'Weekends' },
  { value: 'Flexible', label: 'Flexible' },
]

type ChipEditorProps = {
  id: string
  label: string
  hint: string
  values: string[]
  onAdd: (value: string) => void
  onRemove: (value: string) => void
  placeholder: string
}

function ChipEditor({
  id,
  label,
  hint,
  values,
  onAdd,
  onRemove,
  placeholder,
}: ChipEditorProps) {
  const [input, setInput] = useState('')

  const add = () => {
    const value = input.trim()
    if (!value) return
    onAdd(value)
    setInput('')
  }

  return (
    <div className="field">
      <span className="field__label" id={`${id}-label`}>
        {label}
      </span>
      <div className="chip-input">
        <input
          id={id}
          className="input"
          value={input}
          placeholder={placeholder}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-hint`}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              add()
            }
          }}
        />
        <Button variant="secondary" onClick={add} icon={<Plus size={16} />}>
          Add
        </Button>
      </div>
      <p className="field__hint" id={`${id}-hint`}>
        {hint}
      </p>
      {values.length > 0 ? (
        <ul className="chip-list">
          {values.map((value) => (
            <li key={value}>
              <span className="chip">
                {value}
                <button
                  type="button"
                  aria-label={`Remove ${value}`}
                  onClick={() => onRemove(value)}
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function ProfilePage() {
  const { state, updateProfile } = useDemo()
  const { toast } = useToast()
  const [draft, setDraft] = useState<LearnerProfile>(state.profile)
  const [nameError, setNameError] = useState('')

  const completeness = getProfileCompleteness(draft)

  const set = <K extends keyof LearnerProfile>(
    key: K,
    value: LearnerProfile[K],
  ) => setDraft((current) => ({ ...current, [key]: value }))

  const setLink = (key: keyof LearnerProfile['links'], value: string) =>
    setDraft((current) => ({
      ...current,
      links: { ...current.links, [key]: value },
    }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft.name.trim()) {
      setNameError('Add your name so mentors know who they are meeting.')
      return
    }
    setNameError('')
    updateProfile(draft)
    toast('Profile saved. Your changes will persist in this browser.')
  }

  const cancel = () => {
    setDraft(state.profile)
    setNameError('')
    toast('Changes discarded.', 'info')
  }

  return (
    <>
      <div className="profile-header">
        <Avatar src={draft.avatar} alt="" size="lg" />
        <div className="profile-header__body">
          <h1>{draft.name || 'Your profile'}</h1>
          <p className="profile-header__headline">
            {draft.headline || 'Add a headline to introduce yourself.'}
          </p>
          <div className="profile-header__meta">
            {draft.discipline ? (
              <span>
                <Badge tone="teal">{draft.discipline}</Badge>
              </span>
            ) : null}
            {draft.location ? (
              <span>
                <MapPin size={15} aria-hidden="true" />
                {draft.location}
              </span>
            ) : null}
            <span>
              <CheckCircle2 size={15} aria-hidden="true" />
              {draft.availability}
            </span>
          </div>
        </div>
        <div className="profile-completeness">
          <CheckCircle2 size={18} aria-hidden="true" />
          {completeness.percent}% complete
        </div>
      </div>

      {completeness.missing.length > 0 ? (
        <div className="notice" style={{ marginBottom: 'var(--space-6)' }}>
          <CheckCircle2 size={18} aria-hidden="true" />
          <div>
            <strong>Finish your profile:</strong>{' '}
            {completeness.missing.slice(0, 4).join(' · ')}
          </div>
        </div>
      ) : null}

      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        <section className="profile-section-card">
          <h2>Your photo</h2>
          <p className="profile-section-card__hint">
            Pick an avatar for this prototype. Your photo is stored locally.
          </p>
          <div className="avatar-picker" role="group" aria-label="Choose an avatar">
            {avatarOptions.map((option) => (
              <button
                key={option.src}
                type="button"
                className={`avatar-option${draft.avatar === option.src ? ' avatar-option--selected' : ''}`}
                aria-pressed={draft.avatar === option.src}
                aria-label={`Use the ${option.label} avatar`}
                onClick={() => set('avatar', option.src)}
              >
                <img src={asset(option.src)} alt="" />
              </button>
            ))}
          </div>
        </section>

        <section className="profile-section-card">
          <h2>The basics</h2>
          <p className="profile-section-card__hint">
            This is what a mentor sees before your session.
          </p>
          <div className="form-grid form-grid--two">
            <TextField
              id="profile-name"
              label="Full name"
              value={draft.name}
              onChange={(event) => set('name', event.target.value)}
              error={nameError}
              required
            />
            <TextField
              id="profile-headline"
              label="Headline"
              value={draft.headline}
              onChange={(event) => set('headline', event.target.value)}
              hint="One sentence about where you are and what you are moving towards."
            />
            <TextField
              id="profile-discipline"
              label="Discipline"
              value={draft.discipline}
              onChange={(event) => set('discipline', event.target.value)}
              placeholder="Graphic Design"
            />
            <TextField
              id="profile-location"
              label="Location"
              value={draft.location}
              onChange={(event) => set('location', event.target.value)}
              placeholder="Johannesburg"
            />
          </div>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <TextAreaField
              id="profile-bio"
              label="Short bio"
              value={draft.bio}
              onChange={(event) => set('bio', event.target.value)}
              hint="Three or four sentences. What do you make, and what are you looking for?"
              rows={4}
            />
          </div>
          <div style={{ marginTop: 'var(--space-5)', maxWidth: 320 }}>
            <SelectField
              id="profile-availability"
              label="Usual availability"
              value={draft.availability}
              options={availabilityOptions}
              onChange={(event) =>
                set(
                  'availability',
                  event.target.value as LearnerProfile['availability'],
                )
              }
            />
          </div>
        </section>

        <section className="profile-section-card">
          <h2>Goals and skills</h2>
          <p className="profile-section-card__hint">
            We use these to recommend modules and mentors.
          </p>
          <div className="form-grid">
            <ChipEditor
              id="profile-goals"
              label="What are you working towards?"
              hint="Press Enter or Add. Examples: find my first client, price confidently."
              values={draft.goals}
              onAdd={(value) =>
                set('goals', Array.from(new Set([...draft.goals, value])))
              }
              onRemove={(value) =>
                set(
                  'goals',
                  draft.goals.filter((item) => item !== value),
                )
              }
              placeholder="Add a goal"
            />
            <ChipEditor
              id="profile-skills"
              label="Skills"
              hint="Tools and disciplines you want to be known for."
              values={draft.skills}
              onAdd={(value) =>
                set('skills', Array.from(new Set([...draft.skills, value])))
              }
              onRemove={(value) =>
                set(
                  'skills',
                  draft.skills.filter((item) => item !== value),
                )
              }
              placeholder="Add a skill"
            />
          </div>
        </section>

        <section className="profile-section-card">
          <h2>Links</h2>
          <p className="profile-section-card__hint">
            Optional, but useful for mentors who want to see your work before a
            session.
          </p>
          <div className="form-grid">
            <TextField
              id="profile-portfolio"
              label="Portfolio"
              type="url"
              value={draft.links.portfolio}
              placeholder="https://your-portfolio.example"
              onChange={(event) => setLink('portfolio', event.target.value)}
            />
            <TextField
              id="profile-linkedin"
              label="LinkedIn"
              type="url"
              value={draft.links.linkedin}
              placeholder="https://www.linkedin.com/in/your-name"
              onChange={(event) => setLink('linkedin', event.target.value)}
            />
            <TextField
              id="profile-instagram"
              label="Instagram"
              type="url"
              value={draft.links.instagram}
              placeholder="https://www.instagram.com/your-handle"
              onChange={(event) => setLink('instagram', event.target.value)}
            />
          </div>
        </section>

        <div className="form-actions">
          <Button type="submit" size="lg">
            Save profile
          </Button>
          <Button variant="secondary" size="lg" onClick={cancel}>
            Cancel changes
          </Button>
          <span className="text-sm text-muted">
            Changes are saved to this browser only.
          </span>
        </div>
      </form>
    </>
  )
}
