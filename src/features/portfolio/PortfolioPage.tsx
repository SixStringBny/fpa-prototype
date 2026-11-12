import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FolderOpen, Plus } from 'lucide-react'
import type { PortfolioStatus } from '../../types'
import { useDemo } from '../../state/demo-state'
import { PageHeader } from '../../components/layout/PageHeader'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Dialog } from '../../components/ui/Dialog'
import { EmptyState } from '../../components/ui/EmptyState'
import { TextAreaField, TextField } from '../../components/ui/Field'
import { useToast } from '../../components/ui/Toast'
import { ProjectThumb } from './ProjectThumb'

const statusLabel: Record<PortfolioStatus, string> = {
  draft: 'Draft',
  submitted: 'In review',
  reviewed: 'Feedback ready',
}

const statusTone: Record<PortfolioStatus, 'neutral' | 'warning' | 'success'> = {
  draft: 'neutral',
  submitted: 'warning',
  reviewed: 'success',
}

export function PortfolioPage() {
  const { state, addPortfolioProject, submitPortfolioProject } = useDemo()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [role, setRole] = useState('')
  const [skills, setSkills] = useState('')

  const resetForm = () => {
    setTitle('')
    setSummary('')
    setRole('')
    setSkills('')
  }

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim() || !summary.trim()) return
    addPortfolioProject({
      title: title.trim(),
      summary: summary.trim(),
      role: role.trim() || 'Designer',
      skills: skills
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    })
    toast('Project added. Submit it for review when you are ready.')
    resetForm()
    setOpen(false)
  }

  const submitForReview = (projectId: string, projectTitle: string) => {
    submitPortfolioProject(projectId)
    toast(
      `${projectTitle} submitted. In this prototype, feedback appears immediately.`,
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Show your thinking"
        title="My portfolio"
        description="Keep a small, honest record of your work. Submit a project for a structured review, then use the feedback to revise it."
        actions={
          <Button onClick={() => setOpen(true)} icon={<Plus size={17} />}>
            Add project
          </Button>
        }
      />

      <section className="portfolio-steps" aria-label="How portfolio feedback works">
        <div>
          <span className="portfolio-step__number">1</span>
          <h2>Add a project</h2>
          <p>Choose one piece that shows how you think, not everything you have made.</p>
        </div>
        <div>
          <span className="portfolio-step__number">2</span>
          <h2>Submit it</h2>
          <p>A mentor reviews the problem, craft, relevance and story.</p>
        </div>
        <div>
          <span className="portfolio-step__number">3</span>
          <h2>Revise it</h2>
          <p>Use the annotations and revision history to make the next version stronger.</p>
        </div>
      </section>

      {state.portfolioProjects.length > 0 ? (
        <div className="project-grid">
          {state.portfolioProjects.map((project) => (
            <article className="project-card" key={project.id}>
              <ProjectThumb title={project.title} accent={project.accent} />
              <div className="project-card__body">
                <div className="project-card__top">
                  <Badge tone={statusTone[project.status]}>
                    {statusLabel[project.status]}
                  </Badge>
                  <span className="project-card__meta">
                    {project.skills.slice(0, 3).join(' · ')}
                  </span>
                </div>
                <h3 className="project-card__title">
                  <Link to={`/app/portfolio/${project.id}`}>{project.title}</Link>
                </h3>
                <p className="project-card__summary">{project.summary}</p>
                <div className="project-card__actions">
                  <Link
                    className="btn btn--secondary btn--sm"
                    to={`/app/portfolio/${project.id}`}
                  >
                    {project.status === 'reviewed' ? 'View feedback' : 'Open project'}
                  </Link>
                  {project.status === 'draft' ? (
                    <Button
                      size="sm"
                      onClick={() => submitForReview(project.id, project.title)}
                    >
                      Submit for review
                    </Button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FolderOpen size={24} aria-hidden="true" />}
          title="No portfolio projects yet"
          description="Add one project to start the feedback loop. A practice brief from Opportunities is a good place to begin."
          action={
            <Button onClick={() => setOpen(true)} icon={<Plus size={17} />}>
              Add your first project
            </Button>
          }
        />
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add a portfolio project"
        description="This is a mock project record. No files are uploaded."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-project-form"
              disabled={!title.trim() || !summary.trim()}
            >
              Add project
            </Button>
          </>
        }
      >
        <form id="add-project-form" onSubmit={handleAdd} className="form-grid">
          <TextField
            id="project-title"
            label="Project title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Café menu refresh"
            required
          />
          <TextField
            id="project-role"
            label="Your role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            placeholder="Designer and illustrator"
          />
          <TextAreaField
            id="project-summary"
            label="Short summary"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            hint="What was the problem, and what did you make?"
            rows={3}
            required
          />
          <TextField
            id="project-skills"
            label="Skills"
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
            placeholder="Branding, Layout, Illustration"
            hint="Separate skills with commas."
          />
        </form>
      </Dialog>
    </>
  )
}
